import BidCtrl from '../bid/index'
import ItemCtrl from '../item/index'
import BalanceCtrl from '../balance/index'
import Balance, { BalanceStatus } from '@schemas/Balance'
import Bid, { BidStatus } from '@schemas/Bid'
import mongoose from 'mongoose'
class BalanceService {
    public async Generate(userId: string) {
        const balances = await BalanceCtrl.model.find({ "userId": userId })
        let balance = 0
        if (balances) {
            balances.map((b: any) => {
                if (b.status == "DEBIT") {
                    return balance = balance + b.amount
                } else {
                    return balance = balance - b.amount
                }
            })
        }

        return balance
    }
    public async Debit(body: any){
        body["status"] = BalanceStatus.DEBIT
        await BalanceCtrl.model.create(body)
    }
    public async Credit(body: any) {
        body["status"] = BalanceStatus.CREDIT
        await BalanceCtrl.model.create(body)
    }
    public async GetCurrentBalance(userId: string) {
        const getBalance = await BalanceCtrl.model.aggregate([
            {
                $match: { userId: userId }
            },
            {

                $group:
                {
                    "_id": null,
                    debit: {
                        $sum: {
                            '$cond': {
                                if: {
                                    $eq: ["$status", BalanceStatus.DEBIT],
                                },
                                then: "$amount",
                                else: 0,
                            }
                        }
                    },
                    credit: {
                        $sum: {
                            '$cond': {
                                if: {
                                    $eq: ["$status", BalanceStatus.CREDIT],
                                },
                                then: {$lt: ["$amount", 0]},
                                else: 0,
                            }
                        }
                    },
                }
            },
            {
                $project: {
                    _id: 0,
                    debit: 1,
                    credit: 1,
                }
            }
        ])
        const getBidding = await BidCtrl.model.aggregate(
            [
                {
                    $match: { userId: userId, status: BidStatus.RESERVED }
                },
                {

                    $group:
                    {
                        "_id": null,
                        reserved: {
                            $sum: "$price"
                        },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        reserved: 1,
                    }
                }
            ]
        )
        const balance = getBalance.length > 0 ? getBalance[0].debit - getBalance[0].credit : 0
        const isBidding = getBidding.length > 0 ? getBidding[0].reserved : 0
        const total = balance - isBidding
        return total
    }
}
const balanceService = new BalanceService();

export default balanceService;
