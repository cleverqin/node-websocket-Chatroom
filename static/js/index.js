(function () {
  //判断设备类型
  function getDeviceType() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    const bIsMidp = sUserAgent.match(/midp/i) == "midp";
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return "phone"
    } else {
      return "pc"
    }
  }
  const deviceType=getDeviceType();
  let mainTpl=deviceType==='pc'?'#webChat':'#iChat';
  let loginTpl=deviceType==='pc'?'#login':'#login-phone';
//主要业务逻辑
  const mixin={
    data(){
      return {
        loginUser:{
        },
        messageData:{},
        curSession:{},
        onlineUsers:[],
        text:"",
        keyword:"",
        curMenu:"chat",
        setting: {
          isTime: true,
          isName: true,
          isVoice:true
        },
        about:{
          version:"v1.0",
          license:"MIT",
          author:"cleverqin",
          email:"705597001@qq.com",
          github:"https://github.com/cleverqin/node-websocket-Chatroom"
        },
        baseUrl:"/static/images/qq",
        socketURL:"",
        audioUrl:"/static/images/8400.mp3",
      }
    },
    filters:{
      friendlyTime(value){
        let time=new Date().getTime();
        time=parseInt((time-value)/1000);
        //存储转换值
        let s;
        if(time<60*3){//三分钟内
          return '刚刚';
        }else if((time<60*60)&&(time>=60*3)){
          //超过十分钟少于1小时
          s = Math.floor(time/60);
          return  s+"分钟前";
        }else if((time<60*60*24)&&(time>=60*60)){
          //超过1小时少于24小时
          s = Math.floor(time/60/60);
          return  s+"小时前";
        }else if((time<60*60*24*3)&&(time>=60*60*24)){
          //超过1天少于3天内
          s = Math.floor(time/60/60/24);
          return s+"天前";
        }else{
          //超过3天
          let date= new Date(value);
          return date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
        }
      },
      formatTime(value){
        let date=new Date(value);
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let hour=date.getHours()>9?date.getHours():("0"+date.getHours());
        let minutes=date.getMinutes()>9?date.getMinutes():("0"+date.getMinutes());
        let seconds=date.getSeconds()>9?date.getSeconds():("0"+date.getSeconds());
        return year+"."+month+"."+day+" "+hour+":"+minutes+":"+seconds;
      }
    },
    computed:{
      messages(){
        if(this.curSession.id&&this.messageData[this.curSession.id]){
          return this.messageData[this.curSession.id]
        }
        return [];
      }
    },
    methods:{
      addMessage(message,sessionId){
        if(!this.messageData[sessionId]){
          this.$set(this.messageData,sessionId,[])
        }
        this.messageData[sessionId].push(message)
        if(this.curSession.id===sessionId){
          this.scrollFooter('message-list');
        }
        if(message.from.id!==this.loginUser.id&&this.curSession.id!==sessionId){
          if(this.$refs['audio']&&this.setting.isVoice){
            this.$refs['audio'].play();
          }
        }
      },
      getMessages(sessionId){
        if(this.messageData[sessionId]){
          return this.messageData[sessionId]
        }
        return []
      },
      getLatestMessage(sessionId){
        const messages=this.messageData[sessionId];
        if(messages&&messages.length>0){
          return messages[messages.length-1]
        }
        return {}
      },
      getUnReadNum(sessionId){
        let num=0;
        const messages=this.messageData[sessionId];
        if(messages&&messages.length>0){
          messages.forEach((item)=>{
            if(!item.isRead){
              num++;
            }
          })
        }
        return num;
      },
      setSessionRead(sessionId){
        let messages=this.messageData[sessionId];
        if(messages&&messages.length>0){
          messages.forEach((item)=>{
            item.isRead=true;
          })
        }
      },
      changeSession(session){
        if(session.id===this.curSession.id){
          return
        }
        this.curSession=session;
        this.setSessionRead(session.id);
        this.$nextTick(()=>{
          this.scrollFooter('message-list');
        })
      },
      searchUser(keyword){
        let users=[];
        this.onlineUsers.forEach((item)=>{
          if((item.name.indexOf(keyword)!==-1)||(item.id.indexOf(keyword)!==-1)){
            users.push(item)
          }
        })
        return users;
      },
      sendText(text){
        text=text.replace(/^\s+|\s+$/g,'');
        if(text){
          this.sendMessage(this.text,'text');
          this.text='';
        }else {
          this.text='';
        }
      },
      addUser(user){
        this.onlineUsers.push(user);
      },
      removeUser(user){
        this.onlineUsers.forEach((item,i)=>{
          if(item.id===user.id){
            this.onlineUsers.splice(i,1)
          }
        })
      },
      sendMessage(html,type){
        let message={
          from:this.loginUser,
          to:this.curSession,
          content:html,
          time:new Date().getTime(),
          type:type,
          isRead:true
        }
        this.addMessage(message,message.to.id);
        if(this.socket){
          this.socket.emit("message",message.from,message.to,message.content,message.type)
        }
      },
      scrollFooter(name){
        let $el=this.$refs[name];
        if($el){
          this.$nextTick(()=>{
            $el.scrollTop = $el.scrollHeight
          })
        }
      },
    }
  };
