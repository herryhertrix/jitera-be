import { Request, Response } from 'express'

import UserCtrl from './index'
import userService from './service'
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

httpUser.register = async (req: IReq, res: IRes) => {
  await validator.post(req.yup, req.body)

  const body = req.body
  const checkUser = await userService.GetUser(body)

  if(checkUser){
    return res.response = { message: "User has registered" }
  }

  const user = await userService.Create(body)

  return res.data = user
}
httpUser.login = async (req: IReq, res: IRes) => {
  await validator.post(req.yup, req.body)

  const body = req.body

  const user = await userService.GetUser(body)

  res.response = user
}
export default httpUser