var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

app.use('/', express.static(__dirname + '/app'));

server.listen(process.env.PORT || 3000);
io.sockets.on('connection', function(socket) {
    //创建用户链接
    socket.on('login', function(user) {
        console.log(user);
        if (isHave(user)) {
            socket.emit('nickExisted');
        } else {
            var address=socket.handshake.address.address+":"+socket.handshake.address.port;
            user.address=address;
            socket.userIndex = users.length;
            socket.user = user;
            users.push(user);
            socket.emit('loginSuccess');
            io.sockets.emit('system', user,users, users.length, 'login');
        };
    });
    //用户注销链接
    socket.on('disconnect', function() {
        if (socket.user != null) {
            users.splice(socket.userIndex, 1);
            socket.broadcast.emit('system', socket.user,users,users.length, 'logout');
        }
    });
    //新建消息
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.user, msg, color);
    });
    //新建图片信息
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.user, imgData, color);
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