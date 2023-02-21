import jestMongoose from "../../tools/jest";
import userService from "../user/service";
import balanceService from "./service";

const body = {
    username: "TestBalance",
    password: "123"
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
    it('Test Register', async () => {

        const user = await userService.Create(body)
        mockBalance.userId = user.id
        return await userService.GetUser(body).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(user)))
    });

    it('CreateDebit', async () => {

        const debit = await balanceService.Debit(mockBalance)

        return await balanceService.CheckDebit(mockBalance).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(debit)))
    });

    it('Delete Debit', async () => {

        await balanceService.DeleteDebit(mockBalance)

        return await balanceService.CheckDebit(mockBalance).then(data => expect(data).toEqual(null))
    });

    it('Delete User', async () => {

        await userService.DeleteUser(body)
        return await userService.GetUser(body).then(data => expect(data).toEqual(null))
    });
});

