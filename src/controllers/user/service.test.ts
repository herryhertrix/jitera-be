import jestMongoose from "../../tools/jest";
import userService from "./service";

const body = {
    username: "TestUser",
    password: "123"
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

        return await userService.GetUser(body).then(data => expect(JSON.stringify(data)).toEqual(JSON.stringify(user)))
    });

    it('Delete User', async () => {

        await userService.DeleteUser(body)
        return await userService.GetUser(body).then(data => expect(data).toEqual(null))
    });
});

