(function () {
    window.onbeforeunload=function(){
        return "您确定退出吗？";
    }
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    Vue.filter('ago', function (value) {
        // 返回处理后的值
        return Time(value,"%h:%m")
    })
    var API={
        robot:{
            url:'http://www.tuling123.com/openapi/api',
            type:'get',
            dataType:"json"
        },
        weather:{
            url:'http://api.asilu.com/weather/',
            type:'get',
            dataType:"jsonp"
        },
        train:{
            url:'http://cors.itxti.net/?www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?&UserID=',
            type:'get',
            dataType:""
        },
        express:{
            url:'http://api.asilu.com/express/',
            type:'get',
            dataType:"jsonp"
        },
        request:function (type,data,callback) {
            var _this=this;
            $.ajax({
                url:_this[type].url,
                type:_this[type].type,
                dataType:_this[type].dataType,
                data:data,
                success:function (res) {
                    callback(res)
                },
                error:function (error) {

                }
            })
        }
    }
    var robot={
        id:"a110",
        nickName:"机器人",
        pic:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon36.png"
    }
    var store={
        state:{
            channel:robot,
            msg:{
                "a110":[]
            }
        }
    }
    var obj=null;
    var audio=document.getElementById('audio')
    var onlineItem = Vue.extend({
        template:"#onlineItem",
        props:['user','channel','time'],
        computed:{
            msg:function () {
                return store.state.msg
            }
        },
        methods:{
            changeChannel:function (user) {
                this.$parent.channel=user;
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
    var msgItem=Vue.extend({
        template:"#msgTpl",
        props:['msg']
    });
    var uiAlter=Vue.extend({
        template:"#myAlter",
        props:['show','type'],
        data:function(){
            return{
                city:"",
                com:"圆通",
                code:'',
                train:""
            }
        },
        methods:{
            hideAlter:function () {
                this.$parent.show=false;
            },
            searchWeather:function () {
                var _this=this;
                API.request('weather',{city:_this.city},function (res) {
                    $('.search-weather .json-renderer').jsonViewer(res);
                })
            },
            searchExpress:function () {
                var _this=this;
                API.request('express',{id:_this.code,com:_this.com},function (res) {
                    $('.search-express .json-renderer').jsonViewer(res);
                })
            },
            searchTrain:function () {
                var _this=this;
                API.request('train',{TrainCode:_this.train},function (data) {
                    var timeTables = $(data).find("TrainDetailInfo");
                    var tableData=[];
                    timeTables.each(function(index,obj){
                        var that = $(this);
                        if(that.find("TrainStation").text() == "数据没有被发现"){
                            tableData.push({error:0,msg:"数据没有被发现"});
                            return
                        }
                        var item={};
                        item.TrainStation=that.find("TrainStation").text();//
                        item.ArriveTime=that.find("ArriveTime").text();
                        item.StartTime=that.find("StartTime").text();
                        item.KM=that.find("KM").text();
                        tableData.push(item)
                    })
                    $('.search-train .json-renderer').jsonViewer(tableData);
                })
            }
        }
    })
    var app = new Vue({
        data:function () {
            return{
                curUser:{
                    id:'1',
                    nickName:"似水流年",
                    pic:"http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100"
                },
                show:false,
                showMenu:false,
                type:"weather",
                txt:"",
                keywords:'',
                time:"",
                onlineList:[robot,{
                    id:'b11',
                    nickName:"温柔的荆棘",
                    pic:"http://cleverqin.oschina.io/site/IM/img/10.jpg"
                }],
                msgList:[],
                channel:{}
            }
        },
        computed: {},
        watch:{
            channel:function (curvaule,oldVaule) {
                if(curvaule!=oldVaule){
                    store.state.channel=this.channel;
                    if(!store.state.msg[this.channel.id]){
                        store.state.msg[this.channel.id]=[]
                    }
                    this.msgList=store.state.msg[this.channel.id]
                    this.$nextTick(function () {
                        this.scrollFooter()
                    })
                }
            }
        },
        mounted:function () {
            var self=this;
            this.channel=store.state.channel;
            this.msgList=store.state.msg[store.state.channel.id];
            var msgItem={
                type:"sys",
                content:{
                    msg:"系统消息：机器人加入了聊天室"
                },
                time:new Date().getTime()
            }
            this.msgList.push(msgItem);
            obj=new Face({
                el:document.querySelector('.web_wechat_face'),
                callBack:function (face) {
                    self.txt+="【"+face.title+"】";
                }
            })
            document.addEventListener("click",function (e) {
                self.showMenu=false
            })
        },
        el: '#chatBox',
        components: {
            'online-item': onlineItem,
            'msg-item': msgItem,
            'ui-alter': uiAlter
        },
        methods:{
            sendMsg:function () {
                if(this.txt.Trim()!=""){
                    this.time=new Date().getTime();
                    var msgItem={
                        type:'send',
                        content:{
                            user:this.curUser,
                            msg:obj.replaceFace(this.txt)
                        },
                        time:this.time
                    }
                    this.msgList.push(msgItem);
                    this.scrollFooter();
                    this.postMsg(this.txt)
                    this.txt="";
                }else {
                    this.msg="";
                }
            },
            postMsg:function (msg) {
                var _this=this;
                API.request('robot',{
                    key:'a36d98ad2dfa44a487c74fefff41080c',
                    info:msg,
                    userid:"123456"
                },function (data) {
                    if(data.text){
                        _this.time=new Date().getTime();
                        var msgItem={
                            type:'user',
                            content:{
                                user:_this.channel,
                                msg:filterData(data)
                            },
                            time:_this.time
                        }
                        _this.msgList.push(msgItem);
                        _this.$nextTick(function () {
                            _this.scrollFooter()
                        })
                        audio.play();
                    }
                })
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
            scrollFooter:function () {
                const ul = this.$refs.list;
                ul.scrollTop = ul.scrollHeight;
            }
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
})()
function init(res) {
    document.querySelector('.bg-blur').style.backgroundImage="url("+res.images[0].url+")";
}