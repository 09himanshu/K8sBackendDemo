import {faker} from '@faker-js/faker'

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
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            company: faker.company.name()
        }
        body.email = body.email.toLowerCase()
        console.log(body.email)
        await global.dbService.insert('test_collection', body)
        res.status(200).send({ status: true, data: 'Data inserted sucessfully' })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, data: err.message })
    }
}

const updateData = async (req, res) => {
    try {
        let email = req.params.email
        let filter = {email}
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