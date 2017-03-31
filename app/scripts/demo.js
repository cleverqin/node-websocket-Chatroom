$(function () {
    var f=new Face({
        el:document.querySelector(".faceBtn"),
        callBack:function (face,faceWarp) {
            msgInput.value+="【"+face.title+"】"
        }
    });
    var curColor="#000";
    var  sendBtn=document.querySelector(".send-btn");
    var msgList=document.querySelector(".msg-content-box .chat-msg-list");
    var msgInput=document.querySelector(".msg-input");
    var nickName=document.querySelector("#nicknameInput");
    var errorBox=document.querySelector(".error-msg-box");
    var cancelBtn=document.getElementById("cancelBtn");
    var onlineList=document.querySelector(".online-list");
    var onlineNumBox=document.querySelector(".online-num");
    var loginWrapper=document.getElementById("loginWrapper");
    var showLoginBtn=document.querySelector(".login-btn");
    var imgBtn=document.querySelector(".iconPic");
    var imgInput=document.querySelector(".imgInput");
    var loginBtn=document.querySelector("#loginBtn");
    var _pic = document.body.querySelectorAll("#nickWrapper .img-list li.checked img")[0].src;
    var chat=null;
    var curUser = {
        nickName: "我",
        pic: _pic,
        address: ""
    }
    $(cancelBtn).on("click",function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(loginWrapper).fadeOut();
        if(chat){
            chat=null;
        }
        nickName.value="";
    })
    $(showLoginBtn).on("click",function (e) {
        e.preventDefault();
        e.stopPropagation();
        chat=new MyChat();
        chat.init();
        $(loginWrapper).fadeIn();
    })
    $(loginBtn).on("click",function () {
        if(chat){
            var name=nickName.value;
            if($.trim(nickName)!=""){
                curUser.nickName=name;
                curUser.pic=document.body.querySelectorAll("#nickWrapper .img-list li.checked img")[0].src;
                chat.socket.emit('login', curUser);
            }
        }else {
            console.log("出错了！！")
        }
    })
    $(imgBtn).on("click",function (e) {
        $(imgInput).trigger("click");
        e.preventDefault();
        e.stopPropagation();
    });
    $(imgInput).on("change",function () {
        if(chat){
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader();
                if (!reader) {
                    this.value = '';
                    return;
                };
                reader.onload = function(e) {
                    this.value = '';
                    chat.socket.emit('img', e.target.result, curColor);
                    showMeMsg(e.target.result,"img")
                };
                reader.readAsDataURL(file);
            };
        }
    }),
    $(sendBtn).on('click',function () {
        sendMsg();
    })
    msgInput.addEventListener('keyup', function(e) {
            if (e.keyCode == 13 ) {
                sendMsg();
            }
    });
    initSelectPic();
    function sendMsg() {
        var content=msgInput.value;
        if(chat&&$.trim(content)){
            content=f.replaceFace(content);
            chat.socket.emit("postMsg",content,curColor);
            showMeMsg(content,"postMsg");
            msgInput.value="";
        }
    }
    function showMeMsg(msg,type) {
        if(type=="img"){
            msg="<img src='"+msg+"'>";
        }
        var tpl='<li class="me-msg"> <div class="msg-box">' +
            ' <div class="msg-box-img"> ' +
            '<img src="'+curUser.pic+'" class="user-img"> ' +
            '<div class="msg-tag-txt">我</div> </div>' +
            ' <div class="msg-txt-box"> <div class="msg-txt-content"><span class="msg-arrow"></span>' +
            msg +
            '</div> </div> ' +
            '</div> </li>';

        msgList.innerHTML+=tpl;
        document.querySelector(".msg-content-box").scrollTop = document.querySelector(".msg-content-box").scrollHeight;
    }
    function initSelectPic() {
        var imglist=document.body.querySelectorAll("#nickWrapper .img-list li");
        $(imglist).on("click",function (e) {
            e.stopPropagation();
            $(imglist).removeClass("checked");
            $(this).addClass("checked");
        })
    }
