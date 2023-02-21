import { model, Schema } from 'mongoose'

const schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { minimize: true, timestamps: true })

export default model('User', schema)