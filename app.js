const express = require('express');
const store=require("./store");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT=3000;
//用于保存用户信息的数组
let users = [
    {
      id:"group_001",
      name:"群聊天室",
      avatarUrl:"/static/images/group-icon.png",
      type:"group"
    }
  ];
let util={
  //判读用户是否已经登录
  getDeviceType(userAgent){
    let bIsIpad = userAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = userAgent.match(/midp/i) == "midp";
    let bIsUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = userAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = userAgent.match(/android/i) == "android";
    let bIsCE = userAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = userAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return "phone";
    } else {
      return "pc";
    }
  },
  //判读用户是否已经存在
  isHaveName(name){
    return users.some(item => item.name===name)
  },
  //处理用户登录
  login(socket,user,isReconnect){
    let ip=socket.handshake.address.replace(/::ffff:/,"");
    let deviceType=this.getDeviceType(socket.handshake.headers["user-agent"].toLowerCase());
    user.ip=ip;
    user.deviceType=deviceType;
    user.roomId=socket.id;
    user.type='user';
    if(isReconnect){
      socket.emit('loginSuccess', user, users);
      this.loginSuccess(socket,user)
    }else {
      if(!this.isHaveName(user.name)){
        user.id=socket.id;
        user.time=new Date().getTime();
        socket.emit('loginSuccess', user,users);
        util.loginSuccess(socket,user);
      }else {
        socket.emit('loginFail','登录失败,昵称已存在!')
      }
    }
  },
  //用户登录成功
  loginSuccess(socket,user){
    socket.broadcast.emit('system', user, 'join');
    socket.on('message',(from, to,message,type)=> {
      if(to.type==='user'){
        socket.broadcast.to(to.roomId).emit('message', socket.user, to,message,type);
      }
      if(to.type==='group'){
        socket.broadcast.emit('message', socket.user,to,message,type);
      }
      store.saveMessage(from,to,message,type)
    });
    socket.user=user;
    users.push(user);
    store.saveUser(user,"login");
  },
  //删除储存的用户
  removeUser(id){
    users.forEach((item,i)=>{
      if (item.id===id){
        users.splice(i,1)
      }
    })
  }
};
app.use("/static",express.static('static'));
app.get("/",(req,res)=>{
  const path = __dirname + '/static/index.html';
  res.sendFile(path)
});
io.sockets.on('connection',(socket)=>{
  socket.on("disconnect",()=>{
    //判断是否是已登录用户
    if (socket.user&&socket.user.id) {
      //删除登录用户信息,并通知所有在线用户
      util.removeUser(socket.user.id);
      socket.broadcast.emit('system', socket.user, 'logout');
      store.saveUser(socket.user,"logout");
    }
  });
  let userJson=socket.handshake.query.User;
  let user=userJson?JSON.parse(userJson):{};
  //判断链接用户是否已经登录
  if(user&&user.id){
    //已登录的用户重新登录
    util.login(socket,user,true)
  }else {
    //监听用户登录事件
    socket.on('login',(user)=>{
      util.login(socket,user,false)
    });
  }
});
//启动服务器
server.listen(PORT,()=> {
  console.log(`服务器已启动在：${PORT}端口`, `http://localhost:${PORT}`)
});
