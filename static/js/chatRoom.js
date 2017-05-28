(function () {
    Vue.filter('ago', function (value) {
        // 返回处理后的值
        return Time(value,"%h:%m")
    })
    var obj=null;
    var socket=null;
    var audio=document.getElementById('audio');
    var room="chartRoom";
    var store={
        state:{
            "chartRoom":[]
        }
    }
    var onlineItem = Vue.extend({
        template:"#onlineItem",
        props:['user','room','title','time'],
        methods:{
            changeRoom:function (user) {
                this.$parent.room=user.id;
                this.$parent.roomTitle=user.nickName;
            },
            lateMsg:function (user) {
                if(store.state[user.id]&&(store.state[user.id].length>0)){
                    var len=store.state[user.id].length;
                    var lateMsg=store.state[user.id][len-1];
                    return lateMsg.content.msg;
                }else {
                    return "";
                }
            }
        }
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
                this.$parent.isShow=false;
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
                isShow:false,
                curUser:{
                    nickName:"似水流年",
                    pic:"./images/img.jpg"
                },
                txt:"",
                keywords:'',
                room:room,
                userStatus:0,
                time:new Date().getTime(),
                onlineList:[],
                msgList:[],
                roomTitle:'群聊中'
            }
        },
        mounted:function () {
            var self=this;
            obj=new Face({
                el:document.querySelector('.web_wechat_face'),
                callBack:function (face) {
                    self.txt+="【"+face.title+"】";
                }
            })
            this.msgList=store.state[this.room];
            $('body').on('click','.tool-menu',function (e) {
                e.preventDefault()
                e.stopPropagation();
                $('.drop-box').toggle()
            })
            document.addEventListener("click",function (e) {
                $('.drop-box').hide()
            })
        },
        el: '#content',
        components: {
            'online-item': onlineItem,
            'msg-item': msgItem,
            'login': login
        },
        methods:{
            sendMsg:function () {
                if(this.txt.Trim()!=""){
                    var msgItem={
                        type:'send',
                        content:{
                            user:this.curUser,
                            msg:obj.replaceFace(this.txt)
                        },
                        time:new Date().getTime()
                    }
                    if(!store.state[this.room]){
                        store.state[this.room]=[]
                    }
                    store.state[this.room].push(msgItem)
                    this.postMsg(this.txt)
                    this.txt="";
                }else {
                    this.msg="";
                }
                this.time=new Date().getTime();
                this.$nextTick(function () {
                   this.scrollFooter()
                })
            },
            postMsg:function (msg) {
                if(socket){
                    if(this.room!='chartRoom'){
                        socket.emit('privateMsg',this.room, msg);
                    }else {
                        socket.emit('postMsg', msg);
                    }
                }
            },
            filterName:function () {
                var arr=[];
                var self=this
                this.onlineList.forEach(function (item ){
                    if(item.nickName.indexOf(self.keywords)!=-1){
                        arr.push(item)
                    }
                })
                return arr;
            },
            changeRoom:function () {
                this.roomTitle='群聊中';
                this.room="chartRoom";
                this.msgList=store.state[this.room]
            },
            scrollFooter:function () {
                document.querySelector(".msg-content").scrollTop = document.querySelector(".msg-content").scrollHeight;
            }
        },
        watch:{
            'room':function (curVal,oldVal) {
                if(curVal!=oldVal){
                    if(!store.state[curVal]){
                        store.state[curVal]=[]
                    }
                    this.msgList=store.state[curVal];
                }
            }
        }
    });
    function initSocket() {
        socket.on('connect', function () {});
        socket.on('nickExisted', function () {
            document.querySelector(".error-msg-box").innerHTML="该昵称已存在";
            document.querySelector(".error-msg-box").style.display="inline";
        });
        socket.on('loginSuccess', function (user,users) {
            app.curUser=user;
            document.title = 'Chat聊天室 | '+app.curUser.nickName;
            app.isShow=false;
            app.isPower=true;
            app.userStatus=1;
            users.forEach(function (item,index) {
                if(item.nickName==app.curUser.nickName){
                    users.splice(index,1)
                }
            })
            app.onlineList=users;
        });
        socket.on('error', function (err) {
            console.log(err);
        });
        socket.on('system', function (user, users, type) {
            var type=(type == 'login' ? ' 加入' : ' 离开');
            var msg='系统消息：'+user.nickName+type+'了聊天室';
            if(type != 'login'){
                if(app.room==user.id){
                    app.room="chartRoom";
                    app.roomTitle="群聊中"
                }
            }
            var msgItem={
                type:"sys",
                content:{
                    msg:msg
                },
                time:new Date().getTime()
            }
            store.state['chartRoom'].push(msgItem);
            users.forEach(function (item,index) {
                if(item.nickName==app.curUser.nickName){
                    users.splice(index,1)
                }
            })
            app.onlineList=users;
        });
        socket.on('newMsg', function (user, msg) {
            var msgItem={
                type:"user",
                content:{
                    user:user,
                    msg:obj.replaceFace(msg)
                },
                time:new Date().getTime()
            }
            store.state['chartRoom'].push(msgItem);
            app.time=new Date().getTime();
            if(app.room=='chartRoom'){
                app.$nextTick(function () {
                    app.scrollFooter()
                })
            }
        });
        socket.on('personMsg',function (user,msg) {
            var msgItem={
                type:"user",
                content:{
                    user:user,
                    msg:obj.replaceFace(msg)
                },
                time:new Date().getTime()
            }
            if(!store.state[user.id]){
                store.state[user.id]=[]
            }
            store.state[user.id].push(msgItem)
            app.time=new Date().getTime();
            if(app.room==user.id){
                app.$nextTick(function () {
                    app.scrollFooter()
                })
            }
            audio.play();
        })
    }
})()
function init(res) {
    document.querySelector('.bg-blur').style.backgroundImage="url("+res.images[0].url+")";
}