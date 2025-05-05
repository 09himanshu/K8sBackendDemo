import { MongoClient } from 'mongodb';

class DB {
  #db_name;
  #url;
  static instance;

  constructor(url, db_name) {
    if (DB.instance) {
      return DB.instance;
    }

    this.#db_name = db_name;
    this.#url = url;
    this.client = new MongoClient(this.#url, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
      minPoolSize: 5
    });
    this.connect()
    DB.instance = this;
  }

  async #validateCollectionName(collectionName) {
    if (typeof collectionName !== 'string') {
      throw new TypeError('collectionName must be a string');
    }
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db(this.#db_name).command({ ping: 1 });
    } catch (err) {
      throw new Error(`DB connection failed: ${err.message}`);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
    } catch (err) {
      throw new Error(`DB disconnection failed: ${err.message}`);
    }
  }

  get_db() {
    if (!this.client?.topology?.isConnected()) {
      throw new Error('Database is not connected');
    }
    return this.client.db(this.#db_name);
  }

  async find(collectionName, filter = {}, project = {}, options = {}) {
    await this.#validateCollectionName(collectionName);
    
    const limit = Math.min(
      Number(options.limit) ?? 50,
      100
    );
    const skip = Math.max(Number(options.skip) ?? 0, 0);
    const sort = options.sort || {};

    try {
      return await this.get_db()
        .collection(collectionName)
        .find(filter)
        .project(project)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .toArray();
    } catch (err) {
      throw new Error(`DB find failed (${collectionName}): ${err.message}`);
    }
  }

  async insert(collectionName, document, options = {}) {
    await this.#validateCollectionName(collectionName);
    
    if (!document || typeof document !== 'object') {
      throw new TypeError('Document must be a non-null object');
    }

    try {
      const result = await this.get_db()
        .collection(collectionName)
        .insertOne(document, options);
      
      return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId
      };
    } catch (err) {
      throw new Error(`DB insert failed (${collectionName}): ${err.message}`);
    }
  }

  async update(collectionName, filter = {}, updateDoc = {}, options = {}) {
    await this.#validateCollectionName(collectionName);
    
    if (!Object.keys(filter).length) {
      throw new TypeError('Filter cannot be empty');
    }

    if (!Object.keys(updateDoc).length) {
      throw new TypeError('Update document cannot be empty');
    }

    try {
      const result = await this.get_db()
        .collection(collectionName)
        .updateOne(filter, updateDoc, options);
      
      return {
        acknowledged: result.acknowledged,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId
      };
    } catch (err) {
      throw new Error(`DB update failed (${collectionName}): ${err.message}`);
    }
  }
}

export { DB };