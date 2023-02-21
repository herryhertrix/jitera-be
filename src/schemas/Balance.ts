import { model, Schema } from 'mongoose'
export enum BalanceStatus {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
const schema = new Schema({
  userId: { type: String, required: true },
  status: { type: BalanceStatus, required: true },
  amount: { type: Number, required: true },
}, { minimize: true, timestamps: true })

export default model('Balance', schema)