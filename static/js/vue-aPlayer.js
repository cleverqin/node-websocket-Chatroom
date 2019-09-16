(function () {
  function UiLrc(option) {
    var defaultOpt={
      el:document.body,
      audio:document.querySelector("audio"),
      lrcUrl:"",
      lrcArr:[]
    }
    this.opt=Object.assign({},defaultOpt,option);
    this.init();
  }
  UiLrc.prototype={
    init:function () {
      var _this=this;
      this.getLrc(this.opt.lrcUrl,function (text) {
        if(text){
          _this.opt.lrcArr=_this.parseLrc(text);
        }
        _this.initDom()
      })
    },
    getLrc:function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.readyState != 4 ) return; // 4 表示数据发送完毕
        if(xhr.status == 200) {
          var rsp = xhr.responseText;
          callback(rsp);
        }
        else callback();
      }
      xhr.open('GET', url, true);
      xhr.send(null);
    },
    initDom:function () {
      var _this=this;
      if(this.opt.lrcArr.length>0){
        this.opt.el.innerHTML="<div class='ui-lrcBox'><ul></ul></div>";
        this.opt.lrcArr.forEach(function (item) {
          _this.opt.el.querySelector("ul").innerHTML+="<li data-time='"+item[0]+"'>"+item[1]+"</li>";
        })
        _this.initEvent();
      }else {
        this.opt.el.innerHTML="<div class='ui-lrcBox'><ul><li>未查到相关歌词</li></ul></div>";
      }
    },
    parseLrc:function (lrcStr) {
      var array = lrcStr.split('\n');
      var result = [];
      for(var i=0; i<array.length; i++) {
        var temp = array[i].split(']');
        if(!/^\[\d+:\d+/g.test(temp[0])) continue;
        var text = temp.pop().trim();
        if(text.length<=0){
          text="......"
        }
        for(var j=0; j< temp.length; j++) {
          var _time = temp[j].replace(/^\s*\[/g, '').split(':');
          var time = parseInt(_time[0])*60 + parseFloat(_time[1]);
          result.push([time, text]);
        }
      }
      result.sort(function(a, b){
        return a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0);
      });
      return result;
    },
    findLrcTime:function (time) {
      var lrc=this.opt.lrcArr,start=0;
      if(start < 0 || start == undefined) start = 0;
      for(var i=start; i<lrc.length; i++) {
        if(time >= lrc[i][0] && (!lrc[i+1] || (lrc[i+1] && time < lrc[i+1][0]))) {
          return i;
        }
      }
      return -1;
    },
    initEvent:function () {
      var _this=this;
      this.opt.audio.addEventListener("timeupdate",function (e) {
        var time=_this.opt.audio.currentTime;
        var index=_this.findLrcTime(time);
        if(index!=-1){
          _this.scrollLrc(_this.opt.lrcArr[index])
        }
      })
    },
    scrollLrc:function (lrc) {
      var $el=this.opt.el;
      var $ul=$el.querySelector(".ui-lrcBox ul")
      var $lrc=$el.querySelector("li[data-time='"+lrc[0]+"']");
      var $active=$el.querySelector("li.active");
      if($active){
        $active.className="";
      }
      if($lrc){
        $lrc.className="active";
        var top=this.elOffsetParentTop($lrc);
        var h=$el.querySelector(".ui-lrcBox").offsetHeight/2;
        var ah=$lrc.offsetHeight/2;
        if((top-h+ah)>0){
          $ul.style.top=-(top-h+ah)+"px";
        }else {
          $ul.style.top=0;
        }
      }
    },
    elOffsetParentTop:function (element) {
      var el = (typeof element == "string") ? document.getElementById(element) : element;
      if (el.parentNode === null || el.style.display == 'none') {
        return false;
      }
      return el.offsetTop;
    }
  }
  function UiSlider(option) {
    var defaultOpt={
      el:document.body,
      async:false,
      update:function () {},
      percent:0,
      isVertical:false,
    }
    this.opt=Object.assign({},defaultOpt,option);
    this._init();
  }
  UiSlider.prototype={
    _init:function () {
      this.$el=this.opt.el;
      var isVerticalClass=this.opt.isVertical?"ui-vertical":"ui-progressBox";
      var template="<div class='"+isVerticalClass+" ui-progressBody'>" +
        "<div class='ui-preload'></div>"+
        "<div class='ui-progress'><span class='ui-dotCtrl'></span></div></div>";
      this.$el.innerHTML=template;
      this.$box=this.$el.querySelector(".ui-progressBody");
      this.$progress=this.$el.querySelector(".ui-progress");
      this.$perload=this.$el.querySelector(".ui-preload");
      this.$ctrl=this.$el.querySelector(".ui-dotCtrl");
      this.power=true;
      this._initEvent();
      this._setProgress(this.opt.percent)
    },
    _initEvent:function () {
      var _this=this,sPos={x:0,y:0},offset={width:0,height:0};
      this.$ctrl.addEventListener("mousedown",function (e) {
        _this.power=false;
        sPos.x=_this.getMousePos(e).x;
        sPos.y=_this.getMousePos(e).y;
        offset.width=_this.$progress.offsetWidth;
        offset.height=_this.$progress.offsetHeight;
      })
      document.addEventListener("mousemove",function (e) {
        if(!_this.power){
          if(_this.opt.isVertical){
            var moveL=sPos.y-_this.getMousePos(e).y;;
            var set=offset.height+moveL;
            _this._getPercent(set)
          }else {
            var moveL=_this.getMousePos(e).x-sPos.x;
            var set=offset.width+moveL;
            _this._getPercent(set)
          }
        }
      })
      document.addEventListener("mouseup",function (e) {
        if(!_this.power){
          _this.power=true;
          if(_this.opt.isVertical){
            var moveL=sPos.y-_this.getMousePos(e).y;;
            var set=offset.height+moveL;
            _this._getPercent(set)
          }else {
            var moveL=_this.getMousePos(e).x-sPos.x;
            var set=offset.width+moveL;
            _this._getPercent(set)
          }
        }
      })
      _this.$box.addEventListener("click",function (e) {
        if(_this.opt.isVertical){
          var move=_this.getMousePos(e).y-_this.getTop(_this.$box);
          var set=_this.$box.offsetHeight-move;
          _this._getPercent(set);
        }else {
          var move=_this.getMousePos(e).x-_this.getLeft(_this.$box);
          _this._getPercent(move);
        }
      })
    },
    getMousePos: function (event) {
      var e = event || window.event;
      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      var x = e.pageX || e.clientX + scrollX;
      var y = e.pageY || e.clientY + scrollY;
      return {'x': x, 'y': y};
    },
    getTop: function (e) {
      var offset = e.offsetTop;
      if (e.offsetParent != null) {
        offset +=this.getTop(e.offsetParent);
      }
      return offset;
    },
    getLeft: function (e) {
      var offset = e.offsetLeft;
      if (e.offsetParent != null) {
        offset +=this.getLeft(e.offsetParent);
      }
      return offset;
    },
    _getPercent:function(setH){
      var maxH=this.opt.isVertical?this.$box.offsetHeight:this.$box.offsetWidth,
        percent=0;
      if(setH<0){
        percent=0;
      }else if(setH>maxH){
        percent=1;
      }else {
        percent=setH/maxH
      }
      this._setProgress(percent)
    },
    _setProgress:function (percent) {
      var attr=this.opt.isVertical?"height":"width";
      this.$progress.style[attr]=percent*100+"%";
      if(this.opt.async){
        this.opt.update(percent)
      }
      if(this.power&&!this.async){
        this.opt.update(percent)
      }
    },
    setPercent:function (percent) {
      var attr=this.opt.isVertical?"height":"width";
      if(this.power){
        if(percent>=0&&percent<=1){
          this.$progress.style[attr]=percent*100+"%";
        }
      }
    },
    setPreLoad:function (percent) {
      var attr=this.opt.isVertical?"height":"width";
      if(percent>=0&&percent<=1){
        this.$perload.style[attr]=percent*100+"%";
      }
    }
  };
  var aPlayer={
    install:function (Vue,options) {
      Vue.component('aPlayer',{
        template:"<div class=\"a-player-box\"  :class=\"{'a-player-hide':!showPlayer}\">\n" +
        "    <div class=\"a-player-content\">\n" +
        "      <div class=\"a-player-poster\">\n" +
        "        <img :src=\"song.image\" alt=\"\" :class=\"(audio&&audio.paused)?'paused':'playing'\">\n" +
        "      </div>\n" +
        "      <div class=\"a-player-songInfo\">\n" +
        "        <div class=\"a-player-songName\">{{song.title}}</div>\n" +
        "        <div class=\"a-player-songAuthor\">{{song.author}}</div>\n" +
        "        <div class=\"a-player-songTime\">{{formatTime(duration)}}</div>\n" +
        "      </div>\n" +
        "      <div class=\"a-player-ctrlBox\">\n" +
        "        <div class=\"a-player-ctrlBtn iconfont icon-prev\" @click=\"prev()\"></div>\n" +
        "        <div class=\"a-player-ctrlBtn iconfont a-player-playBtn\" :class=\"(audio&&audio.paused)?'icon-play ':'icon-pause'\" @click=\"togglePlay()\"></div>\n" +
        "        <div class=\"a-player-ctrlBtn iconfont icon-next\" @click=\"next()\"></div>\n" +
        "      </div>\n" +
        "      <div class=\"a-player-volumeBox\">\n" +
        "        <div class=\"a-player-ctrlBtn iconfont \" :class=\"volume==0?'icon-mute':'icon-voice'\"></div>\n" +
        "        <div class=\"a-player-volumeProgress\">\n" +
        "          <div class=\"ui-progressBox ui-progressBody\"><div class=\"ui-preload\"></div><div class=\"ui-progress\" style=\"width: 50%;\"><span class=\"ui-dotCtrl\"></span></div></div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "      <div class=\"a-player-currentTime\">{{formatTime(currentTime)}}</div>\n" +
        "    </div>\n" +
        "    <div class=\"a-player-timeBox\">\n" +
        "      <div class=\"ui-progressBox ui-progressBody\"><div class=\"ui-preload\" style=\"width: 0%;\"></div><div class=\"ui-progress\" style=\"width: 0%;\"><span class=\"ui-dotCtrl\"></span></div></div>\n" +
        "    </div>\n" +
        "    <div class=\"a-player-menus\">\n" +
        "      <span class=\"ca-player-menusIcon\" @click=\"showLrc=!showLrc\">词</span>\n" +
        "      <span class=\"ca-player-menusIcon iconfont icon-menu\" @click=\"showList=!showList\"></span>\n" +
        "    </div>\n" +
        "    <div class=\"a-player-toggleBtn iconfont\" :class=\"showPlayer?'icon-left':'icon-right'\" @click=\"showPlayer=!showPlayer\"></div>\n" +
        "    <div class=\"a-player-lrcContent\" :class=\"{'a-player-lrcHide':!showLrc}\">\n" +
        "      <div class=\"a-player-lrcBody\"></div>\n" +
        "      <div class=\"a-player-lrcClose iconfont icon-close\" @click=\"showLrc=false\"></div>\n" +
        "    </div>\n" +
        "    <audio :autoplay=\"autoPlay\"></audio>\n" +
        "    <div class=\"a-player-listBox\" v-show=\"showList\">\n" +
        "      <div class=\"a-player-listHeader\">\n" +
        "        歌曲列表 （{{list.length}}）\n" +
        "        <svg width=\"120\" height=\"30\" viewBox=\"0 0 120 30\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#cccccc\" class=\"a-player-loading\" v-if=\"loading\">\n" +
        "          <circle cx=\"15\" cy=\"15\" r=\"15\">\n" +
        "            <animate attributeName=\"r\" from=\"15\" to=\"15\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\"15;9;15\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "            <animate attributeName=\"fill-opacity\" from=\"1\" to=\"1\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\"1;.5;1\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "          </circle>\n" +
        "          <circle cx=\"60\" cy=\"15\" r=\"9\" fill-opacity=\"0.3\">\n" +
        "            <animate attributeName=\"r\" from=\"9\" to=\"9\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\"9;15;9\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "            <animate attributeName=\"fill-opacity\" from=\"0.5\" to=\"0.5\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\".5;1;.5\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "          </circle>\n" +
        "          <circle cx=\"105\" cy=\"15\" r=\"15\">\n" +
        "            <animate attributeName=\"r\" from=\"15\" to=\"15\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\"15;9;15\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "            <animate attributeName=\"fill-opacity\" from=\"1\" to=\"1\"\n" +
        "                     begin=\"0s\" dur=\"0.8s\"\n" +
        "                     values=\"1;.5;1\" calcMode=\"linear\"\n" +
        "                     repeatCount=\"indefinite\" />\n" +
        "          </circle>\n" +
        "        </svg>\n" +
        "        <div class=\"a-player-listClose iconfont icon-xiangxia\" @click=\"showList=false\"></div>\n" +
        "      </div>\n" +
        "      <ul class=\"a-player-list scroll\">\n" +
        "        <li v-for=\"item in list\" :key=\"item.id\" :class=\"{active:item.id==song.id}\">\n" +
        "          <span class=\"a-player-songStatus iconfont icon-play\"></span>\n" +
        "          <div class=\"a-player-itemInfo\" :title=\"item.title+'-'+item.author\">{{item.title}}-{{item.author}}</div>\n" +
        "          <div class=\"a-player-itemCtrl\">\n" +
        "            <span class=\"iconfont icon-play\" @click=\"playSong(item)\"></span>\n" +
        "            <span class=\"iconfont icon-up\" @click=\"moveUp(item)\"></span>\n" +
        "            <span class=\"iconfont icon-down\" @click=\"moveDown(item)\"></span>\n" +
        "            <span class=\"iconfont icon-shanchu\" @click=\"delSong(item)\"></span>\n" +
        "          </div>\n" +
        "        </li>\n" +
        "      </ul>\n" +
        "    </div>\n" +
        "    <div class=\"a-player-error\"\n" +
        "         :style=\"{marginBottom:!showList?'10px':'278px',left:showPlayer?'0':'100%'}\"\n" +
        "         v-show=\"showError\">\n" +
        "      <span class=\"iconfont icon-jinggao\"></span>\n" +
        "      {{message}}\n" +
        "    </div>\n" +
        "  </div>",
        props:{
          listId:{
            type: String,
            default:'545888750'
          },
          showLrc:{
            type: Boolean,
            default:false
          },
          showList:{
            type: Boolean,
            default:false
          },
          showPlayer:{
            type: Boolean,
            default:false
          },
          autoPlay:{
            type: Boolean,
            default:false
          }
        },
        watch:{
          listId:function (val,oVal) {
            this.searchList(val)
          }
        },
        data:function () {
          return {
            list:[],
            song:{},
            audio:null,
            currentTime:0,
            duration:0,
            showError:false,
            message:"",
            inter:null,
            loading:false,
            volume:0.5
          }
        },
        mounted:function () {
          this.init();
        },
        methods:{
          init:function () {
            var $el=this.$el;
            this.audio=$el.querySelector("audio");
            var _this=this;
            this.timeCtrl=new UiSlider({
              el:$el.querySelector(".a-player-timeBox"),
              percent:0,
              update:function (val) {
                if(_this.audio.duration){
                  _this.audio.currentTime=_this.audio.duration*val;
                }
              }
            })
            this.volumeCtrl=new UiSlider({
              el:$el.querySelector(".a-player-volumeProgress"),
              percent:_this.volume,
              async:true,
              update:function (val) {
                _this.audio.volume=val;
                _this.volume=val;
              }
            })
            _this.audio.ondurationchange=function () {
              _this.duration=_this.audio.duration;
            }
            _this.audio.onerror=function (e) {
              _this.showErrorMsg("歌曲《"+_this.song.title+"》加载出错了！")
            }
            _this.audio.onended=function (e) {
              _this.next();
              _this.$nextTick(function () {
                _this.audio.play();
              })
            }
            _this.audio.addEventListener("timeupdate",function (e) {
              _this.timeCtrl.setPercent(_this.audio.currentTime/_this.audio.duration);
              _this.currentTime=_this.audio.currentTime;
            })
            _this.audio.addEventListener("progress",function (e) {
              if(_this.audio.buffered.length>0&&_this.audio.duration){
                _this.timeCtrl.setPreLoad(_this.audio.buffered.end(_this.audio.buffered.length-1)/_this.audio.duration)
              }
            })
            _this.searchList(_this.listId);
          },
          searchList(id){
            var _this=this;
            this.loading=true;
            this.$http.jsonp("https://api.asilu.com/163music/?type=playlist&id="+id)
              .then(function (response) {
                this.loading=false;
                this.list=response.body.songs;
                if(!this.song.id){
                  this.changeSong(response.body.songs[0]);
                }
              }).catch(function (error) {
              this.loading=false;
              this.showErrorMsg("获取歌曲列表出错了！")
            })
          },
          changeSong(song){
            var _this=this;
            this.currentTime=0;
            this.timeCtrl.setPercent(0);
            this.timeCtrl.setPreLoad(0);
            this.song=song;
            _this.audio.src='https://music.163.com/song/media/outer/url?id='+song.id+'.mp3'
            new UiLrc({
              el:document.querySelector(".a-player-lrcBody"),
              audio:this.audio,
              lrcUrl:"https://api.asilu.com/163music/?type=songlrc&lrc=lrc&id="+song.id
            })
            if(!this.audio.paused){
              _this.$nextTick(function () {
                _this.audio.play();
              })
            }
          },
          formatTime:function(time) {
            var fen=parseInt(time/60);
            var miao=parseInt(time%60);
            if(fen<=9){
              fen="0"+fen;
            }
            if(miao<=9){
              miao="0"+miao;
            }
            return fen+':'+miao;
          },
          togglePlay:function () {
            if(this.audio.paused){
              this.audio.play()
            }else {
              this.audio.pause()
            }
          },
          next:function () {
            var index=this.findIndex();
            var len=this.list.length
            if(len>0){
              if(index==-1){
                this.changeSong(this.list[0]);
              }else if((index+1)>=len){
                this.changeSong(this.list[0]);
              }else {
                this.changeSong(this.list[index+1]);
              }
            }
            this.togglePlay()
          },
          findIndex:function () {
            var index=-1;
            var _this=this;
            this.list.forEach(function (item,i) {
              if(item.id==_this.song.id){
                index=i;
              }
            })
            return index;
          },
          prev:function () {
            var index=this.findIndex();
            var len=this.list.length
            if(len>0){
              if(index==-1){
                index=0;
              }else if((index-1)<0){
                index=len-1;
              }else {
                index=index-1;
              }
              this.changeSong(this.list[index]);
              this.togglePlay()
            }
          },
          playSong:function (song) {
            this.changeSong(song)
            this.togglePlay()
          },
          moveUp:function (song) {
            var index=-1,_this=this;
            _this.list.forEach(function (item,i) {
              if(song.id==item.id){
                index=i;
              }
            })
            if(index!=0){
              var frontSong=_this.list[index-1];
              _this.$set(_this.list,index,frontSong);
              _this.$set(_this.list,index-1,song);
            }
          },
          moveDown:function (song) {
            var index=-1,_this=this;
            _this.list.forEach(function (item,i) {
              if(song.id==item.id){
                index=i;
              }
            })
            if(index!=(_this.list.length-1)){
              var nextSong=_this.list[index+1];
              _this.$set(_this.list,index,nextSong);
              _this.$set(_this.list,index+1,song);
            }
          },
          delSong:function (song) {
            var index=-1;
            var _this=this;
            this.list.forEach(function (item,i) {
              if(item.id==song.id){
                index=i;
              }
            })
            _this.list.splice(index,1)
          },
          showErrorMsg:function (message) {
            var _this=this;
            this.showError=true;
            _this.message=message;
            if(this.inter){
              clearTimeout(this.inter)
            }
            this.inter=setTimeout(function () {
              _this.showError=false;
              clearTimeout(_this.inter);
              _this.inter=null;
            },5000)
          }
        }
      })
    }
  }
  if(window.Vue){
    Vue.use(aPlayer)
  }else {
    window.aPlayer=aPlayer;
  }
})()