//表情列表
  const expressions=[
    {title:"微笑]",url: "/微笑.gif"},
    {title:"[撇嘴]",url: "/撇嘴.gif"},
    {title:"[色]",url: "/色.gif"},
    {title:"[发呆]",url: "/发呆.gif"},
    {title:"[得意]",url: "/得意.gif"},
    {title:"[流泪]",url: "/流泪.gif"},
    {title:"[害羞]",url: "/害羞.gif"},
    {title:"[闭嘴]",url: "/闭嘴.gif"},
    {title:"[睡]",url: "/睡.gif"},
    {title:"[大哭]",url: "/大哭.gif"},
    {title:"[尴尬]",url: "/尴尬.gif"},
    {title:"[呲牙]",url: "/呲牙.gif"},
    {title:"[发怒]",url: "/发怒.gif"},
    {title:"[调皮]",url: "/调皮.gif"},
    {title:"[惊讶]",url: "/惊讶.gif"},
    {title:"[难过]",url: "/难过.gif"},
    {title:"[酷]",url: "/酷.gif"},
    {title:"[冷汗]",url: "/冷汗.gif"},
    {title:"[抓狂]",url: "/抓狂.gif"},
    {title:"[吐]",url: "/吐.gif"},
    {title:"[偷笑]",url: "/偷笑.gif"},
    {title:"[可爱]",url: "/可爱.gif"},
    {title:"[白眼]",url: "/白眼.gif"},
    {title:"[傲慢]",url: "/傲慢.gif"},
    {title:"[饥饿]",url: "/饥饿.gif"},
    {title:"[困]",url: "/困.gif"},
    {title:"[惊恐]",url: "/惊恐.gif"},
    {title:"[流汗]",url: "/流汗.gif"},
    {title:"[憨笑]",url: "/憨笑.gif"},
    {title:"[大兵]",url: "/大兵.gif"},
    {title:"[奋斗]",url: "/奋斗.gif"},
    {title:"[咒骂]",url: "/咒骂.gif"},
    {title:"[疑问]",url: "/疑问.gif"},
    {title:"[嘘]",url: "/嘘.gif"},
    {title:"[晕]",url: "/晕.gif"},
    {title:"[折磨]",url: "/折磨.gif"},
    {title:"[衰]",url: "/衰.gif"},
    {title:"[骷髅]",url: "/骷髅.gif"},
    {title:"[敲打]",url: "/敲打.gif"},
    {title:"[再见]",url: "/再见.gif"},
    {title:"[擦汗]",url: "/擦汗.gif"},
    {title:"[抠鼻]",url: "/抠鼻.gif"},
    {title:"[鼓掌]",url: "/鼓掌.gif"},
    {title:"[嗅大了]",url: "/嗅大了.gif"},
    {title:"[坏笑]",url: "/坏笑.gif"},
    {title:"[左哼哼]",url: "/左哼哼.gif"},
    {title:"[右哼哼]",url: "/右哼哼.gif"},
    {title:"[哈欠]",url: "/哈欠.gif"},
    {title:"[鄙视]",url: "/鄙视.gif"},
    {title:"[委屈]",url: "/委屈.gif"},
    {title:"[可怜]",url: "/可怜.gif"},
    {title:"[阴险]",url: "/阴险.gif"},
    {title:"[亲亲]",url: "/亲亲.gif"},
    {title:"[吓]",url: "/吓.gif"},
    {title:"[快哭了]",url: "/快哭了.gif"},
    {title:"[菜刀]",url: "/菜刀.gif"},
    {title:"[西瓜]",url: "/西瓜.gif"},
    {title:"[啤酒]",url: "/啤酒.gif"},
    {title:"[篮球]",url: "/篮球.gif"},
    {title:"[乒乓]",url: "/乒乓.gif"},
    {title:"[咖啡]",url: "/咖啡.gif"},
    {title:"[饭]",url: "/饭.gif"},
    {title:"[猪头]",url: "/猪头.gif"},
    {title:"[玫瑰]",url: "/玫瑰.gif"},
    {title:"[凋谢]",url: "/凋谢.gif"},
    {title:"[心]",url: "/心.gif"},
    {title:"[心碎]",url: "/心碎.gif"},
    {title:"[蛋糕]",url: "/蛋糕.gif"},
    {title:"[闪电]",url: "/闪电.gif"},
    {title:"[炸弹]",url: "/炸弹.gif"},
    {title:"[刀]",url: "/刀.gif"},
    {title:"[足球]",url: "/足球.gif"},
    {title:"[瓢虫]",url: "/瓢虫.gif"},
    {title:"[便便]",url: "/便便.gif"},
    {title:"[夜晚]",url: "/夜晚.gif"},
    {title:"[太阳]",url: "/太阳.gif"},
    {title:"[礼物]",url: "/礼物.gif"},
    {title:"[拥抱]",url: "/拥抱.gif"},
    {title:"[强]",url: "/强.gif"},
    {title:"[弱]",url: "/弱.gif"},
    {title:"[握手]",url: "/握手.gif"},
    {title:"[胜利]",url: "/胜利.gif"},
    {title:"[抱拳]",url: "/抱拳.gif"},
    {title:"[勾引]",url: "/勾引.gif"},
    {title:"[拳头]",url: "/拳头.gif"},
    {title:"[差劲]",url: "/差劲.gif"},
    {title:"[爱你]",url: "/爱你.gif"},
    {title:"[NO]",url: "/NO.gif"},
    {title:"[OK]",url: "/OK.gif"},
    {title:"[爱情]",url: "/爱情.gif"},
    {title:"[飞吻]",url: "/飞吻.gif"},
    {title:"[发财]",url: "/发财.gif"},
    {title:"[帅]",url: "/帅.gif"},
    {title:"[雨伞]",url: "/雨伞.gif"},
    {title:"[高铁左车头]",url: "/高铁左车头.gif"},
    {title:"[车厢]",url: "/车厢.gif"},
    {title:"[高铁右车头]",url: "/高铁右车头.gif"},
    {title:"[纸巾]",url: "/纸巾.gif"},
    {title:"[右太极]",url: "/右太极.gif"},
    {title:"[左太极]",url: "/左太极.gif"},
    {title:"[献吻]",url: "/献吻.gif"},
    {title:"[街舞]",url: "/街舞.gif"},
    {title:"[激动]",url: "/激动.gif"},
    {title:"[挥动]",url: "/挥动.gif"},
    {title:"[跳绳]",url: "/跳绳.gif"},
    {title:"[回头]",url: "/回头.gif"},
    {title:"[磕头]",url: "/磕头.gif"},
    {title:"[转圈]",url: "/转圈.gif"},
    {title:"[怄火]",url: "/怄火.gif"},
    {title:"[发抖]",url: "/发抖.gif"},
    {title:"[跳跳]",url: "/跳跳.gif"},
    {title:"[爆筋]",url: "/爆筋.gif"},
    {title:"[沙发]",url: "/沙发.gif"},
    {title:"[钱]",url: "/钱.gif"},
    {title:"[蜡烛]",url: "/蜡烛.gif"},
    {title:"[枪]",url: "/枪.gif"},
    {title:"[灯]",url: "/灯.gif"},
    {title:"[香蕉]",url: "/香蕉.gif"},
    {title:"[吻]",url: "/吻.gif"},
    {title:"[下雨]",url: "/下雨.gif"},
    {title:"[闹钟]",url: "/闹钟.gif"},
    {title:"[囍]",url: "/囍.gif"},
    {title:"[棒棒糖]",url: "/棒棒糖.gif"},
    {title:"[面条]",url: "/面条.gif"},
    {title:"[车]",url: "/车.gif"},
    {title:"[邮件]",url: "/邮件.gif"},
    {title:"[风车]",url: "/风车.gif"},
    {title:"[药丸]",url: "/药丸.gif"},
    {title:"[奶瓶]",url: "/奶瓶.gif"},
    {title:"[灯笼]",url: "/灯笼.gif"},
    {title:"[青蛙]",url: "/青蛙.gif"},
    {title:"[戒指]",url: "/戒指.gif"},
    {title:"[K歌]",url: "/K歌.gif"},
    {title:"[熊猫]",url: "/熊猫.gif"},
    {title:"[喝彩]",url: "/喝彩.gif"},
    {title:"[购物]",url: "/购物.gif"},
    {title:"[多云]",url: "/多云.gif"},
    {title:"[鞭炮]",url: "/鞭炮.gif"},
    {title:"[飞机]",url: "/飞机.gif"},
    {title:"[气球]",url: "/气球.gif"}
  ];
  let mapData=[];
  expressions.forEach((item)=>{
    mapData[item.title]=item.url;
  });
