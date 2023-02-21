import BidCtrl from '../bid/index'
import ItemCtrl from './index'
import { BidStatus } from '../../schemas/Bid'
class ItemService {
  public async GetAllItem() {
    const items = await ItemCtrl.model.aggregate([
      {
        $addFields: {
          itemId: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "bids",
          localField: "itemId",
          foreignField: "itemId",
          as: "bid",
          pipeline: [{
            $match: { status: BidStatus.RESERVED }
          }]
        },
      },
      {
        $set: {
          startprice: {
            $ifNull: [
              {
                $first: "$bid.price",
              },
              "$startprice",
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          userId: 1,
          timewindow: 1,
          startprice: 1,
        }
      }
    ])
    return items
  }
  public async GetItemsByuserId(userId: string) {
    const myItem = await ItemCtrl.model.find({userId: userId})
    const myBid: any = await BidCtrl.model.aggregate([
      {
        $match: { userId: userId }
      },
      {
        $group: {
          _id: null,
          item_id: { $addToSet: { $toObjectId: "$itemId" } }
        }
      },
      {
        $unwind: "$item_id",
      },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $addFields: {
          itemId: {
            $toString: "$item_id",
          },
        },
      },
      {
        $lookup: {
          from: "bids",
          localField: "itemId",
          foreignField: "itemId",
          as: "bid",
          pipeline: [{
            $match: { status: BidStatus.RESERVED }
          }]
        },
      },
      {
        $set: {
          startprice: {
            $ifNull: [
              {
                $first: "$bid.price",
              },
              "$items.startprice",
            ],
          },
        },
      },
      {
        $project: {
          _id: "$items.id",
          name: "$items.name",
          userId: "$items.userId",
          itemId: 1,
          timewindow:  "$items.timewindow",
          startprice: 1,
          published:  "$items.published"
        }
      }
    ])
    return { myItem ,myBid }
  }
  public async Create(body: any){
    return await ItemCtrl.model.create(body)
  }
  public async GetItemByUserId(userId: any){
    return await ItemCtrl.model.findOne({userId: userId})
  }
  public async DeleteItem(userId: any){
    return await ItemCtrl.model.deleteOne({userId: userId})
  }
}
const itemService = new ItemService();

export default itemService;
