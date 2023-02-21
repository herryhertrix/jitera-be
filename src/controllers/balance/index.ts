import { Document, Model } from 'mongoose'

import BalanceMdl from '../../schemas/Balance'

class Balance {
  public model: Model<Document>

  constructor() {
    this.model = BalanceMdl
  }
}

export default new Balance()