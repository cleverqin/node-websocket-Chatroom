<template>
  <label class="switch" :class="{'switch-disabled':disabled}" :style="{'--trueColor':trueColor}">
    <input type="checkbox"
           v-bind:checked="checked"
           v-on:change="$emit('change',$event.target.checked)"
           class="switch-checkbox"
           :disabled="disabled">
    <i></i>
  </label>
</template>
<script>
  export default {
    name: "UiSwitch",
    model:{
      prop: "checked",
      event:"change"
    },
    props:{
      checked:{
        type: Boolean,
        default: false
      },
      disabled:{
        type: Boolean,
        default: false
      },
      trueColor:{
        type: String,
        default: "#1c8de0"
      },
    }
  }
</script>

<style vars="{trueColor}" lang="less" scoped>
  .switch {
    display: inline-block;
    width: 36px;
    height: 20px;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
  }
  .switch > input[type='checkbox'] {
    display: none;
  }
  .switch > input[type='checkbox'] + i {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #dbdbdb;
    transition: background-color .2s;
  }
  .switch > input[type='checkbox'] + i:after {
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    top: 2px;
    left: 2px;
    border-radius: 9px;
    background-color: #ffffff;
    transition: all .2s;
  }
  .switch > input[type='checkbox']:checked + i {
    background-color: var(--trueColor);
  }
  .switch > input[type='checkbox']:checked + i:after {
    left: calc(100% - 18px);
  }
  .switch.switch-disabled i:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 10px;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .switch.switch-disabled{
    cursor: not-allowed;
  }
</style>
