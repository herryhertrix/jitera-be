import { Request, Response } from 'express'

import BidCtrl from './index'
import ItemCtrl from '../item/index'
import * as validator from './validator'
import balanceService from '@ctrls/balance/service'
import bidService from './service'
interface IHttp {
  [key: string]: any
}

interface IRes extends Response {
  [key: string]: any
}

interface IReq extends Response {
  [key: string]: any
}

const httpBid: IHttp = {}


httpBid.bidding = async (req: IReq, res: IRes) => {
  await validator.bidding(req.yup, req.body)

  const body = req.body
  const item: any = await ItemCtrl.model.findById(body.itemId)
  if (!item) {
    return res.response = { message: "Item doesn't exist" }
  }

  const now = new Date(Date.now()).getTime() / 1000
  const timewindow = new Date(item.timewindow).getTime() / 1000

  if (now > timewindow){
    return res.response = { message: "This item has compeleted" }
  }

  if (item.startprice > body.price) {
    return res.response = { message: "Bid price is below start price" }
  }

  const biddings = await bidService.FindBid(body)

  const balance = await balanceService.Generate(body.userId)
  if (balance <= body.price) {
    return res.response = { message: "Not Enough Balance" }
  }

  if (biddings.length > 0) {
    const prev = new Date(biddings[0].createdAt).getTime() / 1000
    const diff = now - prev
    if (diff < 6) {
      return res.response = { message: "Delay 5 Second" }
    }

    const prevPrice = biddings[0].price
    const price = body.price
    if (price <= prevPrice) {
      return res.response = { message: "Please raise your bid" }
    }
  }
  await bidService.Create(body, biddings)
  return res.response = { balance: await balanceService.GetCurrentBalance(body.userId)}
}
export default httpBid