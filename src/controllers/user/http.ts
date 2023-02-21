import { Request, Response } from 'express'

import UserCtrl from './index'
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

const httpUser: IHttp = {}

httpUser.get = async (req: IReq, res: IRes) => {
  const users = await UserCtrl.model.find().lean()

  res.response = { users, message: req.polyglot.t('emailRequiredField') }
}

httpUser.register = async (req: IReq, res: IRes) => {
  await validator.post(req.yup, req.body)

  const body = req.body
  const checkUser = await UserCtrl.model.findOne({"username": body.username}).lean()

  if(checkUser){
    return res.response = { message: "User has registered" }
  }

  const user = await UserCtrl.model.create(body)

  return res.data = user
}
httpUser.login = async (req: IReq, res: IRes) => {
  await validator.post(req.yup, req.body)

  const body = req.body

  const user = await UserCtrl.model.findOne({"username": body.username}).lean()

  res.response = user
}
export default httpUser