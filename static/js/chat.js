(function () {
    var socket=io.connect();
    var message=Vue.extend({
        props: ['message'],
        template:"#message",
        filters:{
            time:function (value) {
                function two(str) {
                    var s;
                    s = "" + str;
                    if (s.length === 1) {
                        s = "0" + s;
                    }
                    return s;
                };
                var time=new Date(value);
                var hour=time.getHours();
                var m=time.getMinutes();
                var s=time.getSeconds();
                return two(hour)+":"+two(m)+":"+two(s);
            }
        },
        methods:{
            filterText:function (text) {
                return this.$replaceFace(text)
            }
        }
    })
    var user=Vue.extend({
        props: ['user',"channel"],
        template:"#user",
        computed:{
            lastMsg:function () {
                var str='';
                var _this=this;
                if(_this.user.messages&&_this.user.messages.length>0){
                    str=_this.user.messages[_this.user.messages.length-1].text;
                }
                return str;
            }
        },
        methods:{
            change:function (id) {
                this.$emit("change-channel",id)
            },
            filterText:function (text) {
                return this.$replaceFace(text)
            }
        }
    })
    var login=Vue.extend({
        template:"#login",
        data:function () {
            var images=[
                'http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=956411241&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=1361514346&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=624748513&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=1741841217&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=157509895&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=453079985&spec=100',
                'http://q.qlogo.cn/headimg_dl?dst_uin=753678776&spec=100',
            ];
            return {
                avatarUrl:images[0],
                imgList:images,
                name:"",
                isShow:false,
                errorMsg:""
            }
        },
        created:function () {
            var _this=this;
            document.addEventListener("click",function (e) {
                _this.isShow=false;
            })
            _this.initSocketEvent();
        },
        methods:{
            userLogin:function () {
                this.name=this.name.replace(/(^\s*)|(\s*$)/g, "");
                if(this.name!=""){
                    socket.emit("login",{
                        name:this.name,
                        avatarUrl:this.avatarUrl
                    })
                }else {
                    this.showError("请输入用户昵称！")
                }
            },
            initSocketEvent:function () {
                var _this=this;
                socket.on("loginSuccess",function (user,users) {
                    _this.$emit("user-login",{
                        user:user,
                        users:users
                    })
                })
                socket.on("loginFail",function (msg) {
                    _this.showError(msg)
                })
            },
            showError:function (err) {
                console.log(err)
                var _this=this;
                if(this.interval){
                    clearTimeout(_this.interval)
                }
                this.errorMsg=err;
                this.interval=setTimeout(function () {
                    _this.errorMsg="";
                },3000)
            }
        }
    })
    new Vue({
        el:"#app",
        template:"#tpl",
        components:{
            "ui-message":message,
            "ui-user":user,
            "ui-login":login
        },
        data:function () {
            return {
                user:{
                    id:"705597001",
                    name:"似水流年",
                    avatarUrl:"./images/img.jpg"
                },
                users:[{
                    id:"group",
                    name:"群聊天室",
                    avatarUrl:"./images/group-icon.png",
                    messages:[]
                }],
                channel:"group",
                text:"",
                keywords:"",
                showMenu:false,
                isLogin:false,
                isVoice:true
            }
        },
        created:function () {
            var _this=this;
            document.addEventListener("click",function (e) {
                _this.showMenu=false;
            })
            _this.initBg()
        },
        mounted:function () {
            this.audio=this.$refs.audio;
        },
        computed:{
            messageList:function () {
                var msgList=[];
                var _this=this;
                this.users.forEach(function (item) {
                    if(item.id==_this.channel){
                        msgList=item.messages?item.messages:[]
                    }
                })
                return msgList
            },
            channelUser:function (){
                var _this=this;
                var user={};
                this.users.forEach(function (item) {
                    if(item.id==_this.channel){
                        user={
                            id:item.id,
                            name:item.name,
                            avatarUrl:item.avatarUrl
                        };
                    }
                })
                return user;
            }
        },
        methods:{
            sendMessage:function (channel,text,user,type) {
                var _this=this;
                var message={
                    channel:channel,
                    user:user,
                    type:type,
                    text:text,
                    time:new Date().getTime()
                };
                this.users.forEach(function (item,index) {
                    if(item.id==channel){
                        if(!item.messages){
                            _this.$set(_this.users[index],"messages",[])
                        }
                        if((type!='send'&&channel!=_this.channel)){
                            if(_this.users[index].unRead){
                                _this.users[index].unRead+=1;
                            }else {
                                _this.users[index].unRead=1;
                            }

                        }
                        item.messages.push(message)
                    }
                })
                this.$nextTick(function () {
                    if(_this.channel==channel){
                        _this.scrollFooter();
                    }
                })
                if(channel!="group"&&type!="send"&&_this.isVoice){
                    _this.audio.play();
                }
            },
            send:function () {
                this.text=this.text.replace(/(^\s*)|(\s*$)/g, "");
                if(this.text!=''){
                    this.sendMessage(this.channel,this.text,this.user,'send')
                    this.getMessage(this.channel,this.text,this.user)
                    this.text="";
                }
            },
            scrollFooter:function () {
                var ul = this.$refs.list;
                ul.scrollTop = ul.scrollHeight;
            },
            changeChannel:function (id) {
                var _this=this;
                this.channel=id;
                _this.setMessageReader(id);
                this.$nextTick(function () {
                    _this.scrollFooter();
                })
            },
            selectFace:function (text) {
                this.text+=text.phrase;
            },
            getMessage:function (channel,text,user) {
                var _this=this;
                if(channel=="group"){
                    socket.emit("groupMessage",text)
                }else {
                    socket.emit("message",channel,text)
                }
            },
            filterData:function (data) {
                switch(data.code) {
                    case 100000://文本类
                        return data.text
                        break;
                    case 200000://链接类
                        return data.text+"<a href='"+data.url+"' class='res-link' target='_blank'>打开页页面</a>"
                        break;
                    case 302000://新闻类
                        var html=data.text+"<ul class='res-list'>";
                        var len=3;
                        if(data.list.length<3){
                            len=data.list.length
                        }
                        for(var i=0;i<len;i++){
                            var item=data.list[i];
                            html+="<li><a href='"+item.detailurl+"' target='_blank'>"+(i+1)+".&nbsp;"+item.article+"</a></li>"
                        }
                        html+='</li>';
                        return html;
                        break;
                    case 308000://菜谱类
                        var html=data.text+"<ul class='res-list'>";
                        var len=3;
                        if(data.list.length<3){
                            len=data.list.length
                        }
                        for(var i=0;i<len;i++){
                            var item=data.list[i];
                            html+="<li><a href='"+item.detailurl+"' target='_blank'>"+item.name+"</a></li>"
                        }
                        html+='</li>';
                        return html;
                        break;
                    default:
                        return data.text
                }
            },
            filterName:function () {
                var arr=[];
                var self=this
                this.users.forEach(function (item ){
                    if(item.name.indexOf(self.keywords)!=-1){
                        arr.push(item)
                    }
                })
                return arr;
            },
            initBg:function () {
                this.$http.jsonp("https://api.asilu.com/bg")
                    .then(function (data) {
                        var images=data.body.images;
                        document.body.style.backgroundImage="url('./images/a1 (10).jpg')";
                        setInterval(function () {
                            var index=parseInt(Math.random()*images.length);
                            var img=new Image();
                            img.addEventListener('load',function () {
                                document.body.style.backgroundImage="url("+images[index].url+")";
                            })
                            img.src=images[index].url;
                        },30000)
                    })
            },
            userLogin:function (params) {
                this.initSocketEvent(params)
                this.isLogin=!this.isLogin;
            },
            initSocketEvent:function (params) {
                var _this=this;
                this.user=params.user;
                params.users.forEach(function (item) {
                    item.messages=[]
                    _this.users.push(item)
                })
                socket.on("message",function (user,text) {
                    _this.sendMessage(user.id,text,user,"user")
                })
                socket.on("groupMessage",function (user,text) {
                    _this.sendMessage("group",text,user,"user")
                })
                socket.on('system',function (user,type) {
                    if(type=="join"){
                        user.messages=[]
                        _this.users.push(user)
                    }
                    if(type=="logout"){
                        _this.channel="group";
                        _this.users.forEach(function (item,index) {
                            if(item.id==user.id){
                                _this.users.splice(index, 1);
                            }
                        })
                    }
                })
            },
            setMessageReader:function (id) {
                var _this=this;
                this.users.forEach(function (item,index) {
                    if(item.id==id){
                        _this.users[index].unRead=0
                    }
                })
            }
        }
    })
})()