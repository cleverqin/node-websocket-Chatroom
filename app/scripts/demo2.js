window.onload=function () {
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var face=null;
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
                    pic:"app/content/headPic/1.jpg"
                },
                picList:['app/content/headPic/1.jpg',
                    'app/content/headPic/2.jpg',
                    'app/content/headPic/3.jpg',
                    'app/content/headPic/4.jpg',
                    'app/content/headPic/5.jpg',
                    'app/content/headPic/6.jpg',
                    'app/content/headPic/7.jpg',
                    'app/content/headPic/8.jpg',
                    'app/content/headPic/9.jpg',
                    'app/content/headPic/10.jpg']
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
                    this.$parent.isShow=false;
                    document.querySelector(".login-btn").style.display="none";
                    document.getElementById("onlineUser").style.display="block";
                    this.$parent.curUser=this.user;
                    document.title = 'Chat聊天室 | '+this.$parent.curUser.nickName;
                }
            }
        }
    });
    window.app = new Vue({
        data:function () {
            return{
                onlineNum:1,
                isShow:false,
                curUser:{
                    nickName:"似水流年",
                    pic:"app/content/headPic/1.jpg"
                },
                msg:"",
                onlineList:[{
                    nickName:"似水流年",
                    pic:"app/content/img.jpg"
                }],
                msgList:[
                    {
                        type:"user",
                        content:{
                            user:{
                                nickName:"似水流年",
                                pic:"app/content/img.jpg"
                            },
                            msg:"消息示例！！"
                        }
                    },
                    {
                        type:"send",
                        content:{
                            user:{
                                nickName:"我",
                                pic:"app/content/img.jpg"
                            },
                            msg:"这天消息来自我"
                        }
                    },
                    {
                        type:"sys",
                        content:{
                            msg:"系统消息：似水流年加入了聊天室"
                        }
                    },
                ]
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
                if(this.msg.Trim()!=""){
                    var msgItem={
                        type:'send',
                        content:{
                            user:this.curUser,
                            msg:face.replaceFace(this.msg)
                        }
                    }
                    this.msgList.push(msgItem);
                    this.msg="";
                    document.querySelector(".msg-input").focus();
                }else {
                    this.msg="";
                }
            },
            sendImg:function () {
                document.querySelector(".imgInput").click();
            },
            imgSelect:function () {
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
                        _this.msgList.push(msgItem);
                    };
                    reader.readAsDataURL(file);
                };
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
}