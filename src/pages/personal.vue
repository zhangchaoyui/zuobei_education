<template>
  <div class="personal">
    <div class="img">
      <img src="/images/user.jpg" />
      点击修改头像
      <input type="file" capture="camera" @click="fileClick()" id="upload_file" />
    </div>
    <div class="br"></div>
    <div class="info">
      <div class="name">
        <span>用户名</span>
        <span>蜡笔小新</span>
      </div>
      <div class="name">
        <span>手机号</span>
        <span>188xxxx8888</span>
      </div>
      <div class="name">
        <span>个人介绍</span>
        <span>
          源自英国Iittle inventors小小发明家
          挖掘儿童创造力脑洞大开
        </span>
      </div>
    </div>
    <Btn btnType="1" sureText="保存"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";

export default {
  name: "personal",
  data() {
    return {};
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
.personal {
  width: 100%;
  margin: 0.1rem auto 0;
  height: auto;
  .img {
    width: 1.8rem;
    height: auto;
    position: relative;
    margin: 0 auto;
    display: block;
    padding: 0.55rem 0 0.35rem;
    text-align: center;
    font-size: 0.25rem;
    line-height: 0.5rem;
    color: #999999;
    img {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 1rem;
      overflow: hidden;
    }
    input {
      width: 2.09rem;
      height: 2.09rem;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
  .br {
    width: 100%;
    height: 0.18rem;
    background: #f6f6f6;
  }
  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    font-size: 0.28rem;
    .name {
      width: 90%;
      line-height: 0.5rem;
      margin: 0 auto;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.3rem 0;
      &:first-child {
        padding-top: 1rem;
      }
      &:last-child {
        padding-bottom: 0.5rem;
      }
      span {
        &:first-child {
          width: 18%;
          text-align: left;
        }
        &:last-child {
          width: 78%;
          margin-left: 2%;
          text-align: left;
          color: #999999;
        }
      }
    }
  }
}
</style>