//渲染解析表情
  const MessageText=Vue.extend({
    props:{
      text:{
        type:String,
        default:""
      }
    },
    render(h){
      const reg=/\[.*?\]/g;
      let result=this.text.replace(reg,(word)=>{
        return "|"+word+"|";
      });
      let arr=result.split('|');
      return h('span',
        arr.map((item)=>{
          if(reg.test(item)&&mapData[item]){
            return h('img',{
              class:"expression-img",
              attrs:{
                src:mixin.data().baseUrl+mapData[item]
              }
            })
          }else {
            return item;
          }
        })
      )
    }
  });
//消息组件
  const MessageItem=Vue.extend({
    template:"#message-item",
    name:"MessageItem",
    filters:mixin.filters,
    props:{
      message:{
        type:Object,
        default(){
          return {
            from:{
              name:"似水流年"
            },
            to:{},
            content:"谭德塞表示，每年全球约有350万重症流感患者，约65万人死于呼吸道相关疾病，流感和新冠肺炎同时流行将给卫生系统带来巨大挑战",
            time:new Date().getTime(),
          }
        }
      },
      isSend:{
        type:Boolean,
        default() {
          return false;
        }
      },
      setting:{
        type:Object,
        default(){
          return {
            isName:true,
            isTime:true
          }
        }
      }
    },
  });
