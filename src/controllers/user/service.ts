import UserCtrl from './index'
class UserService {

  public async Create(body: any){
    const user = await UserCtrl.model.create(body)
    return user
  }
  public async GetUser(body: any){
    const user = await UserCtrl.model.findOne({"username": body.username}).lean()
    return user
  }

  public async DeleteUser(body: any){
    const user = await UserCtrl.model.deleteOne({"username": body.username}).lean()
    return user
  }
}
const userService = new UserService();

export default userService;
