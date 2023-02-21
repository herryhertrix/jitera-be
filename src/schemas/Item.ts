import { model, Schema } from 'mongoose'
const schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  timewindow: { type: Date, required: true },
  startprice: { type: Number, required: true },
  published: { type: Boolean, required: true, default: false },
}, { minimize: true, timestamps: true })

export default model('Item', schema)