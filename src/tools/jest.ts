import mongoose from 'mongoose'

class JestMongoose {
    async beforeAll() {
        const uri: string = "mongodb://localhost:27017/jitera" as string
        await mongoose.connect(uri, { useNewUrlParser: true })
    }
    async afterAll() {
        await mongoose.connection.close()
    }
}

const jestMongoose = new JestMongoose();

export default jestMongoose;