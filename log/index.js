const User=require("./User");
module.exports ={
  logLoginMessage(user,status){
    console.log(JSON.stringify(user),status);
    if(status=='join'){
      User.addOne(user)
    }
  },
  logUserMessage(from,to,message,type){
    console.log("\033[36m"+from.name+"\033[0m对<\033[36m"+to.name+"\033[0m>:\033[32m"+message+"\033[0m")
  }
}
