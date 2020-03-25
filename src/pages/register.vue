<template>
  <div class="register">
    <div class="container">
      <div class="page">
        <img src="/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input type="text" placeholder="请输入手机号码" />
          </div>
          <div class="phone">
            <input type="text" placeholder="请输入验证码" />
            <button>获取60</button>
          </div>
          <div class="phone">
            <input type="text" placeholder="请输入密码" />
          </div>
        </div>
        <Btn btnType="2" sureText="注册"></Btn>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
export default {
  name: "register",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    Btn
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.register {
  width: 100%;
  min-height: 100vh;
  background: url("/images/background10.png") repeat-y;
  background-size: 100% 150%;
  display: flex;
  flex-direction: row;
  .container {
    width: 90%;
    .page {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      .logo {
        width: 2.75rem;
        height: 1.85rem;
        margin: 1.67rem auto 0.63rem;
      }
      .phone {
        width: 5.8rem;
        height: 0.95rem;
        line-height: 0.95rem;
        font-size: 0.30rem;
        padding-left: 3%;
        margin: 0.34rem auto 0.4rem;
        background: #fff;
        border-radius: 0.5rem;
        overflow: hidden;
        input {
          width: 70%;
          height: 100%;
          border: none;
          font-size: 0.30rem;
          padding-left: 3%;
          box-sizing: border-box;
        }
        button {
          width: 20%;
          height: 100%;
          font-size: 0.30rem;
          color: #555555;
          text-align: center;
          background: #fff;
          border: none;
        }
      }
      .user_operation {
        width: 5.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: #888888;
        margin: 0.4rem auto;
      }
      .wx_chat {
        display: flex;
        flex-direction: column;
        margin: 0.93rem auto 0;
        img {
          display: block;
          margin: 0 auto;
          width: 0.85rem;
          height: 0.85rem;
        }
        div {
          margin-top: 0.2rem;
          color: #888888;
          font-size: 0.26rem;
          line-height: 0.26rem;
        }
      }
    }
  }
}
</style>