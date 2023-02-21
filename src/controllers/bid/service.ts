import BidCtrl from './index'
import { BidStatus } from '../../schemas/Bid'
class BidService {
  public async Create(body: any, biddings: any){
    body["status"] = BidStatus.RESERVED
    if(biddings.length > 0){
      await BidCtrl.model.updateMany({itemId: body.itemId},{status: BidStatus.RETURNED})
    }
    return await BidCtrl.model.create(body)
  }
  public async FindBid(body: any){
    return await BidCtrl.model.find({ "itemId": body.itemId }).lean().sort({ price: -1 })
  }
  public async FindOneBid(body: any){
    return await BidCtrl.model.findOne({ "itemId": body.itemId })
  }
  public async DeleteBid(body: any){
    return await BidCtrl.model.deleteOne({ "itemId": body.itemId })
  }
}
const bidService = new BidService();

export default bidService;
