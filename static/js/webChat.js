(function () {
    var uiExpression={
        install:function (Vue, options) {
            var baseUrl="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal";
            var expressions=[{"title": "[坏笑]", "url":"/50/pcmoren_huaixiao_org.png"},
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
            Vue.component("ui-expression",{
                template:"#tpl",
                data:function () {
                    return{
                        expressions:expressions,
                        baseUrl:baseUrl,
                        isShow:false
                    }
                },
                created:function () {
                    var _this=this;
                    document.addEventListener("click",function (e) {
                        _this.isShow=false;
                    })
                },
                methods:{
                    pickerExpression:function (expression) {
                        this.$emit("picker-expression",expression)
                    }
                }
            })
            function getIndex(str) {
                var index=-1;
                expressions.forEach(function (item,i) {
                    if(item.title==str){
                        index=i;
                    }
                })
                return index
            }
            // 4. 添加事例方法
            Vue.prototype.$parseExpression= function (text) {
                if(typeof (text) != "undefined") {
                    var sArr = text.match(/\[.*?\]/g);
                    if(sArr&&sArr.length>0){
                        for(var i = 0; i < sArr.length; i++){
                            var index=getIndex(sArr[i]);
                            if(index!=-1) {
                                var reStr = "<img src="+baseUrl+expressions[index].url + " height='20' width='20' />";
                                text = text.replace(sArr[i], reStr);
                            }
                        }
                    }
                }
                return text;
            }
        }
    }
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
    function UiPlayer(option) {
        var defaultOpt={
            el:document.body,
            songs:[]
        }
        this.opt=Object.assign({},defaultOpt,option);
        this._init()
    }
    UiPlayer.prototype={
        _init:function () {
            this.$el=this.opt.el;
            this.$lrcBtn=this.$el.querySelector(".ui-icon-lrc");
            this.$lrcBox=this.$el.querySelector(".ui-lrc-container");
            this.$lrcBody=this.$el.querySelector(".ui-lrc-body");
            this.$lrcClose=this.$el.querySelector(".ui-icon-close");
            this.$listBtn=this.$el.querySelector(".ui-icon-menu");
            this.$listBox=this.$el.querySelector(".ui-songsBox");
            this.$toggleBtn=this.$el.querySelector(".ui-toggleBtn");
            this.$volume=this.$el.querySelector(".ui-volume-progress");
            this.$time=this.$el.querySelector(".ui-time-progress");
            this.$name=this.$el.querySelector(".ui-song-name");
            this.$author=this.$el.querySelector(".ui-song-author");
            this.$duration=this.$el.querySelector(".ui-song-time");
            this.$next=this.$el.querySelector(".ui-playBtn-next");
            this.$play=this.$el.querySelector(".ui-playBtn-play");
            this.$prev=this.$el.querySelector(".ui-playBtn-prev");
            this.$poster=this.$el.querySelector(".ui-song-poster img");
            this.$currentTime=this.$el.querySelector(".ui-currentTime");
            this.$songsBody=this.$el.querySelector(".ui-songs-body");
            this.audio=this.$el.querySelector("audio");
            this.audio.volume=0.5;
            this.index=0;
            if(this.opt.songs.length>0){
                this.changeSong(this.opt.songs[0])
            }
            this._initEvent()
        },
        _initEvent:function () {
            var _this=this;
            this.$lrcBtn.addEventListener("click",function (e) {
                if(_this.$lrcBox.className.indexOf('ui-lrc-show')!=-1){
                    _this.$lrcBox.className="ui-lrc-container"
                }else {
                    _this.$lrcBox.className="ui-lrc-container ui-lrc-show";
                }
            })
            this.$lrcClose.addEventListener("click",function (e) {
                if(_this.$lrcBox.className.indexOf('ui-lrc-show')!=-1){
                    _this.$lrcBox.className="ui-lrc-container"
                }else {
                    _this.$lrcBox.className="ui-lrc-container ui-lrc-show";
                }
            })
            this.$listBtn.addEventListener("click",function (e) {
                if(_this.$listBox.style.display=="none"){
                    _this.$listBox.style.display="block";
                }else {
                    _this.$listBox.style.display="none";
                }
            })
            this.$toggleBtn.addEventListener("click",function (e) {
                if(_this.$el.className.indexOf('ui-close')!=-1){
                    _this.$el.className="ui-player-Box ui-open"
                }else {
                    _this.$el.className="ui-player-Box ui-close";
                }
            })
            _this.volume=new UiSlider({
                el:_this.$volume,
                async:true,
                percent:0.5,
                update:function (val) {
                    _this.audio.volume=val;
                }
            });
            _this.time=new UiSlider({
                el:_this.$time,
                percent:0,
                update:function (val) {
                    if(_this.audio.duration){
                        _this.audio.currentTime=_this.audio.duration*val;
                    }
                }
            })
            _this.audio.ondurationchange=function () {
                _this.$duration.innerHTML=_this.formatTime(_this.audio.duration)
            }
            _this.audio.onerror=function (e) {
                console.error("音频加载出错了！！")
            }
            _this.audio.onended=function (e) {
                _this.next();
            }
            _this.audio.onpause=function () {
                _this.$play.className="ui-playBtn-play ui-play"
                _this.$poster.className="paused"
            }
            _this.audio.onplay=function () {
                _this.$play.className="ui-playBtn-play ui-pause";
                _this.$poster.className="playing"
            }
            _this.$play.addEventListener("click",function (e) {
                if(_this.audio.paused){
                    _this.audio.play()
                }else {
                    _this.audio.pause()
                }
            })
            _this.$next.addEventListener("click",function (e) {
                _this.next()
            })
            _this.$prev.addEventListener("click",function (e) {
                _this.prev()
            })
            _this.audio.addEventListener("timeupdate",function (e) {
                _this.time.setPercent(_this.audio.currentTime/_this.audio.duration);
                _this.$currentTime.innerHTML=_this.formatTime(_this.audio.currentTime);
            })
            _this.audio.addEventListener("progress",function (e) {
                if(_this.audio.buffered.length>0&&_this.audio.duration){
                    _this.time.setPreLoad(_this.audio.buffered.end(_this.audio.buffered.length-1)/_this.audio.duration)
                }
            })
            _this.renderSongsList();
        },
        changeSong:function (song) {
            this.$name.innerHTML=song.title;
            this.$author.innerHTML=song.author;
            this.$poster.src=song.image;
            this.$duration.innerHTML=this.formatTime(0);
            this.$currentTime.innerHTML=this.formatTime(0);
            this.audio.src="https://music.163.com/song/media/outer/url?id="+song.id+".mp3";
            new UiLrc({
                el:this.$lrcBody,
                audio:this.audio,
                lrcUrl:"https://api.asilu.com/163music/?type=songlrc&lrc=lrc&id="+song.id
            })
            if(this.time){
                this.time.setPercent(0);
                this.time.setPreLoad(0);
            }
        },
        prev:function () {
            var index=this.index-1;
            if(index>=0&&index<this.opt.songs.length){
                this.playSong(index);
            }
        },
        next:function () {
            var index=this.index+1;
            if(index>=0&&index<this.opt.songs.length){
                this.playSong(index);
            }
        },
        playSong:function (index) {
            if(index>=0&&index<this.opt.songs.length){
                this.index=index;
                this.changeSong(this.opt.songs[this.index]);
                this.audio.play();
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
            return fen+'：'+miao;
        },
        renderSongsList:function () {
            var _this=this;
            _this.$songsBody.innerHTML="";
            _this.opt.songs.forEach(function (song,index) {
                var $tr=document.createElement('tr');
                $tr.innerHTML="<td>"+index+"</td><td>"+song.title+"</td><td>"+song.author+"</td>";
                $tr.addEventListener("click",function (e) {
                    _this.playSong(index);
                })
                _this.$songsBody.appendChild($tr);
            })
        },
        reloadSongs:function (songs) {
            this.opt.songs=songs;
            this.index=0;
            if(songs.length>0){
                this.changeSong(songs[0]);
            }
        }
    }
    window.UiLrc=UiLrc;
    window.UiSlider=UiSlider;
    window.UiPlayer=UiPlayer;
    if (window.Vue) {
        Vue.use(uiExpression)
    }else {
        window.uiExpression=uiExpression;
    }
})()
Vue.component("ui-login",{
    template:"#imLogin",
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
        ]
        return {
            name:"",
            isShow:false,
            avatarUrl:images[0],
            images:images,
            errorMsg:""
        }
    },
    created:function () {
        var _this=this;
        document.addEventListener("click",function (e) {
            _this.isShow=false;
        })
    },
    methods:{
        userLogin:function () {
            var _this=this;
            var name=_this.trim(_this.name);
            if(name!=""){
                _this.$emit("user-login",{
                    id:"webChat_"+new Date().getTime(),
                    name:name,
                    avatarUrl:_this.avatarUrl,
                    type:"user"
                })
            }else {
                _this.name="";
                this.showError("请输入用户昵称！")
            }
        },
        showError:function (err) {
            var _this=this;
            if(this.interval){
                clearTimeout(_this.interval)
            }
            this.errorMsg=err;
            this.interval=setTimeout(function () {
                _this.errorMsg="";
            },3000)
        },
        trim:function (string) {
            return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    }
})
new Vue({
    el:"#webChatBox",
    template:"#webChat",
    data:function () {
        return {
            loginUser:{
                id:"u001",
                avatarUrl:"http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100",
                name:"似水流年",
                type:"user"
            },
            tab:"chat",
            users:[
                {
                    id:"r001",
                    avatarUrl:"./static/images/group-icon.png",
                    name:"聊天室群",
                    type:"room"
                },
                {
                    id:"a123456",
                    name:"往事随风",
                    avatarUrl:"http://q.qlogo.cn/headimg_dl?dst_uin=240571231&spec=100",
                    type:"user"
                }
            ],
            threads:{},
            channelId:"r001",
            text:"",
            setting:{
                isShowTime:true,
                isVoice:true,
                isShowName:true
            },
            keyWord:"",
            isLogin:true,
            star:0,
            starUser:[]
        }
    },
    computed: {
        messages: function () {
            var messages = [];
            if (this.threads[this.channelId]) {
                messages = this.threads[this.channelId];
            }
            return messages;
        },
        channel:function () {
            var user={},_this=this;
            this.users.forEach(function (item) {
                if(_this.channelId==item.id){
                    user=item
                }
            })
            return user;
        }
    },
    created:function () {
        this.initBg();
        this.initPlayer();
        this.getStar();
        this.getStarUser();
    },
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
        sendMessage:function (text,to) {
            var isRead=this.channelId==to.id?true:false;
            var message={
                threadId:to.id,
                from:this.loginUser,
                to:to,
                content:text,
                time:new Date().getTime(),
                type:"send",
                isRead:isRead
            }
            this.addMessage(message)
            this.getMessage(to,text)
        },
        receiveMessage:function (text,from) {
            var isRead=this.channelId==from.id?true:false;
            var message={
                threadId:from.id,
                from:from,
                to:this.loginUser,
                content:text,
                time:new Date().getTime(),
                type:"receive",
                isRead:isRead
            }
            this.addMessage(message)
            if(this.setting.isVoice){
                this.$refs.audio.play();
            }
        },
        addMessage:function (message) {
            var _this=this;
            if(!this.threads[message.threadId]){
                this.$set(this.threads,message.threadId,[])
            }
            this.threads[message.threadId].push(message)
            this.$nextTick(function () {
                _this.scrollFooter()
            })
        },
        send:function (){
            var text=this.trim(this.text);
            if(text!=""){
                this.sendMessage(text,this.channel)
            }
            this.text="";
        },
        getMessage:function (channel,text) {
            var _this=this;
            this.$http.get("http://www.tuling123.com/openapi/api",{params:{
                key:'a36d98ad2dfa44a487c74fefff41080c',
                info:text,
                userid:"123456"
            }}).then(function (response) {
                var data=response.body;
                if(data.text){
                    _this.receiveMessage(data.text,_this.channel)
                }
            })
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
        scrollFooter:function () {
            var ul = this.$refs.list;
            ul.scrollTop = ul.scrollHeight;
        },
        getLastMsg:function (id) {
            var message={};
            var messgaes=this.threads[id];
            if(messgaes&&(messgaes.length>0)){
                message=messgaes[messgaes.length-1];
            }
            return message;
        },
        getUnReaderNum:function (id){
            var num=0;
            var messgaes=this.threads[id];
            if(messgaes&&(messgaes.length>0)){
                messgaes.forEach(function (item) {
                    if(!item.isRead){
                        num++;
                    }
                })
            }
            return num;
        },
        picker:function(expression){
            this.text+=expression.title;
        },
        trim:function (string) {
            return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        },
        searchUser:function () {
            var arr=[],_this=this;
            this.users.forEach(function (item ){
                if((item.name.indexOf(_this.keyWord)!=-1)||(item.id.indexOf(_this.keyWord)!=-1)){
                    arr.push(item)
                }
            })
            return arr;
        },
        changeChannel:function (channelId) {
            var _this=this;
            this.channelId=channelId;
            _this.setMessageReader(channelId);
            this.$nextTick(function () {
                _this.scrollFooter()
            })
        },
        setMessageReader:function (id) {
            var messgaes=this.threads[id],_this=this;
            if(messgaes&&(messgaes.length>0)){
                messgaes.forEach(function (item,index) {
                    if(!item.isRead){
                       _this.threads[id][index].isRead=true;
                    }
                })
            }
        },
        initBg:function () {
            this.$http.jsonp("https://api.asilu.com/bg/").then(function (response) {
                var images=response.body.images,
                    len=images.length;
                setInterval(function () {
                    var index=parseInt(Math.random()*len);
                    var img=new Image();
                    img.addEventListener('load',function () {
                        document.body.style.backgroundImage="url("+images[index].url+")";
                    })
                    img.src=images[index].url;
                },30000)
            })
        },
        userLogin:function (user) {
            this.loginUser=user;
            this.isLogin=true;
        },
        initPlayer:function () {
            this.$http.jsonp("https://api.asilu.com/163music/?type=playlist&id=545888750")
              .then(function (response) {
                var body=response.body;
                  var songs=body.songs;
                  new UiPlayer({
                      el:document.querySelector(".ui-player-Box"),
                      songs:songs
                  })
            })
        },
        getStar:function () {
            this.$http.get("https://api.github.com/repos/cleverqin/node-websocket-Chatroom")
              .then(function (reponse) {
                  var body=reponse.body;
                  this.star=body.stargazers_count;
              })
        },
        getStarUser:function () {
            this.$http.get("https://api.github.com/repos/cleverqin/node-websocket-Chatroom/stargazers")
              .then(function (reponse) {
                  var body=reponse.body;
                  this.starUser=body;
              })
        }
    }
})