//用户卡片组件
  const UserItem=Vue.extend({
    template:"#user-item",
    name:"UserItem",
    props:{
      user:{
        type:Object,
        default(){
          return {
            name:"似水水流年水流年水流年流年",
            avatarUrl:"http://p4.music.126.net/BUFZLieG5a6E3ZVpkHP6fA==/109951163402069754.jpg"
          }
        }
      },
      num:{
        type:Number,
        default() {
          return 0;
        }
      },
    }
  });
//提示消息组件
  const MessageComponent=Vue.extend({
    template:"#alter-message",
    props:["msg","type"],
    data(){
      return {
        show:false,
      }
    },
    mounted:function () {
      let _this=this;
      this.show=true;
      setTimeout(function () {
        _this.show=false;
      },3000)
    },
    methods:{
      delELe:function () {
        this.$el.remove()
      }
    }
  });
//提示消息插件
  const AlterMessage=function (text,type) {
    let Instance=Vue.extend({
      components:{MessageComponent},
      render(h){
        return h("MessageComponent",{
          props:{
            msg:text,
            type:type
          }
        })
      }
    });
    document.body.appendChild(new Instance().$mount().$el)
    return Instance;
  };
//登录组件
  const Login=Vue.extend({
    template:loginTpl,
    name:"login",
    data(){
      return {
        user:{
          name:"",
          avatarUrl:"http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100"
        },
        avatarList:[
          'http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=956411241&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=1361514346&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=624748513&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=1741841217&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=157509895&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=453079985&spec=100',
          'http://q.qlogo.cn/headimg_dl?dst_uin=753678776&spec=100',
        ],
        isShow:false,
        qq:""
      }
    },
    methods:{
      toggleAvatarSelect(){
        if(this.isShow){
          this.isShow=false;
          document.removeEventListener('click',this.hideAvatarSelect)
        }else {
          this.isShow=true;
          document.addEventListener('click',this.hideAvatarSelect)
        }
      },
      hideAvatarSelect(){
        this.isShow=false;
        document.removeEventListener('click',this.hideAvatarSelect)
      },
      addQQAvatar(qq){
        let qqReg=/^[1-9][0-9]{3,9}[0-9]$/;
        if(qqReg.test(qq)){
          let qqAvatarUrl="http://q.qlogo.cn/headimg_dl?dst_uin="+qq+"&spec=100";
          if(this.avatarList.indexOf(qqAvatarUrl)===-1){
            this.avatarList.push(qqAvatarUrl);
          }
          this.qq="";
        }else {
          AlterMessage("输入正确的QQ号有误",'error')
        }
      },
      login(){
        if(this.user.name===''){
          AlterMessage("请输入用户名称！","error");
          return
        }
        this.$emit("login",this.user)
      },
      randomQQ() {
        let min=100000;
        let max=1000000000;
        let qq=parseInt(Math.random()*(max-min+1)+min,10);
        this.qq=qq;
      },
    }
  });
  new Vue({
    template: mainTpl,
    el:"#app",
    components:{MessageItem,UserItem,Login,MessageText},
    mixins:[mixin],
    data(){
      return {
        expressions,
        isShowExpression:false,
        isConnect:false,
        isShowTool:false,
        isFocus:false
      }
    },
    mounted(){
      document.addEventListener("click",()=>{
        this.isShowExpression=false;
        this.isShowTool=false;
      })
      this.initSocket();
    },
    methods:{
      hideExpression(){
        this.isShowExpression=false;
      },
      toggleExpression(){
        this.isShowExpression=!this.isShowExpression;
        this.isShowTool=false;
      },
      pickerExpression(item){
        this.text+=item.title;
      },
      fileChange(e){
        let file=e.target.files[0];
        let maxSize=1*1024*1024;
        if(file.size>maxSize){
          AlterMessage("图片大小不能超过1M!",'error');
          return
        }
        let reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend =()=> {
          this.sendMessage("<img src='"+reader.result+"'>",'image')
          e.target=null;
        };
      },
      login(user) {
        if(this.socket){
          this.socket.emit("login",user);
        }
      },
      initSocket(){
        let _this=this;
        _this.socket=window.io(this.socketURL);
        _this.socket.on("message",(from,to,message,type)=>{
          let isRead=false;
          if(to.type==='group'){
            if(_this.curSession.id===to.id){
              isRead=true;
            }
          }else {
            if(_this.curSession.id===from.id){
              isRead=true;
            }
          }
          let MESSAGE={
            from:from,
            to:to,
            content:message,
            time:new Date().getTime(),
            type:type,
            isRead
          };
          this.addMessage(MESSAGE,to.type==='group'?to.id:from.id)
        });
        _this.socket.on("system",(user,type)=>{
          switch (type) {
            case "join":
              _this.addUser(user);
              break;
            case "logout":
              _this.removeUser(user);
              break;
            default:
              return;
          }
        })
        _this.socket.on("error",()=>{
          console.log("出错了！！")
        })
        _this.socket.on("connect",(data)=>{
          _this.isConnect=true;
          console.log("链接成功！",data)
        })
        _this.socket.on("disconnect",(data)=>{
          _this.isConnect=false;
          console.log(JSON.stringify(data)+ ' - disconnect');
        })
        _this.socket.on("reconnect_attempt",()=>{
          console.info("重新尝试链接！！")
          _this.socket.io.opts.query={
            User:_this.loginUser?JSON.stringify(_this.loginUser):''
          }
        });
        _this.socket.on("reconnect_failed",()=>{
          console.warn('重新链接失败！')
        });
        _this.socket.on("loginSuccess",(user,users)=>{
          _this.loginUser=user;
          _this.onlineUsers=users;
          document.title=user.name+" ｜ 聊天室";
        });
        _this.socket.on("loginFail",(message)=>{
          AlterMessage(message,'error')
        });
        _this.socket.on("history-message",(channelId,messages)=>{
          _this.$set(_this.messageData,channelId,messages)
        })
      },
      toggleTool(){
        this.isShowTool=!this.isShowTool;
        this.isShowExpression=false;
      }
    }
  });
})();
