window.onload=function () {
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var urlPre = "http://cors.itxti.net/?"
    //发车、到站 查时刻
    var url1 = "www.tuling123.com/openapi/api?";
    var face=null;
    var robot={
        id:"a110",
        nickName:"机器人",
        pic:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon36.png"
    }
    var audio=document.querySelector('#audio');
    var state={
        channel:robot,
        msg:{
            "a110":[]
        }
    }
    var msgItem=Vue.extend({
        template:"#msgTpl",
        props:['msg']
    });
    var userItem=Vue.extend({
        template:"#userTpl",
        props:['user','channel','show','time'],
        computed:{
            msg:function () {
                return state.msg
            }
        },
        methods:{
            changeChannel:function (user) {
                this.$parent.channel=user;
                this.$parent.show=false;
            },
            getLastMsg:function () {
                var lastMsg="";
                var user=this.$props.user;
                if(this.msg[user.id]){
                    var len=this.msg[user.id].length;
                    if(len>0){
                        lastMsg=this.msg[user.id][len-1].content.msg;
                    }
                }
                return lastMsg
            }
        }
    });
    var app = new Vue({
        data:function () {
            return{
                curUser:{
                    id:"c111",
                    nickName:"似水流年",
                    pic:"img/img.jpg"
                },
                onlineList:[
                    robot,
                    {
                        id:'b110',
                        nickName:"温柔的荆棘",
                        pic:"img/10.jpg"
                    }
                ],
                content:"",
                msgList:[],
                show:false,
                channel:robot,
                time:new Date().getTime()
            }
        },
        watch:{
            channel:function () {
                if(!state.msg[this.channel.id]){
                    state.msg[this.channel.id]=[]
                }
                this.msgList=state.msg[this.channel.id];
                this.scrollFooter();
            }
        },
        el: '#content',
        components: {
            'msg-item': msgItem,
            'user-item': userItem
        },
        mounted:function(){
            var _this=this;
            this.channel=state.channel;
            this.msgList=state.msg[this.channel.id];
            this.$nextTick(function () {
                face=new Face({
                    el:document.querySelector(".ui-face-btn"),
                    callBack:function (face,faceWarp) {
                        _this.content+="【"+face.title+"】"
                    }
                });
            })
            var msgItem={
                type:'sys',
                content:{
                    msg:'系统消息：机器人上线了'
                }
            }
            this.msgList.push(msgItem)
            this.time=new Date().getTime()
        },
        methods:{
            sendMsg:function () {
                if(this.content.Trim()!=""){
                    var msgItem={
                        type:'send',
                        content:{
                            user:this.curUser,
                            msg:face.replaceFace(this.content)
                        }
                    }
                    this.msgList.push(msgItem);
                    this.getMsg(this.content);
                    this.content="";
                    this.scrollFooter();
                    this.time=new Date().getTime()
                }else {
                    this.msg="";
                }
            },
            getMsg:function (msg) {
                var _this=this;
                this.$http.get('http://www.tuling123.com/openapi/api',{params:{
                    key:'a36d98ad2dfa44a487c74fefff41080c',
                    info:msg,
                    userid:"123456"
                }}).then(function (response) {
                    var data=response.body;
                    if(data.text){
                        var msgItem={
                            type:'user',
                            content:{
                                user:_this.channel,
                                msg:filterData(data)
                            }
                        }
                        _this.msgList.push(msgItem);
                        _this.time=new Date().getTime()
                        _this.scrollFooter();
                        audio.play();
                    }
                })
            },
            scrollFooter:function () {
                this.$nextTick(function () {
                    var ul = this.$refs.list;
                    ul.scrollTop = ul.scrollHeight;
                })
            }
        }
    });
    face=new Face({
        el:document.querySelector(".ui-face-btn"),
        callBack:function (face,faceWarp) {
            app.content+="【"+face.title+"】"
        }
    });
    function filterData(data) {
        switch(data.code)
        {
            case 100000://文本类
                return data.text
                break;
            case 200000://链接类
                return data.text+"<a href='"+data.url+"' class='res-link' target='page'>打开页页面</a>"
                break;
            case 302000://新闻类
                var html=data.text+"<ul class='res-list'>";
                var len=3;
                if(data.list.length<3){
                    len=data.list.length
                }
                for(var i=0;i<len;i++){
                    var item=data.list[i];
                    html+="<li><a href='"+item.detailurl+"' target='page'>"+item.article+"</a></li>"
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
                    html+="<li><a href='"+item.detailurl+"' target='page'>"+item.name+"</a></li>"
                }
                html+='</li>';
                return html;
                break;
            default:
                return data.text
        }
    }
}