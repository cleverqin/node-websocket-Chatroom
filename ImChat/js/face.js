(function (WIN) {
    var faceJson=[{"faceID":"face0","title":"微笑"},{"faceID":"face1","title":"撇嘴"},{"faceID":"face2","title":"色"},{"faceID":"face3","title":"发呆"},{"faceID":"face4","title":"得意"},{"faceID":"face5","title":"流泪"},{"faceID":"face6","title":"害羞"},{"faceID":"face7","title":"闭嘴"},{"faceID":"face8","title":"睡"},{"faceID":"face9","title":"大哭"},{"faceID":"face10","title":"尴尬"},{"faceID":"face11","title":"发怒"},{"faceID":"face12","title":"调皮"},{"faceID":"face13","title":"呲牙"},{"faceID":"face14","title":"惊讶"},{"faceID":"face15","title":"难过"},{"faceID":"face16","title":"酷"},{"faceID":"face17","title":"冷汗"},{"faceID":"face18","title":"抓狂"},{"faceID":"face19","title":"吐"},{"faceID":"face20","title":"偷笑"},{"faceID":"face21","title":"可爱"},{"faceID":"face22","title":"白眼"},{"faceID":"face23","title":"傲慢"},{"faceID":"face24","title":"饥饿"},{"faceID":"face25","title":"困"},{"faceID":"face26","title":"惊恐"},{"faceID":"face27","title":"流汗"},{"faceID":"face28","title":"憨笑"},{"faceID":"face29","title":"装逼"},{"faceID":"face30","title":"奋斗"},{"faceID":"face31","title":"咒骂"},{"faceID":"face32","title":"疑问"},{"faceID":"face33","title":"嘘"},{"faceID":"face34","title":"晕"},{"faceID":"face35","title":"折磨"},{"faceID":"face36","title":"衰"},{"faceID":"face37","title":"骷髅"},{"faceID":"face38","title":"敲打"},{"faceID":"face39","title":"再见"},{"faceID":"face40","title":"擦汗"},{"faceID":"face41","title":"抠鼻"},{"faceID":"face42","title":"鼓掌"},{"faceID":"face43","title":"糗大了"},{"faceID":"face44","title":"坏笑"},{"faceID":"face45","title":"左哼哼"},{"faceID":"face46","title":"右哼哼"},{"faceID":"face47","title":"哈欠"},{"faceID":"face48","title":"鄙视"},{"faceID":"face49","title":"委屈"},{"faceID":"face50","title":"快哭了"},{"faceID":"face51","title":"阴险"},{"faceID":"face52","title":"亲亲"},{"faceID":"face53","title":"吓"},{"faceID":"face54","title":"可怜"},{"faceID":"face55","title":"菜刀"},{"faceID":"face56","title":"西瓜"},{"faceID":"face57","title":"啤酒"},{"faceID":"face58","title":"篮球"},{"faceID":"face59","title":"乒乓"},{"faceID":"face60","title":"咖啡"},{"faceID":"face61","title":"饭"},{"faceID":"face62","title":"猪头"},{"faceID":"face63","title":"玫瑰"},{"faceID":"face64","title":"凋谢"},{"faceID":"face65","title":"示爱"},{"faceID":"face66","title":"爱心"},{"faceID":"face67","title":"心碎"},{"faceID":"face68","title":"蛋糕"},{"faceID":"face69","title":"闪电"},{"faceID":"face70","title":"炸弹"},{"faceID":"face71","title":"刀"},{"faceID":"face72","title":"足球"},{"faceID":"face73","title":"瓢虫"},{"faceID":"face74","title":"便便"},{"faceID":"face75","title":"月亮"},{"faceID":"face76","title":"太阳"},{"faceID":"face77","title":"礼物"},{"faceID":"face78","title":"拥抱"},{"faceID":"face79","title":"赞"},{"faceID":"face80","title":"踩"},{"faceID":"face81","title":"握手"},{"faceID":"face82","title":"胜利"},{"faceID":"face83","title":"抱拳"},{"faceID":"face84","title":"勾引"},{"faceID":"face85","title":"拳头"},{"faceID":"face86","title":"差劲"},{"faceID":"face87","title":"爱你"},{"faceID":"face88","title":"NO"},{"faceID":"face89","title":"OK"},{"faceID":"face90","title":"爱情"},{"faceID":"face91","title":"飞吻"},{"faceID":"face92","title":"跳跳"},{"faceID":"face93","title":"发抖"},{"faceID":"face94","title":"怄火"},{"faceID":"face95","title":"转圈"},{"faceID":"face96","title":"磕头"},{"faceID":"face97","title":"回头"},{"faceID":"face98","title":"跳绳"},{"faceID":"face99","title":"挥手"}];
    window.Face=function(option) {
        var deafultOpt={
            el:document.querySelector("body"),
            callBack:function () {}
        }
        deafultOpt=option;
        this.opt=deafultOpt;
        this.init();
    }
    Face.prototype={
        Constructor: Face,
        init:function () {
            var _this=this;
            var facePanel=document.createElement("ul");
            var faceWarp=document.createElement("div");
            facePanel.className="face-panel";
            faceWarp.className='face-warp';
            faceWarp.appendChild(facePanel);
            _this.opt.el.appendChild(faceWarp);
            for(var i=0;i<faceJson.length;i++){
                var face=faceJson[i];
                var li=document.createElement("li");
                li.className="face "+face.faceID;
                li.title=face.title;
                (function (face) {
                    li.addEventListener('click',function (e) {
                        _this.opt.callBack(face,faceWarp);
                        e.preventDefault()
                        e.stopPropagation();
                    });
                })(face)
                facePanel.appendChild(li);
            }
            _this.opt.el.addEventListener("click",function (e) {
                if( faceWarp.style.display=="block"){
                    faceWarp.style.display="none";
                }else {
                    faceWarp.style.display="block";
                }
                e.preventDefault()
                e.stopPropagation();

            });
            document.addEventListener("click",function (e) {
                faceWarp.style.display="none";
            })

        },
        replaceFace:function (text) {
            for(var i=0;i<faceJson.length;i++){
                var face=faceJson[i];
                var str="<span class='face "+face.faceID+"' title='"+face.title+"'></span>";
                var str1='【'+face.title+'】';
                var reg = new RegExp(str1,"g");
                text=text.replace(reg,str);
            }
            return text;
        }
    }
    var DAY, DEFAULT_FORMAT, HOUR, MINUTE, MONTH, SECOND, YEAR, angularApp, entry, exports, getFullTime, map, replace, time, two, unify;
    YEAR = "year";
    MONTH = "month";
    DAY = "day";
    HOUR = "hour";
    MINUTE = "minute";
    SECOND = "second";
    DEFAULT_FORMAT = "%y-%M-%d %h:%m:%s";
    map = {
        "%y": YEAR,
        "%M": MONTH,
        "%d": DAY,
        "%h": HOUR,
        "%m": MINUTE,
        "%s": SECOND
    };
    unify = function(time) {
        time -= 0;
        if (("" + time).length === 10) {
            time *= 1000;
        }
        return time;
    };
    two = function(str) {
        var s;
        s = "" + str;
        if (s.length === 1) {
            s = "0" + s;
        }
        return s;
    };
    replace = function(str, src, dst) {
        var reg;
        reg = new RegExp(src, "g");
        return str.replace(reg, dst);
    };
    getFullTime = function(time) {
        var date;
        date = new Date(unify(time));
        return {
            year: date.getFullYear(),
            month: two(date.getMonth() + 1),
            day: two(date.getDate()),
            hour: two(date.getHours()),
            minute: two(date.getMinutes()),
            second: two(date.getSeconds())
        };
    };
    time = {
        "default": function(time, format) {
            var fullTime, ret, src;
            if (format && (typeof format) !== "string") {
                throw new Error("format must be a string.");
            }
            fullTime = getFullTime(time);
            ret = format || DEFAULT_FORMAT;
            for (src in map) {
                ret = replace(ret, src, fullTime[map[src]]);
            }
            return ret;
        },
        human: function(time) {
            var ago, curTime, diff, int;
            time = unify(time);
            int = parseInt;
            curTime = +new Date();
            diff = curTime - time;
            ago = "";
            if (1000 * 60 > diff) {
                ago = "刚刚";
            } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
                ago = int(diff / (1000 * 60)) + "分钟前";
            } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
                ago = int(diff / (1000 * 60 * 60)) + "小时前";
            } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
                ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
            } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
                ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
            } else {
                ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
            }
            return ago;
        }
    };
    entry = time["default"];
    entry.human = entry.ago = time.human;
    if (typeof module !== "undefined" && module.exports) {
        return module.exports = exports = entry;
    } else if (typeof WIN["define"] === "function") {
        return define(function(require, exports, module) {
            return module.exports = exports = function() {
                return entry;
            };
        });
    } else if (typeof WIN["angular"] === "object") {
        angularApp = angular.module("binnng/time", []);
        angularApp.factory("$time", function() {
            return entry;
        });
        angularApp.filter("ago", function() {
            return function(time) {
                return entry.ago(time);
            };
        });
        angularApp.filter("date", function() {
            return function(time) {
                return entry(time, "%y年%M月%d日");
            };
        });
        return angularApp.filter("datetime", function() {
            return function(time) {
                return entry(time, DEFAULT_FORMAT);
            };
        });
    } else {
        return WIN["Time"] = entry;
    }
})(window)