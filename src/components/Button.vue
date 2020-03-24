<template>
  <div class="button">
    <button class="type" v-on:click="$emit('submit')" v-if="btnType==1">{{sureText}}</button>
    <button class="positionBtn" v-on:click="$emit('submit')" v-if="btnType==3">{{sureText}}</button>
    <button class="login" v-on:click="$emit('submit')" v-if="btnType==2">登录</button>
  </div>
</template>
<script>
export default {
  props: {
    //按钮类型
    btnType: String,
    //按钮文本
    sureText: String
  }
};
</script>
<style lang='scss'>
.button {
  width: 6rem;
  height: 0.95rem;
  margin: 1rem auto 0;
  button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.34rem;
  }
  .type {
    background: #f5bb0e;
  }
  .positionBtn {
    position: fixed;
    bottom: 0.17rem;
  }
  .login {
    background: #fa8100;
  }
}
</style>