import { BalanceStatus } from '@schemas/Balance'
import { Request, Response } from 'express'

import BalanceCtrl from './index'
import balanceService from './service'
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

const httpBalance: IHttp = {}


httpBalance.deposit = async (req: IReq, res: IRes) => {
  await validator.deposit(req.yup, req.body)
  const body = req.body
  await balanceService.Debit(body)

  res.response = { balance: await balanceService.GetCurrentBalance(body.userId) }
}

httpBalance.balance = async (req: IReq, res: IRes) => {
  const { id } = req.params
  if (!id) {
    return res.response = { message: "User id is needed" }
  }
  await balanceService.GetCurrentBalance(id)
  const balance = await balanceService.GetCurrentBalance(id)
  res.response = { balance: balance }
}
export default httpBalance