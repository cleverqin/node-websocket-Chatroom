const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  //用于保存用户信息的数组
  PORT=3000,
  users = [
    {
      id:"group_001",
      name:"群聊天室",
      avatarUrl:"/static/images/group-icon.png",
      type:"group"
    }
  ];
const log =require('./log');
let kit = {
  //判断用户是否存在
  isHaveUser(user) {
    let flag = false;
    users.forEach(function (item) {
      if (item.name == user.name) {
        flag = true;
      }
    })
    return flag;
  },
  //删除某一用户
  delUser(id) {
    users.forEach(function (item, index) {
      if (item.id == id) {
        users.splice(index, 1);
      }
    })
  },
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
      return "touch";
    } else {
      return "pc";
    }
  },
  addUser(user){
    if(!user.id){
      return
    }
    let id=user.id;
    let index=-1;
    users.forEach((item,i)=>{
      if(item.id==id){
        index=i;
      }
    })
    if(index==-1){
      users.push(user);
    }
  },
  loginSuccess(socket,user){
    socket.emit('loginSuccess', user, users);
    users.push(user)
    socket.broadcast.emit('system', user, 'join');
    log.logLoginMessage(user,'join');
    //发送消息
    socket.on('message',(from, to,message,type)=> {
      if(to.type=='user'){
        socket.broadcast.to(to.roomId).emit('message', socket.user, to,message,type);
      }
      if(to.type=='group'){
        socket.broadcast.emit('message', socket.user, to,message,type);
      }
      log.logUserMessage(socket.user,to,message,type)
    });
  }
}
//设置静态资源
app.use('/static', express.static(__dirname + '/static'));
//用户访问网站页面会根据浏览器userAgent返回不同的页面
app.get("/", (req, res) => {
  let userAgent = req.headers['user-agent'].toLowerCase();
  if (kit.getDeviceType(userAgent)=='touch') {
    let path = __dirname + '/views/iTalk.html';
    res.sendFile(path);
  } else {
    let path = __dirname + '/views/index.html';
    res.sendFile(path);
  }
})
io.sockets.on('connection',(socket)=>{
  //创建用户链接
  socket.on('login', (user)=> {
    if (kit.isHaveUser(user)) {
      console.log("登录失败,昵称<"+user.name+">已存在！")
      socket.emit('loginFail', "登录失败,昵称已存在!");
    } else {
      user.id = socket.id;
      user.roomId=socket.id;
      user.address = socket.handshake.address.replace(/::ffff:/,"");
      let userAgent=socket.handshake.headers["user-agent"].toLowerCase();
      let deviceType=kit.getDeviceType(userAgent);
      user.deviceType=deviceType;
      user.loginTime=new Date().getTime();
      socket.user = user;
      user.type="user";
      kit.loginSuccess(socket,user)
    }
  });
  //用户注销链接
  socket.on('disconnect',()=> {
    if (socket.user != null) {
      kit.delUser(socket.user.id);
      socket.broadcast.emit('system', socket.user, 'logout');
      log.logLoginMessage(socket.user,'logout');
    }
  });
  //判断用户重新连接
  if(socket.handshake.query.User){
    let user=JSON.parse(socket.handshake.query.User);
    if(user.id){
      socket.user = user;
      user.roomId = socket.id;
      user.address = socket.handshake.address.replace(/::ffff:/,"");
      console.log("用户<"+user.name+">重新连接成功！")
      kit.loginSuccess(socket,user)
    }else {
      console.log("非法链接用户")
    }
  }
});
//启动服务器
server.listen(PORT,()=> {
  console.log(`服务器已启动在：${PORT}端口`, `http://localhost:${PORT}`)
});
