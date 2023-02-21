import { model, Schema } from 'mongoose'
export enum BidStatus {
  PAID = "PAID",
  RESERVED = "RESERVED",
  RETURNED = "RETURNED",
}
const schema = new Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  price:  { type: Number, required: true },
  status: { type: BidStatus, required: true },
}, { minimize: true, timestamps: true })

export default model('Bid', schema)