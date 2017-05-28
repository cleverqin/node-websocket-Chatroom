var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

app.use('/', express.static(__dirname + '/static'));
server.listen(process.env.PORT || 3000);
console.log("服务器启动成功端口：3000")

io.sockets.on('connection', function(socket) {
    //创建用户链接
    socket.on('login', function(user) {
        if (isHave(user)) {
            socket.emit('nickExisted');
        } else {
            var address="未知";
            user.address=address;
            socket.user = user;
            user.id=socket.id;
            users.push(user);
            socket.emit('loginSuccess',user,users);
            socket.broadcast.emit('system', user,users,'login');
        };
    });
    //用户注销链接
    socket.on('disconnect', function() {
        if (socket.user != null) {
            console.log(users);
            users.forEach(function (item,index) {
                if(item.id==socket.id){
                    users.splice(index, 1);
                }
            })
            socket.broadcast.emit('system', socket.user,users, 'logout');
            console.log(users);
        }
    });
    //新建消息
    socket.on('postMsg', function(msg) {
        console.log(socket.user);
        socket.broadcast.emit('newMsg', socket.user, msg);
    });
    //发送私信
    socket.on('privateMsg', function(id,msg) {
        console.log(socket.user);
        console.log(msg);
        socket.broadcast.to(id).emit('personMsg',socket.user,msg);
    });
    //判断用户名是否存在
    function isHave(user) {
        var flag=false;
        for(var i=0;i<users.length;i++){
            if(users[i].nickName==user.nickName){
                flag=true;
                break;
            }
        }
        return flag;
    }
});