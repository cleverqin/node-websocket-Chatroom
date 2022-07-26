<template>
  <div class="session-panel-warp iChat-session-warp">
    <div class="iChat-session-header">
      <span class="iconfont icon-left" @click="back"></span>
      <div class="session-info-warp">
        <img :src="session.avatarUrl" alt="" class="session-avatar">
        <span class="session-info-name">{{session.name}}</span>
        <span class="user-num" v-if="session.type==='group'">
          <slot name="num"></slot>
        </span>
        <span class="iconfont" v-if="session.deviceType" :class="{'icon-phone':session.deviceType==='phone','icon-pc':session.deviceType==='pc'}"></span>
        <span class="ip-text" v-if="session.ip">({{session.ip}})</span>
      </div>
    </div>
    <div class="iChat-session-container" :class="{'with-panel':isShowTool||isShowExpression}">
      <slot></slot>
    </div>
    <div class="iChat-session-footer">
      <div class="iChat-message-form" :class="{'focus-form':text!==''||isFocus}">
        <div class="iChat-send-warp">
          <button class="iChat-send-btn" v-show="text!==''||isFocus" @click="sendText(text)">发送</button>
          <span class="iconfont icon-plus-o" v-show="text===''&&!isFocus" @click.stop="toggleTool"></span>
        </div>
        <div class="iChat-expression-btn" @click.stop="toggleExpression">
          <span class="iconfont icon-expression"></span>
        </div>
        <div class="iChat-input-warp">
          <input type="text" @focus="isFocus=true" @keypress.enter="sendText(text)" @focusout="isFocus=false" class="iChat-message-input" v-model="text">
        </div>
      </div>
      <div class="iChat-expression-panel scroll" v-show="isShowExpression">
        <ul class="expression-list">
          <li v-for="item in expressions" :key="item.title" @click.stop="pickerExpression(item)">
            <img :src="baseUrl+item.url" alt="">
          </li>
        </ul>
      </div>
      <div class="iChat-tool-panel scroll" v-show="isShowTool">
        <ul class="iChat-tool-list">
          <li>
            <label class="iChat-tool-item">
              <span class="iconfont icon-img"></span>
              <input type="file" accept="image/png, image/jpg, image/jpeg" @change="fileChange">
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {expressions} from './emoji';
  import AlterMessage from "./Message";
  import {EMOJI_BASE_URL} from "./config";
  export default {
    name: "SessionPanel",
    props:{
      session:{
        type:Object,
        default(){
          return {
            id:"a000000",
            name:"聊天室",
            avatarUrl:"static/img/avatar/group-icon.png",
            type: "user",
            deviceType:"pc",
            ip:"10.24.222.110"
          }
        }
      }
    },
    data(){
      return {
        text:"",
        isFocus:false,
        isShowTool:false,
        isShowExpression:false,
        expressions,
        baseUrl:EMOJI_BASE_URL
      }
    },
    methods:{
      pickerExpression(item){
        this.text+=item.title;
      },
      toggleExpression(){
        let _this=this;
        function hideExpression() {
          _this.isShowExpression=false;
        }
        if(this.isShowExpression){
          document.removeEventListener('click',hideExpression)
        }else {
          document.addEventListener('click',hideExpression)
        }
        this.isShowExpression =!this.isShowExpression;
        this.isShowTool=false;
      },
      toggleTool(){
        let _this=this;
        function hideTool() {
          _this.isShowTool=false;
        }
        if(this.isShowTool){
          document.removeEventListener('click',hideTool)
        }else {
          document.addEventListener('click',hideTool)
        }
        this.isShowTool =!this.isShowTool;
        this.isShowExpression=false;
      },
      fileChange(e){
        const reg = /\.(?:png|jpg|jepg)$/i;
        let file=e.target.files[0];
        if(!reg.test(file.name)){
          AlterMessage.warning("请选择正确格式的图片文件!");
          return
        }
        let maxSize=1*1024*1024;
        if(file.size>maxSize){
          AlterMessage.warning("图片大小不能超过1M!");
          return
        }
        let reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend =()=> {
          let html=reader.result;
          this.sendMessage(html,'image')
        };
      },
      sendMessage(html,type){
        this.$emit("sendMessage",html,type,this.session)
      },
      sendText(text){
        text=text.replace(/^\s+|\s+$/g,'');
        if(text){
          this.sendMessage(text,'text');
        }
        setTimeout(()=>{
          this.text='';
        },0)
      },
      back(){
        this.$emit("back")
      }
    }
  }
