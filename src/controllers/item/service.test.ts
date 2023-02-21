import jestMongoose from "../../tools/jest";
import itemService from "./service";
import userService from "../user/service";

const mockUser =  {
    username: "TestItem",
    password: "123"
}

const mockItem = {
    userId: "",
    name: "Glove",
    timewindow: new Date(Date.now()),
    startprice: 1500,
    published: false
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

        return await userService.GetUser(mockUser).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(user)))
    });

    it('Create Item', async () => {

        const item = await itemService.Create(mockItem)

        return await itemService.GetItemByUserId(mockItem.userId).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(item)))
    });

    it('Delete Item', async () => {

        const item = await itemService.DeleteItem(mockItem.userId)

        return await itemService.GetItemByUserId(mockItem.userId).then(data => expect(data).toEqual(null))
    });

    it('Delete User', async () => {

        await userService.DeleteUser(mockUser)
        return await userService.GetUser(mockUser).then(data => expect(data).toEqual(null))
    });
});

