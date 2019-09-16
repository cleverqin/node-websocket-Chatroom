(function (Vue) {
    let expressions=[{"title": "[坏笑]", "url":"/50/pcmoren_huaixiao_org.png"},
        {"title": "[舔屏]", "url":  "/40/pcmoren_tian_org.png"},
        {"title": "[污]", "url":  "/3c/pcmoren_wu_org.png"},
        {"title": "[允悲]", "url":  "/2c/moren_yunbei_org.png"},
        {"title": "[笑而不语]", "url":  "/3a/moren_xiaoerbuyu_org.png"},
        {"title": "[费解]", "url":  "/3c/moren_feijie_org.png"},
        {"title": "[憧憬]", "url":  "/37/moren_chongjing_org.png"},
        {"title": "[并不简单]", "url":  "/fd/moren_bingbujiandan_org.png"},
        {"title": "[微笑]", "url":  "/5c/huanglianwx_org.gif"},
        {"title": "[嘻嘻]", "url":  "/0b/tootha_org.gif"},
        {"title": "[哈哈]", "url":  "/6a/laugh.gif"},
        {"title": "[可爱]", "url":  "/14/tza_org.gif"},
        {"title": "[可怜]", "url":  "/af/kl_org.gif"},
        {"title": "[挖鼻]", "url":  "/0b/wabi_org.gif"},
        {"title": "[吃惊]", "url":  "/f4/cj_org.gif"},
        {"title": "[害羞]", "url":  "/6e/shamea_org.gif"},
        {"title": "[挤眼]", "url":  "/c3/zy_org.gif"},
        {"title": "[闭嘴]", "url":  "/29/bz_org.gif"},
        {"title": "[鄙视]", "url":  "/71/bs2_org.gif"},
        {"title": "[爱你]", "url":  "/6d/lovea_org.gif"},
        {"title": "[泪]", "url":  "/9d/sada_org.gif"},
        {"title": "[偷笑]", "url":  "/19/heia_org.gif"},
        {"title": "[亲亲]", "url":  "/8f/qq_org.gif"},
        {"title": "[生病]", "url":  "/b6/sb_org.gif"},
        {"title": "[太开心]", "url":  "/58/mb_org.gif"},
        {"title": "[白眼]", "url":  "/d9/landeln_org.gif"},
        {"title": "[右哼哼]", "url":  "/98/yhh_org.gif"},
        {"title": "[左哼哼]", "url":  "/6d/zhh_org.gif"},
        {"title": "[嘘]", "url":  "/a6/x_org.gif"},
        {"title": "[衰]", "url":  "/af/cry.gif"},
        {"title": "[委屈]", "url":  "/73/wq_org.gif"},
        {"title": "[吐]", "url":  "/9e/t_org.gif"},
        {"title": "[哈欠]", "url":  "/cc/haqianv2_org.gif"},
        {"title": "[抱抱_旧]", "url":  "/27/bba_org.gif"},
        {"title": "[怒]", "url":  "/7c/angrya_org.gif"},
        {"title": "[疑问]", "url":  "/5c/yw_org.gif"},
        {"title": "[馋嘴]", "url":  "/a5/cza_org.gif"},
        {"title": "[拜拜]", "url":  "/70/88_org.gif"},
        {"title": "[思考]", "url":  "/e9/sk_org.gif"},
        {"title": "[汗]", "url":  "/24/sweata_org.gif"},
        {"title": "[困]", "url":  "/40/kunv2_org.gif"},
        {"title": "[睡]", "url":  "/96/huangliansj_org.gif"},
        {"title": "[钱]", "url":  "/90/money_org.gif"},
        {"title": "[失望]", "url":  "/0c/sw_org.gif"},
        {"title": "[酷]", "url":  "/40/cool_org.gif"},
        {"title": "[色]", "url":  "/20/huanglianse_org.gif"},
        {"title": "[哼]", "url":  "/49/hatea_org.gif"},
        {"title": "[鼓掌]", "url":  "/36/gza_org.gif"},
        {"title": "[晕]", "url":  "/d9/dizzya_org.gif"},
        {"title": "[悲伤]", "url":  "/1a/bs_org.gif"},
        {"title": "[抓狂]", "url":  "/62/crazya_org.gif"},
        {"title": "[黑线]", "url":  "/91/h_org.gif"},
        {"title": "[阴险]", "url":  "/6d/yx_org.gif"},
        {"title": "[怒骂]", "url":  "/60/numav2_org.gif"},
        {"title": "[互粉]", "url":  "/89/hufen_org.gif"},
        {"title": "[心]", "url":  "/40/hearta_org.gif"},
        {"title": "[伤心]", "url":  "/ea/unheart.gif"},
        {"title": "[猪头]", "url":  "/58/pig.gif"},
        {"title": "[熊猫]", "url":  "/6e/panda_org.gif"},
        {"title": "[兔子]", "url":  "/81/rabbit_org.gif"},
        {"title": "[ok]", "url":  "/d6/ok_org.gif"},
        {"title": "[耶]", "url":  "/d9/ye_org.gif"},
        {"title": "[good]", "url":  "/d8/good_org.gif"},
        {"title": "[NO]", "url":  "/ae/buyao_org.gif"},
        {"title": "[赞]", "url":  "/d0/z2_org.gif"},
        {"title": "[来]", "url":  "/40/come_org.gif"},
        {"title": "[弱]", "url":  "/d8/sad_org.gif"},
        {"title": "[草泥马]", "url":  "/7a/shenshou_org.gif"},
        {"title": "[神马]", "url":  "/60/horse2_org.gif"},
        {"title": "[囧]", "url":  "/15/j_org.gif"},
        {"title": "[浮云]", "url":  "/bc/fuyun_org.gif"},
        {"title": "[给力]", "url":  "/1e/geiliv2_org.gif"},
        {"title": "[围观]", "url":  "/f2/wg_org.gif"},
        {"title": "[威武]", "url":  "/70/vw_org.gif"},
        {"title": "[话筒]", "url":  "/9f/huatongv2_org.gif"},
        {"title": "[蛋糕]", "url":  "/3a/cakev2_thumb.gif"},
        {"title": "[蜡烛]", "url":  "/d9/lazhuv2_org.gif"},
        {"title": "[广告]", "url":  "/60/ad_new0902_org.gif"},
        {"title": "[doge]", "url":  "/b6/doge_org.gif"},
        {"title": "[喵喵]", "url":  "/4a/mm_org.gif"},
        {"title": "[二哈]", "url":  "/74/moren_hashiqi_org.png"},
        {"title": "[哆啦A梦无奈]", "url":  "/96/dora_wunai_org.png"},
        {"title": "[哆啦A梦笑]", "url":  "/54/dora_xiao_org.png"},
        {"title": "[哆啦A梦亲亲]", "url":  "/e0/dora_qinqin_org.png"},
        {"title": "[哆啦A梦美味]", "url":  "/21/dora_meiwei_org.png"},
        {"title": "[哆啦A梦开心]", "url":  "/df/dora_kaixin_org.png"},
        {"title": "[笑cry]", "url":  "/34/xiaoku_org.gif"},
        {"title": "[摊手]", "url":  "/09/pcmoren_tanshou_org.png"},
        {"title": "[抱抱]", "url":  "/70/pcmoren_baobao_org.png"},
        {"title": "[红包飞]", "url":  "/c8/../e0/hongbao1_org.gif"},
        {"title": "[发红包]", "url":  "/ca/fahongbao_org.gif"},
        {"title": "[冰川时代希德奶奶]", "url":  "/35/bhsj5_nainai_org.gif"},
        {"title": "[快银]", "url":  "/7e/xman_kuaiyin_org.gif"},
        {"title": "[暴风女]", "url":  "/7b/xman_baofengnv_org.gif"},
        {"title": "[芒果流口水]", "url":  "/64/mango_07_org.gif"},
        {"title": "[芒果点赞]", "url":  "/5c/mango_12_org.gif"},
        {"title": "[芒果大笑]", "url":  "/9f/mango_02_org.gif"},
        {"title": "[芒果得意]", "url":  "/ee/mango_03_org.gif"},
        {"title": "[芒果萌萌哒]", "url":  "/49/mango_11_org.gif"},
        {"title": "[羊年大吉]", "url":  "/cc/yangniandj_org.gif"},
        {"title": "[西瓜]", "url":  "/6b/watermelon.gif"},
        {"title": "[足球]", "url":  "/c0/football.gif"},
        {"title": "[老妈我爱你]", "url":  "/46/mothersday_org.gif"},
        {"title": "[母亲节]", "url":  "/36/carnation_org.gif"},
        {"title": "[肥皂]", "url":  "/e5/soap_org.gif"},
        {"title": "[有钱]", "url":  "/e6/youqian_org.gif"},
        {"title": "[地球一小时]", "url":  "/dc/earth1r_org.gif"},
        {"title": "[国旗]", "url":  "/dc/flag_org.gif"},
        {"title": "[许愿]", "url":  "/87/lxhxuyuan_org.gif"},
        {"title": "[风扇]", "url":  "/92/fan.gif"},
        {"title": "[炸鸡和啤酒]", "url":  "/f4/zhaji_org.gif"},
        {"title": "[雪]", "url":  "/00/snow_org.gif"},
        {"title": "[马上有对象]", "url":  "/ee/mashangyouduixiang_org.gif"},
        {"title": "[马到成功旧]", "url":  "/30/madaochenggong_org.gif"},
        {"title": "[青啤鸿运当头]", "url":  "/f8/hongyun_org.gif"},
        {"title": "[让红包飞]", "url":  "/0b/hongbaofei2014_org.gif"},
        {"title": "[ali做鬼脸]", "url":  "/20/alizuoguiliannew_org.gif"},
        {"title": "[ali哇]", "url":  "/de/aliwanew_org.gif"},
        {"title": "[xkl转圈]", "url":  "/f4/xklzhuanquan_org.gif"},
        {"title": "[酷库熊顽皮]", "url":  "/46/kxwanpi_org.gif"},
        {"title": "[bm可爱]", "url":  "/95/bmkeai_org.gif"},
        {"title": "[BOBO爱你]", "url":  "/74/boaini_org.gif"},
        {"title": "[转发]", "url":  "/02/lxhzhuanfa_org.gif"},
        {"title": "[得意地笑]", "url":  "/d4/lxhdeyidixiao_org.gif"},
        {"title": "[ppb鼓掌]", "url":  "/7e/ppbguzhang_org.gif"},
        {"title": "[din推撞]", "url":  "/dd/dintuizhuang_org.gif"},
        {"title": "[moc转发]", "url":  "/cb/moczhuanfa_org.gif"},
        {"title": "[lt切克闹]", "url":  "/73/ltqiekenao_org.gif"},
        {"title": "[江南style]", "url":  "/67/gangnamstyle_org.gif"},
        {"title": "[笑哈哈]", "url":  "/32/lxhwahaha_org.gif"}]
    let baseUrl="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal";
    let arr=[];
    expressions.forEach((item)=>{
        item.url=baseUrl+item.url;
        arr.push(item);
    });
    Vue.prototype.$parserExpression=(text)=>{
        const getIndex=(title)=>{
            let index=-1;
            arr.forEach((item,i)=>{
                if(item.title==title){
                    index=i;
                }
            });
            return index;
        }
        if(typeof (text) != "undefined") {
            let sArr = text.match(/\[.*?\]/g);
            if(sArr&&sArr.length>0){
                for(let i = 0; i < sArr.length; i++){
                    let index=getIndex(sArr[i]);
                    if(index!=-1) {
                        const reStr = "<img src="+arr[index].url + " height='20' width='20' />";
                        text = text.replace(sArr[i], reStr);
                    }
                }
            }
        }
        return text;
    }
    Vue.component('wt-message',{
        template:"#message",
        props:["message","loginUser",'setting']
    });
    Vue.component("user",{
        template: "#user",
        props: ["messages","user","setting"],
        computed:{
            lastMessage(){
                let len=this.messages.length;
                if(len==0){
                    return {}
                }else {
                    return this.messages[len-1];
                }
            },
            unReaderNum(){
                let num=0;
                let len=this.messages.length;
                if(len!=0){
                    this.messages.forEach((item)=>{
                        if(!item.isRead){
                            num++;
                        }
                    })
                }
                return num
            }
        }
    });
    Vue.component("expression",{
        template:"#expression",
        data(){
            return {
                expressions:arr,
                isShow:false
            }
        },
        created:function () {
            let _this=this;
            document.addEventListener("click",(e)=>{
                _this.isShow=false;
            })
        },
        methods:{
            pickerExpression(expression){
                this.$emit("picker-expression",expression)
            },
            toggleShow(){
                this.isShow=!this.isShow;
            }
        }
    })
    Vue.filter('time',(value)=>{
        if(!value){
            return value;
        }
        function two(str) {
            let s;
            s = "" + str;
            if (s.length === 1) {
                s = "0" + s;
            }
            return s;
        };
        let time=new Date(value);
        let hour=time.getHours();
        let m=time.getMinutes();
        let s=time.getSeconds();
        return two(hour)+":"+two(m)+":"+two(s);
    })
    Vue.component('login',{
        template:"#login",
        data(){
            return {
                user:{
                    name:"",
                    avatarUrl:"http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100",
                    type:"user",
                },
                avatars:[
                    'http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=956411241&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=1361514346&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=624748513&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=1741841217&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=157509895&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=453079985&spec=100',
                    'http://q.qlogo.cn/headimg_dl?dst_uin=753678776&spec=100',
                ],
                QQ:"",
                isShow:false,
            }
        },
        created(){
            let _this=this;
            document.addEventListener('click',(e)=>{
                _this.isShow=false;
            })
            _this.user.name=_this.randomText();
            let QQ=_this.randomQQ();
            let url="http://q.qlogo.cn/headimg_dl?dst_uin=" + QQ + "&spec=100";
            _this.addQQAvatar(QQ);
            _this.user.avatarUrl=url;
        },
        methods:{
            addQQAvatar(QQ){
                let reg=/^[1-9][0-9]{3,9}[0-9]$/;
                if(reg.test(QQ)){
                    let url="http://q.qlogo.cn/headimg_dl?dst_uin=" + QQ + "&spec=100";
                    if(this.avatars.indexOf(url)==-1){
                        this.avatars.push(url);
                    }
                    this.QQ=""
                }else {
                    console.log("请输入正确的QQ号！")
                    this.$alterMessage({
                        type:'info',
                        text: "请输入正确的QQ号！"
                    })
                }
            },
            login(user){
                this.$emit("login",user)
            },
            randomText() {
                let word=new randomName().randomName();
                console.log(word);
                return word;
            },
            randomQQ(){
                let num=parseInt(Math.random()*3+6);
                let firstNum=parseInt(Math.random()*9+1);
                let QQ=""+firstNum;
                for (let i = 0; i < num; i++) {
                    QQ+=parseInt(Math.random()*9);
                }
                return QQ;
            }
        }
    });
    let message={
        install(Vue){
            function _extend(opt,option) {
                for(let key in opt){
                    if(option[key]){
                        opt[key]=option[key]
                    }
                }
                return opt
            }
            let inter=null;
            Vue.prototype.$alterMessage=function (option) {
                let opt=_extend({
                    type:"info",
                    text:"",
                    duration:3000
                },option)
                let Message=Vue.extend({
                    template:"#alter",
                    data:function () {
                        return {
                            msg:opt.text,
                            show:false,
                            type:opt.type
                        }
                    },
                    mounted:function () {
                        let _this=this;
                        this.show=true;
                        inter=setTimeout(function () {
                            _this.show=false;
                        },opt.duration)
                    },
                    methods:{
                        delELe:function () {
                            this.$el.remove()
                        }
                    }
                })
                document.body.appendChild(new Message().$mount().$el)
                return Message;
            }
        }
    }
    Vue.use(message);
})(Vue)
new Vue({
    el:"#app",
    template:"#tpl",
    data:function () {
        return {
            threads:{},
            loginUser:{
                name:"似水流年",
                avatarUrl:"http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100",
                type:"user"
            },
            onLineUsers:[
                {
                    id: "group",
                    avatarUrl: "http://148.70.90.247/static/images/group-icon.png",
                    name: "聊天室群",
                    type: "room"
                }
            ],
            threadId:"",
            setting:{
                isVoice:true,
                isTime:true,
                isName:true,
                isCMD:true
            },
            socket:null,
            isOnline:false,
            menu:"chat",
            text:"",
            logs:[],
            isShowLog:false,
            keyWord:"",
            author:{
                email:"705597001@qq.com",
                repositoriesUrl:"https://github.com/cleverqin/node-websocket-Chatroom",
                userName:"cleverqin",
                repositoriesName:"node-websocket-Chatroom"
            }
        }
    },
    created(){
        let _this=this;
        this.initSocketEvent();
        document.addEventListener('click',(e)=>{
            _this.isShowLog=false;
        });
        _this.initBg();
    },
    computed:{
        messages(){
            if(this.threads[this.threadId]){
                return this.threads[this.threadId];
            }else {
                return [];
            }
        },
        channel(){
            let channel={};
            for (let i = 0; i < this.onLineUsers.length; i++) {
                const item = this.onLineUsers[i];
                if(item.id==this.threadId){
                    channel=item;
                    break;
                }

            }
            return channel;
        }
    },
    methods:{
        sendMessage(to,message,type) {
            let from=this.loginUser;
            let tidings={
                theadId:to.id,
                from:from,
                to:to,
                content:message,
                type:type,
                time:new Date().getTime(),
                isRead:true,
            }
            this.saveMessage(tidings);
            if(to.type!="user"){
                this.socket.emit("groupMessage",from,to,message,type);
            }else {
                this.socket.emit("message",from,to,message,type);
            }
        },
        receiveMessage(from,to,message,type) {
            let threadId=from.id;
            if(to.type!="user"){
                threadId=to.id;
            }
            let isRead=this.threadId==threadId;
            let tidings={
                theadId:threadId,
                from:from,
                to:to,
                content:message,
                type:type,
                time:new Date().getTime(),
                isRead:isRead,
            }
            this.saveMessage(tidings)
        },
        saveMessage(tidings){
            if(!this.threads[tidings.theadId]){
                this.$set(this.threads,tidings.theadId,[])
            }
            this.threads[tidings.theadId].push(tidings)
            if(!this.isHave(tidings)){
                this.onLineUsers.push(tidings.from);
            }
            this.playMessageVoice(tidings);
            if(tidings.theadId==this.threadId){
                this.scrollFooter();
            }
        },
        removeUser(user){
            let _this=this;
            _this.onLineUsers.forEach((item,index)=>{
                if(user.id==item.id){
                    _this.onLineUsers.splice(index,1);
                }
            })
        },
        addUser(user){
            let _this=this,index=-1;
            _this.onLineUsers.forEach((item,i)=>{
                if(user.id==item.id){
                    index=i;
                }
            })
            if(index==-1){
                _this.onLineUsers.push(user);
            }else {
                _this.onLineUsers[index]=user;
            }
        },
        initSocketEvent(){
            let _this=this;
            _this.socket=io("http://148.70.90.247");
            _this.socket.on("message",(from,to,message,type)=>{
                _this.receiveMessage(from,to,message,type)
            })
            _this.socket.on("groupMessage",(from,to,message,type)=>{
                _this.receiveMessage(from,to,message,type)
                _this.cmd(message);
            })
            _this.socket.on("system",(user,type)=>{
                switch (type) {
                    case "join":
                        _this.addUser(user);
                        break;
                    case "logout":
                        _this.removeUser(user);
                        if(user.id==_this.threadId){
                            document.title="欢迎使用webTalk聊天应用！"
                        }
                        break;
                    default:
                        return;
                }
            })
            _this.socket.on("error",(error)=>{
                console.log("出错了！！")
                _this.saveLog("socket链接出错了！"+JSON.stringify(error),"error");
            })
            _this.socket.on("connect",(data)=>{
                console.log("链接成功！",data)
                _this.saveLog("连接成功！"+JSON.stringify(data),"success");
                _this.isOnline=true;
            })
            _this.socket.on("disconnect",(data)=>{
                _this.isOnline=false;
                console.log(JSON.stringify(data)+ ' - disconnect');
                _this.saveLog("断开连接！"+JSON.stringify(data)+ ' - disconnect',"warning");
            })
            _this.socket.on("connect_error",(data)=>{
                _this.isOnline=false;
                console.log(JSON.stringify(data)+ ' - connect_error')
                _this.saveLog("连接出错了！"+JSON.stringify(data)+ ' - connect_error',"error");
            })
            _this.socket.on("connect_timeout",(data)=>{
                _this.isOnline=false;
                console.log(JSON.stringify(data)+ ' - connect_timeout')
                _this.saveLog("连接超时！"+JSON.stringify(data)+ ' - connect_timeout',"warning");
            })
            _this.socket.on("reconnect",(data)=>{
                console.log(JSON.stringify(data)+ ' - reconnect')
                _this.saveLog("重新连接！"+JSON.stringify(data)+ ' - reconnect',"info");
            })
            _this.socket.on("reconnect_attempt",(data)=>{
                _this.socket.io.opts.query={
                    User:_this.loginUser.id?JSON.stringify(_this.loginUser):''
                }
                _this.saveLog("尝试重新连接！"+JSON.stringify(data)+ ' - reconnect_attempt',"info");
            })
            _this.socket.on("loginSuccess",(user,users)=>{
                _this.loginUser=user;
                if(users.length>0){
                    _this.onLineUsers=[].concat([_this.onLineUsers[0]],users);
                }
            })
            _this.socket.on("loginFail",(message)=>{
                _this.$alterMessage({
                    type:"warning",
                    text:message
                })

            })
        },
        changeChannel(user){
            this.threadId=user.id;
            this.setChannelReader(user.id);
            this.scrollFooter();
            document.querySelector("title").innerHTML = this.loginUser.name + " | 与" + user.name + "聊天中";
        },
        send(text){
            if(text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')==''){
                this.text="";
                return ;
            }
            this.sendMessage(this.channel,text,"text");
            this.text="";
        },
        pickerExpression(expression){
            this.text+=expression.title;
        },
        isHave(tidings){
            let flag=false;
            this.onLineUsers.forEach((item)=>{
                if(tidings.theadId==item.id){
                    flag=true;
                }
            })
            return flag;
        },
        setChannelReader(id){
            let _this=this;
            if(this.threads[id]){
                let messages=this.threads[id];
                messages.forEach((item,index)=>{
                    _this.threads[id][index].isRead=true;
                })
            }
        },
        saveLog(text,type){
            this.logs.push({
                text:text,
                type:type,
                time:new Date().getTime()
            })
            let $el=document.getElementById('log-container');
            if($el){
                this.$nextTick(()=>{
                    $el.scrollTop = $el.scrollHeight
                })
            }
        },
        playMessageVoice(tidings){
            if(tidings.theadId!=this.threadId&&this.setting.isVoice&&tidings.to.type!=="room"&&tidings.from.id!=this.loginUser.id){
                let audio=this.$el.querySelector("audio");
                if(audio){
                    audio.play();
                }
            }
        },
        scrollFooter(){
            let $list=this.$refs['messageList'];
            if($list){
                this.$nextTick(()=>{
                    $list.scrollTop = $list.scrollHeight
                })
            }
        },
        login(user){
            if(user.name==""){
                this.$alterMessage({
                    type:"warning",
                    text:"请输入用户名！"
                })
            }else {
                this.socket.emit("login",user);
            }
        },
        searchUser:function () {
            let arr=[],_this=this;
            this.onLineUsers.forEach( (item )=>{
                if((item.name.indexOf(_this.keyWord)!=-1)||(item.id.indexOf(_this.keyWord)!=-1)){
                    arr.push(item)
                }
            })
            return arr;
        },
        initBg:function () {
            this.$http.jsonp("https://api.asilu.com/bg/").then(function (response) {
                let images=response.body.images,
                  len=images.length;
                setInterval(function () {
                    let index=parseInt(Math.random()*len);
                    let img=new Image();
                    img.addEventListener('load', (e)=>{
                        document.body.style.backgroundImage="url("+images[index].url+")";
                    })
                    img.src=images[index].url;
                },30000)
            })
        },
        cmd(text){
            let name=this.loginUser.name;
            let cmds=["@"+name+":播放音乐","@"+name+":暂停播放","@"+name+":上一曲","@"+name+":下一曲"];
            let index=cmds.indexOf(text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
            let $player=this.$refs["player"];
            if($player){
                switch (index) {
                    case 0:
                        $player.audio.play();
                        break;
                    case 1:
                        $player.audio.pause();
                        break;
                    case 2:
                        $player.prev();
                        break;
                    case 3:
                        $player.next();
                        break;
                    default:
                        return;
                }
            }
        }
    }
})