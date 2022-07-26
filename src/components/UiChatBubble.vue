<template>
  <div class="chat-bubble-warp"
       :class="{
        'chat-bubble-send':isSend,
        'chat-bubble-receive':!isSend
       }"
  >
    <div class="chat-bubble-avatar">
      <img :src="message.from.avatarUrl" alt="">
    </div>
    <div class="chat-bubble-container">
      <div class="chat-bubble-infoWarp" v-if="setting.isName">
        <span class="chat-bubble-time" v-if="setting.isTime&&isSend" slot="time">{{message.time | friendlyTime}}</span>
        <span class="chat-bubble-name">{{message.from.name}}</span>
        <span class="chat-bubble-time" v-if="setting.isTime&&!isSend" slot="time">{{message.time | friendlyTime}}</span>
      </div>
      <div class="chat-bubble-content">
        <div slot="content">
          <UiEmojiText :text="message.content" v-if="message.type==='text'"></UiEmojiText>
          <div v-if="message.type==='image'">
            <template v-if="message.content==='【图片】'">
              {{message.content}}
            </template>
            <img :src="message.content" alt="图片" v-else>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UiEmojiText from "./UiEmojiText";
  import {formatTime,friendlyTime} from "./filters";
  export default {
    name: "UiChatBubble",
    components:{
      UiEmojiText,
    },
    filters:{
      friendlyTime,
      formatTime
    },
    props:{
      isSend:{
        type:Boolean,
        default:false
      },
      setting:{
        type: Object,
        default(){
          return {
            isName:true,
            isTime:true
          }
        }
      },
      message:{
        type:Object,
        default() {
          return {
            from:{
              name:"似水流年",
              avatarUrl:"http://himg.bdimg.com/sys/portrait/item/90193135323338383137313237bc13.jpg"
            },
            content:"这是一条[微笑]测试信息1112222222[气球]2222222",
            time:new Date().getTime(),
            type:"text"
          };
        }
      }
    }
  }
</script>

<style scoped>
  .chat-bubble-warp{
    position: relative;
  }
  .chat-bubble-warp:after{
    display: table;
    content: '';
    clear: both;
  }
  .chat-bubble-avatar,
  .chat-bubble-avatar img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }
  .chat-bubble-send .chat-bubble-avatar{
    float: right;
  }
  .chat-bubble-send .chat-bubble-infoWarp,
  .chat-bubble-send .chat-bubble-container{
    text-align: right;
  }
  .chat-bubble-send .chat-bubble-container .chat-bubble-content{
    text-align: left;
  }
  .chat-bubble-receive .chat-bubble-avatar{
    float: left;
  }
  .chat-bubble-container{
    position: relative;
    margin-left: 50px;
    margin-right: 50px;
  }
  .chat-bubble-infoWarp .chat-bubble-name{
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
  .chat-bubble-infoWarp .chat-bubble-time{
    font-size: 12px;
    color: #666666;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .chat-bubble-content{
    display: inline-block;
    min-height: 20px;
    padding: 10px;
    border-radius: 4px;
    max-width: 100%;
    line-height: 20px;
    vertical-align: middle;
    color: #666666;
    font-size: 14px;
    word-break: break-word;
    position: relative;
  }
  .chat-bubble-receive .chat-bubble-content:before,
  .chat-bubble-send .chat-bubble-content:after{
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    top: 20px;
    margin-top: -5px;
  }
  .chat-bubble-receive .chat-bubble-content:before{
    right: 100%;
    border-right: 5px solid #dae1ff;
  }
  .chat-bubble-receive .chat-bubble-content{
    background-color: #dae1ff;
  }
  .chat-bubble-send .chat-bubble-content:after{
    left: 100%;
    border-left: 5px solid #aae97e;
  }
  .chat-bubble-send .chat-bubble-content{
    background-color: #aae97e;
  }
  .chat-bubble-content/deep/ img{
    max-width: 100%;
  }
  .chat-bubble-content/deep/ img.emoji-img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }
</style>
