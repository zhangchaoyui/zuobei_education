<template>
  <div class="login">
    <div class="container">
      <div class="type" v-if="page==1">
        <p>请选择您的身份？</p>
        <p class="lastp">帮助我们更好地为您提供服务</p>
        <div class="img">
          <div class="children">
            <img src="/images/2.png" alt />
            <p>孩子</p>
          </div>
          <div class="teacher">
            <img src="/images/1.png" alt />
            <p>老师</p>
          </div>
        </div>
      </div>
      <div class="page" v-if="page==2">
        <img src="/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input type="text" placeholder="请输入手机号码" />
          </div>
          <div class="phone">
            <input type="password" placeholder="请输入密码" />
          </div>
        </div>
        <Btn btnType="2" sureText="登录"></Btn>
        <div class="user_operation">
          <div>注册</div>
          <div>忘记密码</div>
        </div>
        <div class="wx_chat">
          <img src="/images/icon20.png" alt />
          <div>首次登录绑定微信</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
export default {
  name: "login",
  data() {
    return {
      page: 2
    };
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
.login {
  width: 100%;
  min-height: 100vh;
  background: url("/images/background10.png") repeat-y;
  background-size: 100% 150%;
  display: flex;
  flex-direction: row;
  .container {
    width: 90%;
    .type {
      width: 100%;
      margin: 0 auto;
      p:first-child {
        margin-top: 1.1rem;
        font-size: 0.38rem;
        line-height: 0.6rem;
        color: #ffffff;
      }
      .lastp {
        font-size: 0.24rem;
        line-height: 0.6rem;
        color: #ffffff;
      }
      .img {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 0.68rem;
        overflow: hidden;
        .children,
        .teacher {
          width: 47%;
          height: 3.79rem;
          background: #fff;
          border-radius: 0.5rem;
          overflow: hidden;
          img {
            display: inline-block;
            margin: 0.53rem auto 0rem;
            width: 3.1rem;
            height: 2.49rem;
          }
          p {
            text-align: center;
            font-size: 0.34rem;
            margin-top: -0.2rem;
          }
        }
        .teacher {
          img {
            display: inline-block;
            margin: 0.53rem auto 0rem;
            width: 3.1rem;
            height: 2.49rem;
          }
        }
      }
    }
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
        font-size: 0.38rem;
        padding-left: 3%;
        margin: 0.34rem auto 0.4rem;
        background: #fff;
        border-radius: 0.5rem;
        overflow: hidden;
        input {
          width: 60%;
          height: 100%;
          border: none;
          font-size: 0.34rem;
          padding-left: 3%;
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