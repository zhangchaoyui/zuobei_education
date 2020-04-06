<template>
  <div class="button">
    <button class="type" v-on:click="$emit('submit')" v-if="btnType==1">{{sureText}}</button>
    <button class="positionBtn" v-on:click="$emit('submit')" v-if="btnType==3">{{sureText}}</button>
    <button class="login2" v-on:click="$emit('submit')" v-if="btnType==2">{{sureText}}</button>
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
  margin: 0.3rem auto 0.1rem;
  .type {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.34rem;
    background: #f5bb0e;
    margin: 1rem auto 0;
  }
  .positionBtn {
    width: 90%;
    height: 1rem;
    border: none;
    border-radius: 0.5rem;
    background: #f5bb0e;
    color: #fff;
    font-size: 0.34rem;
    position: fixed;
    bottom: 0.17rem;
    left: 5%;
  }
  .login2 {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.34rem;
    width: 6rem;
    height: 0.95rem;
    margin: 0rem auto 0;
    background: #fa8100;
  }
}
</style>