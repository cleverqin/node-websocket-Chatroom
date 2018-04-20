(function () {
    var vueFace= {
        install:function (Vue, options) {
            var baseUrl="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal";
            var faceJson = [
                {"phrase": "[坏笑]",
                    "url": baseUrl + "/50/pcmoren_huaixiao_org.png"}, {
                    "phrase": "[舔屏]",
                    "url": baseUrl + "/40/pcmoren_tian_org.png"
                }, {"phrase": "[污]", "url": baseUrl + "/3c/pcmoren_wu_org.png"}, {
                    "phrase": "[允悲]",
                    "url": baseUrl + "/2c/moren_yunbei_org.png"
                }, {"phrase": "[笑而不语]", "url": baseUrl + "/3a/moren_xiaoerbuyu_org.png"}, {
                    "phrase": "[费解]",
                    "url": baseUrl + "/3c/moren_feijie_org.png"
                }, {"phrase": "[憧憬]", "url": baseUrl + "/37/moren_chongjing_org.png"}, {
                    "phrase": "[并不简单]",
                    "url": baseUrl + "/fd/moren_bingbujiandan_org.png"
                }, {"phrase": "[微笑]", "url": baseUrl + "/5c/huanglianwx_org.gif"}, {
                    "phrase": "[嘻嘻]",
                    "url": baseUrl + "/0b/tootha_org.gif"
                }, {"phrase": "[哈哈]", "url": baseUrl + "/6a/laugh.gif"}, {
                    "phrase": "[可爱]",
                    "url": baseUrl + "/14/tza_org.gif"
                }, {"phrase": "[可怜]", "url": baseUrl + "/af/kl_org.gif"}, {
                    "phrase": "[挖鼻]",
                    "url": baseUrl + "/0b/wabi_org.gif"
                }, {"phrase": "[吃惊]", "url": baseUrl + "/f4/cj_org.gif"}, {
                    "phrase": "[害羞]",
                    "url": baseUrl + "/6e/shamea_org.gif"
                }, {"phrase": "[挤眼]", "url": baseUrl + "/c3/zy_org.gif"}, {
                    "phrase": "[闭嘴]",
                    "url": baseUrl + "/29/bz_org.gif"
                }, {"phrase": "[鄙视]", "url": baseUrl + "/71/bs2_org.gif"}, {
                    "phrase": "[爱你]",
                    "url": baseUrl + "/6d/lovea_org.gif"
                }, {"phrase": "[泪]", "url": baseUrl + "/9d/sada_org.gif"}, {
                    "phrase": "[偷笑]",
                    "url": baseUrl + "/19/heia_org.gif"
                }, {"phrase": "[亲亲]", "url": baseUrl + "/8f/qq_org.gif"}, {
                    "phrase": "[生病]",
                    "url": baseUrl + "/b6/sb_org.gif"
                }, {"phrase": "[太开心]", "url": baseUrl + "/58/mb_org.gif"}, {
                    "phrase": "[白眼]",
                    "url": baseUrl + "/d9/landeln_org.gif"
                }, {"phrase": "[右哼哼]", "url": baseUrl + "/98/yhh_org.gif"}, {
                    "phrase": "[左哼哼]",
                    "url": baseUrl + "/6d/zhh_org.gif"
                }, {"phrase": "[嘘]", "url": baseUrl + "/a6/x_org.gif"}, {
                    "phrase": "[衰]",
                    "url": baseUrl + "/af/cry.gif"
                }, {"phrase": "[委屈]", "url": baseUrl + "/73/wq_org.gif"}, {
                    "phrase": "[吐]",
                    "url": baseUrl + "/9e/t_org.gif"
                }, {"phrase": "[哈欠]", "url": baseUrl + "/cc/haqianv2_org.gif"}, {
                    "phrase": "[抱抱_旧]",
                    "url": baseUrl + "/27/bba_org.gif"
                }, {"phrase": "[怒]", "url": baseUrl + "/7c/angrya_org.gif"}, {
                    "phrase": "[疑问]",
                    "url": baseUrl + "/5c/yw_org.gif"
                }, {"phrase": "[馋嘴]", "url": baseUrl + "/a5/cza_org.gif"}, {
                    "phrase": "[拜拜]",
                    "url": baseUrl + "/70/88_org.gif"
                }, {"phrase": "[思考]", "url": baseUrl + "/e9/sk_org.gif"}, {
                    "phrase": "[汗]",
                    "url": baseUrl + "/24/sweata_org.gif"
                }, {"phrase": "[困]", "url": baseUrl + "/40/kunv2_org.gif"}, {
                    "phrase": "[睡]",
                    "url": baseUrl + "/96/huangliansj_org.gif"
                }, {"phrase": "[钱]", "url": baseUrl + "/90/money_org.gif"}, {
                    "phrase": "[失望]",
                    "url": baseUrl + "/0c/sw_org.gif"
                }, {"phrase": "[酷]", "url": baseUrl + "/40/cool_org.gif"}, {
                    "phrase": "[色]",
                    "url": baseUrl + "/20/huanglianse_org.gif"
                }, {"phrase": "[哼]", "url": baseUrl + "/49/hatea_org.gif"}, {
                    "phrase": "[鼓掌]",
                    "url": baseUrl + "/36/gza_org.gif"
                }, {"phrase": "[晕]", "url": baseUrl + "/d9/dizzya_org.gif"}, {
                    "phrase": "[悲伤]",
                    "url": baseUrl + "/1a/bs_org.gif"
                }, {"phrase": "[抓狂]", "url": baseUrl + "/62/crazya_org.gif"}, {
                    "phrase": "[黑线]",
                    "url": baseUrl + "/91/h_org.gif"
                }, {"phrase": "[阴险]", "url": baseUrl + "/6d/yx_org.gif"}, {
                    "phrase": "[怒骂]",
                    "url": baseUrl + "/60/numav2_org.gif"
                }, {"phrase": "[互粉]", "url": baseUrl + "/89/hufen_org.gif"}, {
                    "phrase": "[心]",
                    "url": baseUrl + "/40/hearta_org.gif"
                }, {"phrase": "[伤心]", "url": baseUrl + "/ea/unheart.gif"}, {
                    "phrase": "[猪头]",
                    "url": baseUrl + "/58/pig.gif"
                }, {"phrase": "[熊猫]", "url": baseUrl + "/6e/panda_org.gif"}, {
                    "phrase": "[兔子]",
                    "url": baseUrl + "/81/rabbit_org.gif"
                }, {"phrase": "[ok]", "url": baseUrl + "/d6/ok_org.gif"}, {
                    "phrase": "[耶]",
                    "url": baseUrl + "/d9/ye_org.gif"
                }, {"phrase": "[good]", "url": baseUrl + "/d8/good_org.gif"}, {
                    "phrase": "[NO]",
                    "url": baseUrl + "/ae/buyao_org.gif"
                }, {"phrase": "[赞]", "url": baseUrl + "/d0/z2_org.gif"}, {
                    "phrase": "[来]",
                    "url": baseUrl + "/40/come_org.gif"
                }, {"phrase": "[弱]", "url": baseUrl + "/d8/sad_org.gif"}, {
                    "phrase": "[草泥马]",
                    "url": baseUrl + "/7a/shenshou_org.gif"
                }, {"phrase": "[神马]", "url": baseUrl + "/60/horse2_org.gif"}, {
                    "phrase": "[囧]",
                    "url": baseUrl + "/15/j_org.gif"
                }, {"phrase": "[浮云]", "url": baseUrl + "/bc/fuyun_org.gif"}, {
                    "phrase": "[给力]",
                    "url": baseUrl + "/1e/geiliv2_org.gif"
                }, {"phrase": "[围观]", "url": baseUrl + "/f2/wg_org.gif"}, {
                    "phrase": "[威武]",
                    "url": baseUrl + "/70/vw_org.gif"
                }, {"phrase": "[话筒]", "url": baseUrl + "/9f/huatongv2_org.gif"}, {
                    "phrase": "[蛋糕]",
                    "url": baseUrl + "/3a/cakev2_thumb.gif"
                }, {"phrase": "[蜡烛]", "url": baseUrl + "/d9/lazhuv2_org.gif"}, {
                    "phrase": "[广告]",
                    "url": baseUrl + "/60/ad_new0902_org.gif"
                }, {"phrase": "[doge]", "url": baseUrl + "/b6/doge_org.gif"}, {
                    "phrase": "[喵喵]",
                    "url": baseUrl + "/4a/mm_org.gif"
                }, {"phrase": "[二哈]", "url": baseUrl + "/74/moren_hashiqi_org.png"}, {
                    "phrase": "[哆啦A梦无奈]",
                    "url": baseUrl + "/96/dora_wunai_org.png"
                }, {"phrase": "[哆啦A梦笑]", "url": baseUrl + "/54/dora_xiao_org.png"}, {
                    "phrase": "[哆啦A梦亲亲]",
                    "url": baseUrl + "/e0/dora_qinqin_org.png"
                }, {"phrase": "[哆啦A梦美味]", "url": baseUrl + "/21/dora_meiwei_org.png"}, {
                    "phrase": "[哆啦A梦开心]",
                    "url": baseUrl + "/df/dora_kaixin_org.png"
                }, {"phrase": "[笑cry]", "url": baseUrl + "/34/xiaoku_org.gif"}, {
                    "phrase": "[摊手]",
                    "url": baseUrl + "/09/pcmoren_tanshou_org.png"
                }, {"phrase": "[抱抱]", "url": baseUrl + "/70/pcmoren_baobao_org.png"}, {
                    "phrase": "[红包飞]",
                    "url": baseUrl + "/c8/../e0/hongbao1_org.gif"
                }, {"phrase": "[发红包]", "url": baseUrl + "/ca/fahongbao_org.gif"}, {
                    "phrase": "[冰川时代希德奶奶]",
                    "url": baseUrl + "/35/bhsj5_nainai_org.gif"
                }, {"phrase": "[快银]", "url": baseUrl + "/7e/xman_kuaiyin_org.gif"}, {
                    "phrase": "[暴风女]",
                    "url": baseUrl + "/7b/xman_baofengnv_org.gif"
                }, {"phrase": "[芒果流口水]", "url": baseUrl + "/64/mango_07_org.gif"}, {
                    "phrase": "[芒果点赞]",
                    "url": baseUrl + "/5c/mango_12_org.gif"
                }, {"phrase": "[芒果大笑]", "url": baseUrl + "/9f/mango_02_org.gif"}, {
                    "phrase": "[芒果得意]",
                    "url": baseUrl + "/ee/mango_03_org.gif"
                }, {"phrase": "[芒果萌萌哒]", "url": baseUrl + "/49/mango_11_org.gif"}, {
                    "phrase": "[羊年大吉]",
                    "url": baseUrl + "/cc/yangniandj_org.gif"
                }, {"phrase": "[西瓜]", "url": baseUrl + "/6b/watermelon.gif"}, {
                    "phrase": "[足球]",
                    "url": baseUrl + "/c0/football.gif"
                }, {"phrase": "[老妈我爱你]", "url": baseUrl + "/46/mothersday_org.gif"}, {
                    "phrase": "[母亲节]",
                    "url": baseUrl + "/36/carnation_org.gif"
                }, {"phrase": "[肥皂]", "url": baseUrl + "/e5/soap_org.gif"}, {
                    "phrase": "[有钱]",
                    "url": baseUrl + "/e6/youqian_org.gif"
                }, {"phrase": "[地球一小时]", "url": baseUrl + "/dc/earth1r_org.gif"}, {
                    "phrase": "[国旗]",
                    "url": baseUrl + "/dc/flag_org.gif"
                }, {"phrase": "[许愿]", "url": baseUrl + "/87/lxhxuyuan_org.gif"}, {
                    "phrase": "[风扇]",
                    "url": baseUrl + "/92/fan.gif"
                }, {"phrase": "[炸鸡和啤酒]", "url": baseUrl + "/f4/zhaji_org.gif"}, {
                    "phrase": "[雪]",
                    "url": baseUrl + "/00/snow_org.gif"
                }, {"phrase": "[马上有对象]", "url": baseUrl + "/ee/mashangyouduixiang_org.gif"}, {
                    "phrase": "[马到成功旧]",
                    "url": baseUrl + "/30/madaochenggong_org.gif"
                }, {"phrase": "[青啤鸿运当头]", "url": baseUrl + "/f8/hongyun_org.gif"}, {
                    "phrase": "[让红包飞]",
                    "url": baseUrl + "/0b/hongbaofei2014_org.gif"
                }, {"phrase": "[ali做鬼脸]", "url": baseUrl + "/20/alizuoguiliannew_org.gif"}, {
                    "phrase": "[ali哇]",
                    "url": baseUrl + "/de/aliwanew_org.gif"
                }, {"phrase": "[xkl转圈]", "url": baseUrl + "/f4/xklzhuanquan_org.gif"}, {
                    "phrase": "[酷库熊顽皮]",
                    "url": baseUrl + "/46/kxwanpi_org.gif"
                }, {"phrase": "[bm可爱]", "url": baseUrl + "/95/bmkeai_org.gif"}, {
                    "phrase": "[BOBO爱你]",
                    "url": baseUrl + "/74/boaini_org.gif"
                }, {"phrase": "[转发]", "url": baseUrl + "/02/lxhzhuanfa_org.gif"}, {
                    "phrase": "[得意地笑]",
                    "url": baseUrl + "/d4/lxhdeyidixiao_org.gif"
                }, {"phrase": "[ppb鼓掌]", "url": baseUrl + "/7e/ppbguzhang_org.gif"}, {
                    "phrase": "[din推撞]",
                    "url": baseUrl + "/dd/dintuizhuang_org.gif"
                }, {"phrase": "[moc转发]", "url": baseUrl + "/cb/moczhuanfa_org.gif"}, {
                    "phrase": "[lt切克闹]",
                    "url": baseUrl + "/73/ltqiekenao_org.gif"
                }, {"phrase": "[江南style]", "url": baseUrl + "/67/gangnamstyle_org.gif"}, {
                    "phrase": "[笑哈哈]",
                    "url": baseUrl + "/32/lxhwahaha_org.gif"
                }].splice(0,98);
            // 3. 注入组件
            Vue.component('ui-face',{
                template:'<a class="web_wechat_face" href="javascript:void (0)" title="表情" @click.stop="flag=!flag"> <transition name="custom-classes-transition" enter-active-class="animate scaleFadeIn" leave-active-class="animate scaleFadeOut"> <div class="warpBox" v-show="flag"> <div class="face-warp"> <template v-for="item in faceJson"> <a href="javascript:void(0)" v-bind:title="item.phrase" @click.stop="clickFace(item)"><img :src="item.url" width="22" height="22"></a> </template> </div></div></transition></a>',
                data:function () {
                    return {
                        faceJson:faceJson,
                        flag:false
                    }
                },
                created:function () {
                    var _this=this;
                    document.addEventListener('click',function (e) {
                        _this.flag=false;
                    })
                },
                methods:{
                    clickFace:function (face) {
                        this.$emit('select-face',face)
                    }
                }
            })
            function getIndex(str) {
                var index=-1;
                faceJson.forEach(function (item,i) {
                    if(item.phrase==str){
                        index=i;
                    }
                })
                return index
            }
            // 4. 添加事例方法
            Vue.prototype.$replaceFace = function (text) {
                if(typeof (text) != "undefined") {
                    var sArr = text.match(/\[.*?\]/g);
                    if(sArr&&sArr.length>0){
                        for(var i = 0; i < sArr.length; i++){
                            if(getIndex(sArr[i])!=-1) {
                                var reStr = "<img src=\"" +faceJson[getIndex(sArr[i])].url  + "\" height=\"20\" width=\"20\" />";
                                text = text.replace(sArr[i], reStr);
                            }
                        }
                    }
                }
                return text;
            }
        }
    }
    var Toast={};
    Toast.install=function (Vue,options) {
        var opt={
            type:"top",
            duration:2500
        }
        for (var key in options){
            opt[key]=options[key];
        }
        Vue.prototype.$message=function (tips,type) {
            if(type){
                opt.type=type
            }
            var toastTpl=Vue.extend({
                template:'<div class="animate fadeIn ui-toast ui-toast-'+opt.type+'">'+tips+'</div>'
            })
            var tpl=new toastTpl().$mount().$el;
            document.body.appendChild(tpl)
            setTimeout(function () {
                document.body.removeChild(tpl)
            },opt.duration)
        }
        var arr=['top','bottom','center'];
        arr.forEach(function (type) {
            Vue.prototype.$message[type]=function (tips) {
                return Vue.prototype.$message(tips,type)
            }
        })
    }
    if (window.Vue) {
        Vue.use(vueFace)
        Vue.use(Toast)
    }else {
        window.vueFace=vueFace;
    }
})()