import BidCtrl from './index'
import ItemCtrl from '../item/index'
import BalanceCtrl from '../balance/index'
import { BalanceStatus } from '@schemas/Balance'
import { BidStatus } from '@schemas/Bid'
class BidService {
  public async Create(body: any, biddings: any){
    body["status"] = BidStatus.RESERVED
    if(biddings.length > 0){
      await BidCtrl.model.updateMany({itemId: body.itemId},{status: BidStatus.RETURNED})
    }
    await BidCtrl.model.create(body)
  }
}
const bidService = new BidService();

export default bidService;
