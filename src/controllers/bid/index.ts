import { Document, Model } from 'mongoose'

import BidMdl from '../../schemas/Bid'

class Bid {
  public model: Model<Document>

  constructor() {
    this.model = BidMdl
  }
}

export default new Bid()