window.onload=function () {
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var face=null;
    var socket=null;
    var onlineItem = Vue.extend({
        template:"#onlineItem",
        props:['user']
    });
    var msgItem=Vue.extend({
        template:"#msgTpl",
        props:['msg']
    });
    var login=Vue.extend({
        template:"#loginTpl",
        data:function () {
            return{
                user:{
                    nickName:"",
                    pic:"content/headPic/1.jpg"
                },
                picList:['content/headPic/1.jpg',
                    'content/headPic/2.jpg',
                    'content/headPic/3.jpg',
                    'content/headPic/4.jpg',
                    'content/headPic/5.jpg',
                    'content/headPic/6.jpg',
                    'content/headPic/7.jpg',
                    'content/headPic/8.jpg',
                    'content/headPic/9.jpg',
                    'content/headPic/10.jpg']
            }
        },
        props:['show'],
        created:function () {
        },
        methods:{
            hideLogin:function () {
                this.$parent.isShow=false
            },
            selectUserPic:function (item) {
                this.user.pic=item;
            },
            login:function () {
                if(this.user.nickName.Trim()==""){
                    document.querySelector(".error-msg-box").innerHTML="请输入正确昵称";
                    document.querySelector(".error-msg-box").style.display="inline";
                }else {
                    document.querySelector(".error-msg-box").style.display="none";
                    if(!socket) {
                        socket = io.connect();
                        initSocket();
                    }
                    this.$parent.curUser=this.user;
                    socket.emit('login', this.user);
                }
            }
        }
    });
    var app = new Vue({
        data:function () {
            return{
                isPower:false,
                color:'#000',
                isShow:false,
                onlineNum:0,
                curUser:{
                    nickName:"似水流年",
                    pic:"content/headPic/1.jpg"
                },
                msg:"",
                onlineList:[],
                msgList:[]
            }
        },
        el: '#content',
        components: {
            'online-item': onlineItem,
            'msg-item': msgItem,
            'login': login
        },
        methods:{
            sendMsg:function () {
                if(this.isPower){
                    if(this.msg.Trim()!=""){
                        var msgItem={
                            type:'send',
                            content:{
                                user:this.curUser,
                                msg:face.replaceFace(this.msg)
                            }
                        }
                        socket.emit("postMsg",face.replaceFace(this.msg),"#000");
                        this.msgList.push(msgItem);
                        this.msg="";
                        document.querySelector(".msg-input").focus();
                    }else {
                        this.msg="";
                    }
                }
            },
            sendImg:function () {
                document.querySelector(".imgInput").click();
            },
            imgSelect:function () {
                if(this.isPower){
                    var _this=this;
                    var img=document.querySelector(".imgInput");
                    if (img.files.length != 0) {
                        var file = img.files[0],
                            reader = new FileReader();
                        if (!reader) {
                            img.value = '';
                            return;
                        };
                        reader.onload = function(e) {
                            img.value = '';
                            var msgItem={
                                type:'send',
                                content:{
                                    user:_this.curUser,
                                    msg:'<img src="'+e.target.result+'">'
                                }
                            }
                            socket.emit('img', e.target.result, '#000');
                            _this.msgList.push(msgItem);
                        };
                        reader.readAsDataURL(file);
                    };
                }
            }
        },
        updated:function () {
            document.querySelector(".msg-content-box").scrollTop = document.querySelector(".msg-content-box").scrollHeight;
        }
    });
    face=new Face({
        el:document.querySelector(".faceBtn"),
        callBack:function (face,faceWarp) {
            app.msg+="【"+face.title+"】"
        }
    });
    function initSocket(){
        socket.on('connect', function () {});
        socket.on('nickExisted', function () {
            document.querySelector(".error-msg-box").innerHTML="该昵称已存在";
            document.querySelector(".error-msg-box").style.display="inline";
        });
        socket.on('loginSuccess', function () {
            document.title = 'Chat聊天室 | '+app.curUser.nickName;
            app.isShow=false;
            document.querySelector(".login-btn").style.display="none";
            document.getElementById("onlineUser").style.display="block";
            app.isPower=true;
        });
        socket.on('error', function (err) {
            console.log(err);
        });
        socket.on('system', function (user, users, userCount, type) {
                var type=(type == 'login' ? ' 加入' : ' 离开');
                var msg='系统消息：'+user.nickName+type+'了聊天室'
                var msgItem={
                    type:"sys",
                    content:{
                        msg:msg
                    }
                }
                app.msgList.push(msgItem);
                app.onlineList=users;
                app.onlineNum=userCount;
        });
        socket.on('newMsg', function (user, msg, color) {
            var msgItem={
                type:"user",
                content:{
                    user:user,
                    msg:msg
                },
                color:color
            }
            app.msgList.push(msgItem);
        });
        socket.on('newImg', function (user, msg, color) {
            var msgItem={
                type:"user",
                content:{
                    user:user,
                    msg:'<img src="'+msg+'">'
                },
                color:color
            }
            app.msgList.push(msgItem);
        });
    }
}