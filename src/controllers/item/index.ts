import { Document, Model } from 'mongoose'

import ItemMdl from '@schemas/Item'

class Item {
  public model: Model<Document>

  constructor() {
    this.model = ItemMdl
  }
}

export default new Item()