//显示系统消息的方法
    function showSysMsg(user,userList,onlineNum,type) {
        var sysTpl=getSysTpl(user,type);
        var onlineTpl=getOnlineTpl(userList);
        msgList.innerHTML+=sysTpl;
        onlineNumBox.innerHTML=onlineNum;
        onlineList.innerHTML=onlineTpl;
    }
    function getSysTpl(user,type) {
        var type=(type == 'login' ? ' 加入' : ' 离开');
        var sysTpl='<li class="sys-msg"><div class="msg-box">系统消息：'+user.nickName+type+'了聊天室</div> </li>';
        return sysTpl;
    }
    function getOnlineTpl(userList) {
        var onLineTpl="";
        for(var index in userList){
            var item=userList[index];
            var itemTpl='<li class="online-item"> <div class="img-box"><img src="'+item.pic+'"></div> <div class="name-box">'+item.nickName+'</div> </li>';
            onLineTpl+=itemTpl;
        }
        return onLineTpl;
    }
//显示文字消息的方法
    function showNewMsg(user,msg,color) {
        var newMsgTpl=getNewMsgTpl(user,msg,color);
        msgList.innerHTML+=newMsgTpl;
    }
    function getNewMsgTpl(user,msg,color) {
        var tpl='<li class="user-msg">' +
            ' <div class="msg-box"> ' +
            '<div class="msg-box-img">' +
            ' <img src="'+user.pic+'" class="user-img"> ' +
            '<div class="msg-tag-txt">'+user.nickName+'</div> ' +
            '</div> <div class="msg-txt-box"> ' +
            '<div class="msg-txt-content"><span class="msg-arrow"></span>' +
            msg +
            '</div> </div> </div> </li>'
        return tpl;
    }
//显示图片消息的方法
    function showImgMsg(user,imgData,color) {
        var imgMsgTpl=getImgDataTpl(user,imgData,color);
        msgList.innerHTML+=imgMsgTpl;
    }
    function getImgDataTpl(user,imgData,color) {
        var tpl='<li class="user-msg">' +
            ' <div class="msg-box"> ' +
            '<div class="msg-box-img">' +
            ' <img src="'+user.pic+'" class="user-img"> ' +
            '<div class="msg-tag-txt">'+user.nickName+'</div> ' +
            '</div> <div class="msg-txt-box"> ' +
            '<div class="msg-txt-content"><span class="msg-arrow"></span>' +
            '<img src="'+imgData+'"/> '+
            '</div> </div> </div> </li>'
        return tpl;
    }
    //登录成功后处理视图
    function loginSuces() {
        $(showLoginBtn).hide();
        document.getElementById("userPic").src=curUser.pic;
        document.getElementById("userName").innerHTML=curUser.nickName;
        $('#onlineUser').show();
    }
    var MyChat = function() {
        this.socket = null;
    };
    MyChat.prototype = {
        init: function () {
            var that = this;
            this.socket = io.connect();
            this.socket.on('connect', function () {

            });
            this.socket.on('nickExisted', function () {
                errorBox.innerHTML="该昵称已存在！"
                $(errorBox).show();
            });
            this.socket.on('loginSuccess', function () {
                document.title = 'Chat聊天室 | ' + curUser.nickName;
                errorBox.innerHTML="";
                $(errorBox).hide();
                $(loginWrapper).fadeOut();
                loginSuces();
            });
            this.socket.on('error', function (err) {
                console.log(err);
            });
            this.socket.on('system', function (user, users, userCount, type) {
                showSysMsg(user, users, userCount, type);
                document.querySelector(".msg-content-box").scrollTop = document.querySelector(".msg-content-box").scrollHeight;
            });
            this.socket.on('newMsg', function (user, msg, color) {
                showNewMsg(user,msg,color);
                document.querySelector(".msg-content-box").scrollTop = document.querySelector(".msg-content-box").scrollHeight;
            });
            this.socket.on('newImg', function (user, msg, color) {
                showImgMsg(user,msg,color);
                document.querySelector(".msg-content-box").scrollTop = document.querySelector(".msg-content-box").scrollHeight;
            });
        }
    }
})
