import { NextFunction, Request, Response, Router } from 'express'

import httpUser from '@ctrls/user/http'
import { attachControllers } from '@decorators/express'
import httpBalance from '@ctrls/balance/http'
import httpItem from '@ctrls/item/http'
import httpBid from '@ctrls/bid/http'

const router = Router()

const catchError = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res)

    next()
  } catch (error) {
    next(error)
  }
}

// USER
router.post('/users/register', catchError(httpUser.register))
router.post('/users/login', catchError(httpUser.login))

// BALANCE
router.post('/balances/deposit', catchError(httpBalance.deposit))
router.get('/balances/:id', catchError(httpBalance.balance))

// Item
router.post('/items/createitem', catchError(httpItem.createitem))
router.get('/items', catchError(httpItem.getallitem))
router.get('/items/:id', catchError(httpItem.getById))
router.post('/items/publish', catchError(httpItem.publisItem))

// Bid
router.post('/bids', catchError(httpBid.bidding))
export default router