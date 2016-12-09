var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

app.use('/', express.static(__dirname + '/app'));

server.listen(process.env.PORT || 3000);
io.sockets.on('connection', function(socket) {
    //创建用户链接
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname,users, users.length, 'login');
        };
    });
    //用户注销链接
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            users.splice(socket.userIndex, 1);
            socket.broadcast.emit('system', socket.nickname,users,users.length, 'logout');
        }
    });
    //新建消息
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
    //新建图片信息
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});