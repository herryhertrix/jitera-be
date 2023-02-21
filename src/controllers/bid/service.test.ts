import balanceService from "../balance/service";
import { BidStatus } from "../../schemas/Bid";
import jestMongoose from "../../tools/jest";
import itemService from "../item/service";
import userService from "../user/service";
import bidService from "./service";

const mockUser = {
    username: "TestBid",
    password: "123"
}

const mockBid = {
    userId: "",
    itemId: "",
    price: 1700,
    status: BidStatus.RESERVED
}

const mockItem = {
    userId: "",
    name: "GloveBid",
    timewindow: new Date(Date.now()),
    startprice: 1500,
    published: false,
}        

const mockBalance = {
    userId: "",
    status: "",
    amount: 25000,
}


describe('user', () => {
    beforeAll(async () => {
        jestMongoose.beforeAll()
    });
    afterAll(async ()=> {
        jestMongoose.afterAll()
    })
    it('Create User', async () => {

        const user = await userService.Create(mockUser)
        mockItem.userId = user.id
        mockBid.userId = user.id
        mockBalance.userId = user.id
        return await userService.GetUser(mockUser).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(user)))
    });

    it('Create Item', async () => {

        const item = await itemService.Create(mockItem)
        mockBid.itemId = item.id
        return await itemService.GetItemByUserId(mockItem.userId).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(item)))
    });


    it('CreateDebit', async () => {

        const debit = await balanceService.Debit(mockBalance)

        return await balanceService.CheckDebit(mockBalance).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(debit)))
    });

    it('Create Bid', async () => {
        const bid = await bidService.Create(mockBid, [])

        return await bidService.FindOneBid(mockBid).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(bid)))
    });

    it('Delete Bid', async () => {
        await bidService.DeleteBid(mockBid)

        return await bidService.FindOneBid(mockBid).then(data => expect(data).toEqual(null))
    });

    it('Delete Debit', async () => {

        await balanceService.DeleteDebit(mockBalance)

        return await balanceService.CheckDebit(mockBalance).then(data => expect(data).toEqual(null))
    });

    it('Delete Item', async () => {

        await itemService.DeleteItem(mockItem.userId)

        return await itemService.GetItemByUserId(mockItem.userId).then(data => expect(data).toEqual(null))
    });


    it('Delete User', async () => {

        await userService.DeleteUser(mockUser)
        return await userService.GetUser(mockUser).then(data => expect(data).toEqual(null))
    });
});

