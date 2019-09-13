const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  //用于保存用户信息的数组
  PORT=3000,
  users = [];
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
  }
}
//设置静态资源
app.use('/static', express.static(__dirname + '/static'));
//用户访问网站页面会根据浏览器userAgent返回不同的页面
app.get("/", (req, res) => {
  let userAgent = req.headers['user-agent'].toLowerCase();
  if (kit.getDeviceType(userAgent)=='touch') {
    let path = __dirname + '/static/iChat.html';
    res.sendFile(path);
  } else {
    let path = __dirname + '/static/index.html';
    res.sendFile(path);
  }
})
io.sockets.on('connection',(socket)=>{
  //创建用户链接
  socket.on('login', (user)=> {
    if (kit.isHaveUser(user)) {
      console.log("登录失败！", user)
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
      console.log("登录成功！", user)
      socket.emit('loginSuccess', user, users);
      users.push(user)
      socket.broadcast.emit('system', user, 'join');
    }
  });
  //用户注销链接
  socket.on('disconnect',()=> {
    if (socket.user != null) {
      kit.delUser(socket.user.id);
      console.log("用户退出！", socket.user)
      socket.broadcast.emit('system', socket.user, 'logout');
    }
  });
  //群发消息
  socket.on('groupMessage',(from, to,message,type)=>{
    //用户登录状态掉线，重置用户登录状态
    if (!socket.user) {
      from.roomId = socket.id;
      socket.user = from;
      users.push(from);
      socket.broadcast.emit('system', from, 'join');
      socket.emit('loginSuccess', from, []);
    }
    socket.broadcast.emit('groupMessage', socket.user, to,message,type);
  });
  //发送私信
  socket.on('message',(from, to,message,type)=> {
    //用户登录状态掉线，重置用户登录状态
    if (!socket.user) {
      from.roomId = socket.id;
      socket.user = from;
      users.push(from);
      socket.broadcast.emit('system', from, 'join');
      socket.emit('loginSuccess', from, []);
    }
    socket.broadcast.to(to.roomId).emit('message', socket.user, to,message,type);
  });
  //判断用户重新连接
  if(socket.handshake.query.User){
    let user=JSON.parse(socket.handshake.query.User);
    socket.user = user;
    user.roomId = socket.id;
    user.address = socket.handshake.address.replace(/::ffff:/,"");
    console.log("重新连接成功！", user)
    socket.emit('loginSuccess', user, users);
    users.push(user)
    socket.broadcast.emit('system', user, 'join');
  }
});
//启动服务器
server.listen(PORT,()=> {
  console.log(`服务器已启动在：${PORT}端口`, `http://localhost:${PORT}`)
});