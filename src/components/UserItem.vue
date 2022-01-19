<template>
  <div class="user-item-warp">
    <div class="user-avatar-warp">
      <img :src="user.avatarUrl" alt="" class="avatar-img">
    </div>
    <div class="user-info-warp">
      <div class="user-name-warp">
        <div class="user-name-text">{{user.name}}</div>
        <div class="message-time">
          <slot name="time"></slot>
        </div>
      </div>
      <div class="latest-message">
        <div class="latest-message-text">
          <UiEmojiText :text="message.content"  v-if="message.type==='text'"></UiEmojiText>
          <template v-if="message.type==='image'">
            <span class="iconfont icon-img"></span>
          </template>
        </div>
        <div class="unread-num" v-if="num!==0">{{num>99?'99+':num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import UiEmojiText from './UiEmojiText';
  export default {
    name: "user-item",
    components:{UiEmojiText},
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
      message:{
        type:Object,
        default(){
          return {
            type:"text",
            content:""
          }
        }
      }
    }
  }
</script>

<style scoped>
  .user-item-warp{
    width: 100%;
    padding: 6px 10px;
    box-sizing: border-box;
  }
  .user-item-warp:after{
    display: table;
    content: '';
    clear: both;
  }
  .user-avatar-warp{
    width: 40px;
    height: 40px;
    position: relative;
    float: left;
  }
  .user-avatar-warp img.avatar-img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .user-info-warp{
    margin-left: 45px;
    position: relative;
  }
  .user-name-warp,
  .latest-message{
    line-height: 20px;
    height: 20px;
    position: relative;
  }
  .user-name-text{
    font-size: 14px;
    color: #333333;
    height: 20px;
    margin-right: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .latest-message-text div{
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .latest-message-text{
    font-size: 12px;
    color: #606266;
    height: 20px;
    margin-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .unread-num{
    position: absolute;
    right: 0;
    border-radius: 10px;
    font-size: 12px;
    color: #f2f2f2;
    background-color: #e64b15;
    top: 2px;
    min-width: 12px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    padding: 0 3px;
  }
  .message-time{
    font-size: 12px;
    color: #606266;
    position: absolute;
    height: 20px;
    line-height: 20px;
    right: 0;
    top: 0;
  }
  .latest-message-text>>> .emoji-img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    line-height: 20px;
    position: relative;
    top: -1px;
  }
</style>
