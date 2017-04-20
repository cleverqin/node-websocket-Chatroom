window.onload=function () {
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var urlPre = "http://cors.itxti.net/?"
    //发车、到站 查时刻
    var url1 = "www.tuling123.com/openapi/api?";
    var robot={
        nickName:"机器人",
        pic:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon36.png"
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
                onlineList:[robot],
                msgList:[
                    {
                        type:"sys",
                        content:{
                            msg:"系统消息：已连接智能聊天机器人"
                        }
                    }
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
                    this.getMsg(this.msg);
                    this.msg="";
                    document.querySelector(".msg-input").focus();
                }else {
                    this.msg="";
                }
            },
            sendImg:function () {
                document.querySelector(".imgInput").click();
            },
            getMsg:function (msg) {
                var _this=this;
                var url=urlPre+url1;
                $.ajax({
                    url:url,
                    type:"get",
                    dataType:"json",
                    data:{
                        key:'a36d98ad2dfa44a487c74fefff41080c',
                        info:msg,
                        userid:"123456"
                    },
                    success:function (data) {
                        if(data.text){
                            var msgItem={
                                type:'user',
                                content:{
                                    user:robot,
                                    msg:filterData(data)
                                }
                            }
                            _this.msgList.push(msgItem);
                        }
                    },
                    error:function (error) {

                    }
                })
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
    function filterData(data) {
        switch(data.code)
        {
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
                    html+="<li><a href='"+item.detailurl+"' target='_blank'>"+item.article+"</a></li>"
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
    }
}