</script>

<style scoped>
  .iChat-session-warp{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    left: 0;
    top: 0;
    background-color: #ffffff;
  }
  .iChat-session-header{
    padding: 10px;
    position: relative;
    background-color: #3a8ee6;
    color: #f2f2f2;
  }
  .iChat-session-header .icon-left{
    position: absolute;
    line-height: 30px;
    height: 30px;
    font-size: 18px;
    width: 30px;
    text-align: center;
    vertical-align: middle;
  }
  .session-info-warp{
    line-height: 30px;
    height: 30px;
    text-align: center;
  }
  .session-avatar{
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    border: none;
    margin: 0;
    line-height: 30px;
  }
  .session-info-name{
    font-size: 14px;
    margin-left: 5px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .user-num,.ip-text{
    line-height: 30px;
    font-size: 12px;
    vertical-align: middle;
    margin-left: 5px;
  }
  .session-info-warp .iconfont{
    font-size: 18px;
    line-height: 30px;
    vertical-align: middle;
  }
  .session-info-warp .icon-phone{
    color: #e6ca03;
  }
  .session-info-warp .icon-pc{
    color: #e66f6a;
  }
  .iChat-session-footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .iChat-message-form{
    padding: 10px;
    border-top: 1px solid #d1d1d1;
  }
  .iChat-message-form:after,
  .expression-list:after,
  .iChat-tool-panel:after{
    display: block;
    clear: both;
    content: '';
  }
  .iChat-expression-btn{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 30px;
    text-align: center;
  }
  .iChat-expression-btn .iconfont,
  .iChat-send-warp .iconfont{
    line-height: 40px;
    font-size: 30px;
    color: #7d8085;
    vertical-align: middle;
  }
  .iChat-send-warp{
    float: right;
  }
  .iChat-input-warp{
    margin-left: 45px;
    margin-right: 45px;
    padding: 5px 0;
    transition: all .2s;
  }
  .iChat-input-warp .iChat-message-input{
    display: block;
    box-sizing: border-box;
    line-height: 30px;
    font-size: 14px;
    color: #7d8085;
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    border-bottom: 1px solid #d1d1d1;
  }
  .iChat-message-input:focus{
    border-bottom: 1px solid #67c23a;
  }
  .iChat-send-warp{
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
    transition: all .2s;
  }
  .focus-form .iChat-send-warp{
    width: 50px;
  }
  .focus-form .iChat-input-warp{
    margin-right: 60px;
  }
  .iChat-send-btn{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: #67c23a;
    border-radius: 4px;
    border: none;
    outline: none;
    color: #f2f2f2;
    vertical-align: middle;
  }
  .iChat-expression-panel,
  .iChat-tool-list{
    height: 200px;
    overflow-y: auto;
  }
  .iChat-tool-panel{

  }
  .expression-list {
    list-style: none;
    padding: 0 5px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .expression-list li{
    width: 30px;
    height: 30px;
    padding: 5px;
  }
  .expression-list li img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .iChat-tool-list{
    list-style: none;
    padding: 0 5px;
    margin: 0;
  }
  .iChat-tool-list li{
    padding: 10px;
  }
  .iChat-tool-item{
    display: block;
    width: 50px;
    height: 50px;
    background-color: #f2f2f2;
    border-radius: 4px;
    line-height: 50px;
    text-align: center;
    vertical-align: middle;
  }
  .iChat-tool-item .iconfont{
    font-size: 25px;
    color: #606266;
  }
  .iChat-tool-item input[type='file']{
    display: none;
  }
  .iChat-session-container{
    width: 100%;
    height: calc(100% - 112px);
    background-color: #eeeeee;
  }
  .iChat-session-container.with-panel{
    height: calc(100% - 312px);
  }
</style>
