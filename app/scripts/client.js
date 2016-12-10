window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        var that = this;
        var _pic=document.body.querySelectorAll("#nickWrapper .img-list li.checked img")[0].src;
        var curUser={
            nickName:"我",
            pic:_pic
        }
        console.log(curUser);
        this.socket = io.connect();
        this.socket.on('connect', function() {
            document.getElementById('info').textContent = '请输入一个昵称：';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('nickExisted', function() {
            document.getElementById('info').textContent = '该昵称已被使用，请选用其他昵称';
        });
        this.socket.on('loginSuccess', function() {
            document.title = 'Chat聊天室 | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
            curUser.nickName="我";
        });
        this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '链接失败！';
            } else {
                document.getElementById('info').textContent = '链接失败！';
            }
        });
        this.socket.on('system', function(user,users, userCount, type) {
            var msg = user.nickName + (type == 'login' ? ' 加入聊天室' : ' 离开聊天室');
            that._displayMsg(user, msg, 'red','sys');
            document.getElementById('status').innerHTML = "当前在线用户:<span class='num-tag'>"+userCount+"</span>人";
            var listDiv=document.getElementById("online-list");
            var str="";
            for (var i=0;i<users.length;i++){
                str+="<li class='user-span'><img src='"+users[i].pic+"'><div>"+users[i].nickName+"</div></li>";
            }
            listDiv.innerHTML=str;
        });
        this.socket.on('newMsg', function(user, msg, color) {
            console.log(user);
            that._displayMsg(user, msg, color,"msg");
        });
        this.socket.on('newImg', function(user, img, color) {
            that._displayMsg(user,img,color,"img");
        });
        document.getElementById('loginBtn').addEventListener('click', function() {
            var nickName = document.getElementById('nicknameInput').value;
            var pic=document.body.querySelectorAll("#nickWrapper .img-list li.checked img")[0].src;
            if (nickName.trim().length != 0&&nickName.trim()!="我") {
                curUser={
                    nickName:nickName,
                    pic:pic
                }
                that.socket.emit('login', curUser);
            } else {
                document.getElementById('nicknameInput').focus();
                document.getElementById('info').textContent = '请输入昵称，昵称不能为空不能为’我';
            };
        }, false);
        document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                var pic=document.body.querySelectorAll("#nickWrapper .img-list li.checked img")[0].src;
                if (nickName.trim().length != 0) {
                    curUser={
                        nickName:nickName,
                        pic:pic
                    }
                    that.socket.emit('login', curUser);
                };
            };
        }, false);
        document.getElementById('sendBtn').addEventListener('click', function() {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            messageInput.value = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                that.socket.emit('postMsg', msg, color);
                that._displayMsg(curUser, msg, color,"msg");
                return;
            };
        }, false);
        document.getElementById('messageInput').addEventListener('keyup', function(e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color);
                that._displayMsg(curUser, msg, color,"msg");
            };
        }, false);
        document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('historyMsg').innerHTML = '';
        }, false);
        document.getElementById('sendImage').addEventListener('change', function() {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader(),
                    color = document.getElementById('colorStyle').value;
                if (!reader) {
                    that._displayMsg(curUser, '你的浏览器不支持文件读取！', 'red',"sys");
                    this.value = '';
                    return;
                };
                reader.onload = function(e) {
                    this.value = '';
                    that.socket.emit('img', e.target.result, color);
                    that._displayMsg(curUser, e.target.result, color,"img");
                };
                reader.readAsDataURL(file);
            };
        }, false);
        this._initialEmoji();
        this.initSelectPic();
        document.getElementById('emoji').addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            };
        });
        document.getElementById('emojiWrapper').addEventListener('click', function(e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            };
        }, false);

    },
    //初始化表情
    _initialEmoji: function() {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 69; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = '../content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        };
        emojiContainer.appendChild(docFragment);
    },
    _displayMsg:function(user,msg,color,type) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),
            msgDiv="",
            userDiv="";
        msgToDisplay.style.color = color || '#000';
        if(type=="sys"){
            msgDiv=msg;
            msgToDisplay.className="sys";
            msgToDisplay.innerHTML = "系统消息" + '<span class="timespan">(' + date + '): </span>' + msgDiv;
        }else if(type=="img"){
            userDiv="<div class='user-msg'><img src='"+user.pic+"' time='"+date+"' /><span>"+user.nickName+"</span></div>"
            if(user.nickName=="我"){
                msgToDisplay.className="me";
                userDiv="<div class='user-msg'><span>"+user.nickName+"</span><img src='"+user.pic+"' time='"+date+"' /></div>"
            }
            msgDiv="<div class='msg-box'><div class=msg-content><span class='msg-arrow'></span><a href='"+msg+"' target='_blank'><img src='"+msg+"'/></a></div></div>";
            msgToDisplay.innerHTML =userDiv+ msgDiv;
        }else {
            msg = this._showEmoji(msg);
            msgDiv="<div class='msg-box'><div class=msg-content><span class='msg-arrow'></span>"+msg+"</div></div>";
            userDiv="<div class='user-msg'><img src='"+user.pic+"' time='"+date+"' /><span>"+user.nickName+"</span></div>"
            if(user.nickName=="我"){
                msgToDisplay.className="me";
                userDiv="<div class='user-msg'><span>"+user.nickName+"</span><img src='"+user.pic+"' time='"+date+"' /></div>"
            }
            msgToDisplay.innerHTML = userDiv + msgDiv;
        }
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    //匹配表情信息
    _showEmoji: function(msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../content/emoji/' + emojiIndex + '.gif" />');
            };
        };
        return result;
    },
    initSelectPic:function () {
        var imglist=document.body.querySelectorAll("#nickWrapper .img-list li");
        $(imglist).on("click",function (e) {
            e.stopPropagation();
            $(imglist).removeClass("checked");
            $(this).addClass("checked");
        })
    }
};