const getData = async (req, res) => {
    try {
        let data = await global.dbService.find('test_collection')
        res.status(200).send({ status: true, data: data[0] })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, data: err.message })
    }
}

const insertData = async (req, res) => {
    try {
        let body = {
            $inc: { count: 1 }
        }
        let filter = { _id: new ObjectId('68184858dd31415b8724e7a3') }
        await database.update('test_collection', filter, body)

        res.status(200).send({ status: true, data: 'Data inserted sucessfully' })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, data: err.message })
    }
}

export {getData,insertData}