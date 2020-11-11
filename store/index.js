module.exports ={
  saveUser(user,status){
    console.log(user.name,status);
  },
  saveMessage(from,to,message,type){
    message=type==='image'?'【图片】':message;
    console.log("\033[36m"+from.name+"\033[0m对<\033[36m"+to.name+"\033[0m>:\033[32m"+message+"\033[0m")
  }
};
