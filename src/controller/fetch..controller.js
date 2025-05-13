import {faker} from '@faker-js/faker'

const status = [0,1]

const getData = async (req, res) => {
    try {
        let data = await global.dbService.find('test_collection')
        res.status(200).send({ status: true, data })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, data: err.message })
    }
}

const insertData = async (req, res) => {
    try {
        let body = {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            company: faker.company.name(),
            status: status[Math.round(Math.random())]
        }
        
        
        await global.dbService.insert('test_collection', body)
        res.status(200).send({ status: true, data: 'Data inserted sucessfully' })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, data: err.message })
    }
}

const updateData = async (req, res) => {
    try {
        let status = req.params.status
        let filter = {status}
        let updateDoc = {
            name: faker.person.fullName(),
            phone: faker.phone.number(),
        }
        await global.dbService.update('test_collection', filter, updateDoc)
        res.status(200).send({status: false, data: `Document updated successfully`})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

export { getData, insertData, updateData }