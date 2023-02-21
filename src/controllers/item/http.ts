import { Request, Response } from 'express'
import { Mongoose } from 'mongoose'

import ItemCtrl from './index'
import itemService from './service'
import * as validator from './validator'
interface IHttp {
  [key: string]: any
}

interface IRes extends Response {
  [key: string]: any
}

interface IReq extends Response {
  [key: string]: any
}

const httpItem: IHttp = {}


httpItem.createitem = async (req: IReq, res: IRes) => {
  await validator.deposit(req.yup, req.body)

  const Item = await itemService.Create(req.body)

  res.data = Item
}
httpItem.getallitem = async (req: IReq, res: IRes) => {
  res.response = await itemService.GetAllItem()
}

httpItem.getById = async (req: IReq, res: IRes) => {
  const {id} = req.params
  res.response = await itemService.GetItemsByuserId(id)
}

httpItem.publisItem = async (req: IReq, res: IRes) => {
  const body = req.body
  await ItemCtrl.model.findByIdAndUpdate({_id: body.id },{published: true})
  res.response = await itemService.GetItemsByuserId(body.userId)
}
export default httpItem