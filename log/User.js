const Squel=require("./squel.min");
const DB=require('./DB');
module.exports={
  addOne(user){
    let SQU=Squel.insert()
      .into("chat_user_tb")
      .set("id",user.id)
      .set("name",user.name)
      .set("avatarUrl",user.avatarUrl)
      .set("roomId",user.roomId)
      .set("type",user.type)
      .set("deviceType",user.deviceType)
      .set("address",user.address)
    return DB.executor(SQU);
  },
  queryAll(){
    let SQU=Squel.select()
      .from("chat_user_tb")
      .field("id")
      .field("name")
      .field("avatarUrl")
      .field("type")
      .field("roomId")
      .field("type")
      .field("deviceType")
      .field("address")
      .field("create_at")
    return DB.executor(SQU);
  }
}
