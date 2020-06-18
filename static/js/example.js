;((global)=>{
  let utils={
    addClassName(element,clsName){
      let classNames=element.className.split(" ");
      let clsNames=clsName.split(" ");
      clsNames.forEach((item)=>{
        if(classNames.indexOf(item)==-1){
          classNames.push(item);
        }
      })
      element.className=classNames.join(" ");
    },
    removeClassName(element,clsName){
      let classNames=element.className.split(" ");
      let clsNames=clsName.split(" ");
      clsNames.forEach((item)=>{
        let index=classNames.indexOf(item);
        if(index!=-1){
          classNames.splice(index,1);
        }
      })
      element.className=classNames.join(" ");
    },
    toggleClassName(element,clsName){
      let classNames=element.className.split(" ");
      let index=classNames.indexOf(clsName);
      if(index==-1){
        classNames.push(clsName);
      }else {
        classNames.splice(index,1)
      }
      element.className=classNames.join(" ");
    },
    formatTime(time){
      let m=parseInt(time/60);
      let s=parseInt(time%60);
      if(m<=9){
        m="0"+m;
      }
      if(s<=9){
        s="0"+s;
      }
      return m+":"+s;
    },
    getLrc:function(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.readyState != 4 ) return; // 4 表示数据发送完毕
        if(xhr.status == 200) {
          let rsp = xhr.responseText;
          callback(rsp);
        }
        else callback();
      }
      xhr.open('GET', url, true);
      xhr.send(null);
    },
  }
  /**
   * *
   * @param option 配置项
   * @constructor
   */
  function UiProgress(option) {
    let defaultOpt={
      el:document.body,
      progress:0,
      payload:0,
      isVertical:false,
      updateProgress(){},
      created(){},
      isAsync:true,
      isShowTips:false,
      formatTips(){}
    }
    this.opt=Object.assign({},defaultOpt,option);
    this._init();
  }
  UiProgress.prototype={
    _init(){
      let _this=this;
      this.state={x:0, y:0, barWidth:0};
      this.isMoveing=false;
      this.$el=document.createElement('div');
      this.$el.className="ui-progress-warp ui-progress-row";
      if(_this.opt.isVertical){
        this.$el.className="ui-progress-warp ui-progress-col";
      }
      let template='<div class="ui-progress-content">' +
        '<div class="ui-progress-payload"></div>' +
        '<div class="ui-progress-bar"><span class="ui-progress-ctrl"></span></div><span class="ui-progress-tips">100%</span>' +
        '</div>';
      this.$el.innerHTML=template;
      this.opt.el.innerHTML="";
      this.opt.el.appendChild(this.$el);
      this.$content=this.$el.querySelector(".ui-progress-content");
      this.$payload=this.$el.querySelector(".ui-progress-payload");
      this.$bar=this.$el.querySelector(".ui-progress-bar");
      this.$ctrl=this.$el.querySelector(".ui-progress-ctrl");
      this.$tips=this.$el.querySelector(".ui-progress-tips");
      if(!this.opt.isShowTips){
        this.addClassName(_this.$tips,"ui-progress-tips-hide");
      }
      this.$content.addEventListener("click",(e)=>{
        let barWidth=_this.getPos(e,_this.$content).dx;
        if(_this.opt.isVertical){
          barWidth=_this.$content.offsetHeight-_this.getPos(e,_this.$content).dy;
        }
        _this.setBarProgress(barWidth,'click')
      })
      this.$ctrl.addEventListener('mousedown',(e)=>{
        _this.isMoveing=true;
        _this.state.x=e.clientX;
        _this.state.y=e.clientY;
        _this.state.barWidth=_this.$bar.offsetWidth;
        if(_this.opt.isVertical){
          _this.state.barWidth=_this.$bar.offsetHeight;
        }
        addMoveEvent();
        addUpEvent();
        _this.addClassName(_this.$el,'ui-progress-moving')
      })
      this.$content.addEventListener("mousemove",(e)=>{
        let barWidth=_this.getPos(e,_this.$content).dx;
        if(_this.opt.isVertical){
          barWidth=_this.$content.offsetHeight-_this.getPos(e,_this.$content).dy;
        }
        if(_this.isMoveing){
          return;
        }
        _this.setTips(barWidth);
      })
      function addMoveEvent() {
        document.addEventListener("mousemove",moveEvent)
      }
      function addUpEvent() {
        document.addEventListener("mouseup",upEvent)
      }
      function moveEvent(e) {
        let pos={
          dx:e.clientX-_this.state.x,
          dy:e.clientY-_this.state.y
        };
        let barWidth=_this.state.barWidth+pos.dx;
        if(_this.opt.isVertical){
          barWidth=_this.state.barWidth-pos.dy;
        }
        _this.setBarProgress(barWidth,'move');
      }
      function upEvent(e) {
        let pos={
          dx:e.clientX-_this.state.x,
          dy:e.clientY-_this.state.y
        };
        let barWidth=_this.state.barWidth+pos.dx;
        if(_this.opt.isVertical){
          barWidth=_this.state.barWidth-pos.dy;
        }
        _this.setBarProgress(barWidth,'up');
        document.removeEventListener("mousemove",moveEvent);
        document.removeEventListener("mouseup",upEvent);
        _this.isMoveing=false;
        _this.removeClassName(_this.$el,'ui-progress-moving')
      }
      this.setProgress(this.opt.progress);
      this.setPayload(this.opt.payload);
      this.opt.created(this.opt.progress)
    },
    getPos(e,ele) {
      let pos=this.getElePos(ele);
      let dx = e.clientX - pos.x;
      let dy = e.clientY - pos.y;
      return {dx,dy}
    },
    getElePos(ele){
      let pos={
        x:ele.offsetLeft,
        y:ele.offsetTop
      };
      if(ele.offsetParent!=null) {
        pos.x+=this.getElePos(ele.offsetParent).x;
        pos.y+=this.getElePos(ele.offsetParent).y;
      };
      return pos;
    },
    setBarProgress(barWidth,type){
      let contentWidth=this.$content.offsetWidth;
      if(this.opt.isVertical){
        contentWidth=this.$content.offsetHeight;
      }
      if(barWidth>=0&&barWidth<=contentWidth){
        this.setProgress(barWidth/contentWidth,type);
      }
      if(barWidth<0){
        this.setProgress(0,type);
      }
      if(barWidth>contentWidth){
        this.setProgress(1,type);
      }
    },
    setProgress(percent,type){
      let key=this.opt.isVertical?"height":"width";
      this.$bar.style[key]=(percent*100)+"%";
      if(this.isMoveing){
        this.setTipsProgress(percent);
      }
      if(type){
        if(this.isMoveing&&!this.opt.isAsync){
          return
        }
        this.opt.updateProgress(percent,type)
      }
    },
    setPayload(percent){
      let key=this.opt.isVertical?"height":"width";
      this.$payload.style[key]=(percent*100)+"%";
    },
    addClassName(element,clsName){
      let classNames=element.className.split(" ");
      let clsNames=clsName.split(" ");
      clsNames.forEach((item)=>{
        if(classNames.indexOf(item)==-1){
          classNames.push(item);
        }
      })
      element.className=classNames.join(" ");
    },
    removeClassName(element,clsName){
      let classNames=element.className.split(" ");
      let clsNames=clsName.split(" ");
      clsNames.forEach((item)=>{
        let index=classNames.indexOf(item);
        if(index!=-1){
          classNames.splice(index,1);
        }
      })
      element.className=classNames.join(" ");
    },
    toggleClassName(element,clsName){
      let classNames=element.className.split(" ");
      let index=classNames.indexOf(clsName);
      if(index==-1){
        classNames.push(clsName);
      }else {
        classNames.splice(index,1)
      }
      element.className=classNames.join(" ");
    },
    setTips(barWidth){
      let contentWidth=this.$content.offsetWidth;
      if(this.opt.isVertical){
        contentWidth=this.$content.offsetHeight;
      }
      if(barWidth>=0&&barWidth<=contentWidth){
        this.setTipsProgress(barWidth/contentWidth);
      }
      if(barWidth<0){
        this.setTipsProgress(0);
      }
      if(barWidth>contentWidth){
        this.setTipsProgress(1);
      }
    },
    setTipsProgress(percent){
      let key=this.opt.isVertical?"bottom":"left";
      this.$tips.style[key]=(percent*100)+"%";
      this.$tips.innerHTML=(percent*100).toFixed(0)+"%";
      if(this.opt.formatTips(percent)){
        this.$tips.innerHTML=this.opt.formatTips(percent);
      }
    }
  }
  /**
   * *
   * @param option 配置项
   * @constructor
   */
  function LRC(option) {
    let defaultOpt={
      el:document.body,
      time:0,
      lrcText:""
    }
    this.opt=Object.assign({},defaultOpt,option);
    this._init();
  }
  LRC.prototype={
    _init(){
      this.$el=document.createElement('div');
      this.$el.className="ui-lrc-warp";
      let template="<div class='ui-lrc-container'><div class='ui-lrc-list'></div></div>";
      this.$el.innerHTML=template;
      this.opt.el.innerHTML="";
      this.opt.el.appendChild(this.$el);
      this.$container=this.$el.querySelector('.ui-lrc-container');
      this.$lrcList=this.$el.querySelector('.ui-lrc-list');
      this.lrcArr=[];
      this.loadLrcText(this.opt.lrcText);
    },
    parseLrc(lrcText){
      let arr=lrcText.split("\n");
      let lrcArr=[];
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let temp =item.split(']');
        let reg=/^\[\d+:\d+/g;
        if(!reg.test(temp[0])){
          continue;
        }
        let text=temp[1].trim();
        if(text==''){
          text="......";
        };
        let timeArr=temp[0].replace(/^\s*\[/g, '').split(':');
        let time=parseInt(timeArr[0])*60 + parseFloat(timeArr[1]);
        lrcArr.push({
          time:time,
          text:text
        })
      }
      lrcArr.sort((a,b)=>{
        return a.time-b.time;
      })
      return lrcArr;
    },
    loadLrc(lrcArr){
      let len=lrcArr.length;
      this.$lrcList.innerHTML="";
      let temp="";
      if(len<=0){
        temp+="<div class='ui-lrc-no'>未找到相关歌词</div>";
      }else {
        lrcArr.forEach((item)=>{
          temp+="<div class='ui-lrc-item' lrc-time='"+item.time+"'>"+item.text+"</div>";
        })
      }
      return temp;
    },
    setCurTime(time){
      let lrcItem=this.getTimeLrc(time,this.lrcArr);
      this.setLrcPos(lrcItem);
    },
    getTimeLrc(time,lrcArr){
      if(!lrcArr){
        lrcArr=this.lrcArr;
      }
      let len=lrcArr.length;
      if(len>0){
        let minTime=lrcArr[0].time;
        let maxTime=lrcArr[len-1].time;
        if(time>minTime&&time<maxTime){
          let index=0;
          for (let i = 0; i < lrcArr.length; i++) {
            let lrcItem = lrcArr[i];
            if(lrcItem.time>time){
              index=i-1;
              break;
            }
          }
          return lrcArr[index];
        }else {
          if(time<=minTime){
            return lrcArr[0]
          }else {
            return lrcArr[len-1];
          }
        }
      }else {
        return {}
      }
    },
    setLrcPos(lrcItem){
      let _this=this;
      let $container=this.$container;
      let $lrcList=this.$lrcList;
      if(lrcItem.text){
        let $lrc=$lrcList.querySelector("[lrc-time='"+lrcItem.time+"']");
        let $active=$lrcList.querySelector('.active');
        if($lrc.className!="ui-lrc-item active"){
          if($active){
            $active.className='ui-lrc-item';
          }
          $lrc.className="ui-lrc-item active";
        }
        let top=$lrc.offsetTop-($container.offsetHeight/2)+($lrc.offsetHeight/2);
        if(top>0){
          $lrcList.style.top=-top+"px";
        }else {
          $lrcList.style.top=0;
        }
      }
    },
    loadLrcText(lrcText) {
      this.lrcArr=this.parseLrc(lrcText);
      let html=this.loadLrc(this.lrcArr);
      this.$lrcList.removeAttribute("style");
      this.$lrcList.innerHTML=html;
    }
  }
  global.LRC=LRC;
  global.UiProgress=UiProgress;
})(this);
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
      errorMsg:"",
      socket:"",
    }
  },
  created(){
    let _this=this;
    document.addEventListener('click',(e)=>{
      _this.isShow=false;
    })
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
        this.showErrorMsg('请输入正确的QQ号！')
      }
    },
    login(user){
      if(user.name==""){
        this.showErrorMsg('请输入用户名！')
        return
      }
      this.$emit("login",user)
    },
    randomQQ(){
      let num=parseInt(Math.random()*3+6);
      let firstNum=parseInt(Math.random()*9+1);
      let QQ=""+firstNum;
      for (let i = 0; i < num; i++) {
        QQ+=parseInt(Math.random()*9);
      }
      return QQ;
    },
    showErrorMsg(message){
      let _this=this;
      this.errorMsg=message;
      let inter=setTimeout(()=>{
        _this.errorMsg='';
        clearTimeout(inter);
      },3000)
    }
  }
});
Vue.component("aPlayer",{
  template:"#aPlayer",
  data(){
    return {
      songList:[],
      curSong:{},
      totalTime:0,
      curTime:0,
      volume:0.5,
      isPlay:false,
      isPlayer:false,
      isLrc:false,
      isList:false,
      isError:false,
    }
  },
  filters:{
    formatTime(value){
      let m=parseInt(value/60);
      let s=parseInt(value%60);
      if(m<=9){
        m="0"+m;
      }
      if(s<=9){
        s="0"+s;
      }
      return m+":"+s;
    }
  },
  mounted(){
    this.init();
    this.$http.jsonp("https://api.asilu.com/163music/?type=playlist&id="+545888750)
      .then(function (response) {
        let list=response.body.songs;
        this.songList=list;
        this.changeSong(list[0]);
      })
  },
  methods:{
    togglePlay() {
      if(this.$audio.paused){
        this.$audio.play();
      }else {
        this.$audio.pause();
      }
    },
    changeSong(song) {
      if(this.curSong.id==song.id){
        return;
      }
      let _this=this;
      this.totalTime=0;
      this.curTime=0;
      this.timeCtrl.setPayload(0);
      this.timeCtrl.setProgress(0);
      this.getLrc("https://api.asilu.com/163music/?type=songlrc&lrc=lrc&id="+song.id,(body)=>{
        let lrcText=body?body:"";
        _this.lrcCtrl.loadLrcText(lrcText)
      })
      this.$audio.src='https://music.163.com/song/media/outer/url?id='+song.id+'.mp3';
      this.isError=false;
      this.curSong=song;
    },
    play(song){
      this.changeSong(song);
      this.$audio.play();
    },
    nextSong() {
      let len =this.songList.length;
      let index=this.findIndex(this.curSong);
      let isPaused=this.$audio.paused;
      if(len>0){
        let nextIndex=index+1;
        if((nextIndex>=0)&&(nextIndex<len)){
          let song=this.songList[nextIndex];
          this.changeSong(song);
        }else {
          let song=this.songList[0];
          this.changeSong(song);
        }
        if(!isPaused){
          this.$audio.play();
        }
      }
    },
    prevSong() {
      let len =this.songList.length;
      let index=this.findIndex(this.curSong);
      let isPaused=this.$audio.paused;
      if(len>0){
        let prevIndex=index-1;
        if((prevIndex>=0)&&(prevIndex<len)){
          let song=this.songList[prevIndex];
          this.changeSong(song);
        }else {
          let song=this.songList[len-1];
          this.changeSong(song);
        }
        if(!isPaused){
          this.$audio.play();
        }
      }
    },
    moveUp(song) {
      let index=this.findIndex(song);
      let len =this.songList.length;
      if(index!=-1){
        let prevIndex=index-1;
        if(prevIndex>=0){
          let prevSong=this.songList[prevIndex];
          this.$set(this.songList,prevIndex,song);
          this.$set(this.songList,index,prevSong);
          let $songList=this.$el.querySelector('.ui-songListWarp');
          this.$nextTick(()=>{
            $songList.scrollTop-=28;
          })
        }
      }
    },
    moveDown(song) {
      let index=this.findIndex(song);
      let len =this.songList.length;
      if(index!=-1){
        let nextIndex=index+1;
        if(nextIndex<len){
          let nextSong=this.songList[nextIndex];
          this.$set(this.songList,nextIndex,song);
          this.$set(this.songList,index,nextSong);
          let $songList=this.$el.querySelector('.ui-songListWarp');
          this.$nextTick(()=>{
            $songList.scrollTop+=28;
          })
        }
      }
    },
    deleteSong(song){
      let index=this.findIndex(song)
      if(index!=-1){
        this.songList.splice(index,1)
      }
    },
    init(){
      let _this=this;
      let $audio=this.$el.querySelector("audio");
      _this.$audio=$audio;
      this.volCtrl=new UiProgress({
        el:_this.$el.querySelector(".ui-voice-box"),
        progress: _this.volume,
        created() {
          _this.$audio.volume=_this.volume;
        },
        updateProgress(val,type){
          _this.$audio.volume=val;
          _this.volume=val;
        }
      });
      this.timeCtrl=new UiProgress({
        el:_this.$el.querySelector(".ui-aPlayer-timeBox"),
        progress: 0,
        updateProgress(val,type){
          if(type!='move'){
            if(_this.$audio.duration){
              _this.$audio.currentTime=_this.$audio.duration*val;
            }
          }
        }
      });
      this.lrcCtrl=new LRC({
        el:_this.$el.querySelector(".ui-aPlayer-lrcWarp")
      });
      $audio.onpause=()=>{
        _this.isPlay=false;
      }
      $audio.onplay=()=>{
        _this.isPlay=true;
      }
      $audio.onloadstart=()=>{

      }
      $audio.ontimeupdate=function (e) {
        let time=$audio.currentTime;
        _this.curTime=time;
        _this.lrcCtrl.setCurTime(time);
        if(_this.timeCtrl.isMoveing){
          return
        }
        _this.timeCtrl.setProgress(time/$audio.duration);
      }
      $audio.onended=function (e) {
        console.log("播放完毕！")
        _this.nextSong();
        $audio.play();
      }
      $audio.onerror=()=>{
        _this.isPlay=false;
        _this.isError=true;
        console.error("加载期间发生错误！")
      }
      $audio.onloadeddata=()=>{
        console.log("媒介数据已加载!")
      }
      $audio.onloadedmetadata=()=>{
        _this.totalTime=$audio.duration;
        console.log("元数据（比如分辨率和时长）被加载!")
      }
      $audio.ondurationchange=()=>{
        _this.totalTime=$audio.duration;
      }
      $audio.onprogress=()=>{
        let len =$audio.buffered.length;
        if (len<=0){
          return
        }
        let time=$audio.buffered.end(len-1);
        _this.timeCtrl.setPayload(time/$audio.duration);
      }
    },
    getLrc(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.readyState != 4 ) return; // 4 表示数据发送完毕
        if(xhr.status == 200) {
          let rsp = xhr.responseText;
          callback(rsp);
        }
        else callback();
      }
      xhr.open('GET', url, true);
      xhr.send(null);
    },
    findIndex(song){
      let index=-1;
      this.songList.forEach((item,i)=>{
        if(item.id==song.id){
          index=i;
        }
      })
      return index;
    }
  }
})
new Vue({
  el:"#app",
  template:"#tpl",
  data(){
    let QQ=[
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
    ]
    return {
      loginUser:null ,
      currentMenu:"session",
      setting:{
        isVoice:true,
        isTime:true,
        isName:true
      },
      about:{
        version:"",
        license:"",
        url:"",
        email:""
      },
      sessionList:[],
      sessionId:"user_001",
      messages:{},
      text:"",
      qqExpression:QQ,
      baseUrl:"../static/images/qq",
      isShow:false,
      keyword:"",
      isShowLog:false,
      logs:[],
      alterMessage:"",
      isAlter:false
    }
  },
  created(){
    this.initSocket();
  },
  computed:{
    session(){
      let session=null,
        sessionId=this.sessionId;
      this.sessionList.forEach((item,index)=>{
        if(item.id==sessionId){
          session=item;
        }
      })
      return session;
    },
    messageList(){
      if(this.sessionId==''){
        return []
      }
      if(this.messages[this.sessionId]){
        return this.messages[this.sessionId]
      }else {
        return []
      }
    },
  },
  methods:{
    changeSession(user){
      let sessionId=user.id;
      let messageList=this.messages[sessionId];
      if(messageList){
        messageList.forEach((item)=>{
          item.isRead=true;
        })
      }
      this.sessionId=sessionId;
      this.scrollFooter();
    },
    sendMessage(msg){
      if(msg==""){
        return;
      }
      let message={
        channelId:this.sessionId,
        from:this.loginUser,
        to:this.session,
        content:msg,
        time:new Date().getTime(),
        type:"text",
        isRead:true
      }
      if(!this.messages[this.sessionId]){
        this.$set(this.messages,this.sessionId,[])
      }
      this.messages[this.sessionId].push(message);
      this.text="";
      this.scrollFooter();
      if(this.socket){
        this.socket.emit("message",message.from,message.to,message.content,"text");
      }
    },
    receiveMessage(from,to,msg,type){
      if(msg==""){
        return;
      }
      let channelId=to.type=='group'?to.id:from.id;
      let isRead=channelId==this.sessionId;
      let message={
        channelId:channelId,
        from:from,
        to:to,
        content:msg,
        time:new Date().getTime(),
        type:type,
        isRead: isRead
      }
      if(!this.messages[channelId]){
        this.$set(this.messages,channelId,[])
      }
      this.messages[channelId].push(message);
      this.text="";
      if(isRead){
        this.scrollFooter();
      }else{
        if(this.setting.isVoice&&this.$refs.audio){
          if(to.type!='group'){
            this.$refs.audio.play();
          }
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
    getLastMessage(sessionId){
      let messageList=this.messages[sessionId];
      if(messageList){
        let len=messageList.length;
        if(messageList.length>0){
          return {
            time:messageList[len-1].time,
            content:messageList[len-1].content
          }
        }else {
          return {
            time:null,
            content:""
          }
        }
      }else {
        return {
          time:null,
          content:""
        }
      }
    },
    getUnReaderNum(sessionId){
      let messageList=this.messages[sessionId];
      if(messageList){
        let len=messageList.length;
        if(len>0){
          let count=0;
          messageList.forEach((item)=>{
            if(!item.isRead){
              count++;
            }
          })
          if(count>99){
            return "99+"
          }else {
            return count;
          }
        }else {
          return 0
        }
      }else {
        return 0
      }
    },
    showExpression(){
      let _this=this;
      _this.isShow=!_this.isShow;
      function hide(){
        _this.isShow=false;
        document.removeEventListener('click',hide)
      }
      _this.$nextTick(()=>{
        document.addEventListener('click',hide)
      })
    },
    selectExpression(expression){
      this.text+=expression.title;
    },
    parseText(text){
      let arr=this.qqExpression;
      let baseUrl=this.baseUrl;
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
              const reStr = "<img src="+baseUrl+arr[index].url + " height='20' width='20' />";
              text = text.replace(sArr[i], reStr);
            }
          }
        }
      }
      return text;
    },
    searchUser(keyword){
      let arr=[],_this=this;
      this.sessionList.forEach( (item )=>{
        if((item.name.indexOf(keyword)!=-1)||(item.id.indexOf(keyword)!=-1)){
          arr.push(item)
        }
      })
      return arr;
    },
    userLogin(user){
      if(this.socket){
        this.socket.emit("login",user);
      }else {
        user.id="user_"+new Date().getTime();
        user.deviceType="pc";
        this.saveLog(user.name+"登陆成功",'success')
        this.loginUser=user;
      }
    },
    showLogs(){
      let _this=this;
      _this.isShowLog=!_this.isShowLog;
      function show() {
        _this.isShowLog=false;
        document.removeEventListener('click',show)
      }
      document.addEventListener("click",show)
    },
    saveLog(text,type){
      this.logs.push({
        text:text,
        type:type,
        time:new Date().getTime()
      })
    },
    initSocket(){
      let _this=this;
      _this.socket=io("http://39.96.75.1");
      _this.socket.on("message",(from,to,message,type)=>{
        _this.receiveMessage(from,to,message,type)
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
        if(_this.loginUser){
          _this.socket.io.opts.query={
            User:_this.loginUser.id?JSON.stringify(_this.loginUser):''
          }
          _this.saveLog("尝试重新连接！"+JSON.stringify(data)+ ' - reconnect_attempt',"info");
        }
      })
      _this.socket.on("loginSuccess",(user,users)=>{
        _this.loginUser=user;
        _this.sessionList=users;
      })
      _this.socket.on("loginFail",(message)=>{
        _this.showAlterMessage(message)
        console.log(message)
      })
    },
    addUser(user){
      let _this=this;
      let index=-1;
      for (let i = 0; i < _this.sessionList.length; i++) {
        let item = _this.sessionList[i];
        if(user.id==item.id){
          index=i;
          _this.sessionList[i]=user;
        }
      }
      if(index==-1){
        _this.sessionList.push(user);
      }
    },
    removeUser(user){
      let _this=this;
      for (let i = 0; i < _this.sessionList.length; i++) {
        let item = _this.sessionList[i];
        if(user.id==item.id){
          _this.sessionList.splice(i,1);
          break;
        }
      }
    },
    showAlterMessage(message){
      let _this=this;
      this.alterMessage=message;
      _this.isAlter=true;
      let inter=setTimeout(()=>{
        clearTimeout(inter);
        _this.isAlter=false;
      },3000)
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
  }
})
