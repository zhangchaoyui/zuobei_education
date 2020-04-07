<template>
  <div class="login">
    <div class="container">
      <div class="page">
        <img src="/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input
              type="number"
              placeholder="请输入手机号码"
              pattern="regexp_pattern"
              maxlength="11"
              v-model="phone"
            />
          </div>
          <div class="phone">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
        </div>
        <Btn btnType="2" sureText="登录" v-on:submit="login"></Btn>
        <div class="user_operation">
          <div @click="register">注册</div>
          <div @click="forget">忘记密码</div>
        </div>
        <div class="wx_chat" @click="bind">
          <img src="/images/icon20.png" alt />
          <div>首次登录绑定微信</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    //登录
    login() {
      let { phone, password } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "" || !myreg.test(phone)) {
        Toast({
          message: "请输入正确的手机号码！",
          position: "bottom",
          duration: 2000
        });
        return;
      } else if (password == "") {
        Toast({
          message: "请输入密码！",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });

      this.http
        .post("login/login", {
          phone,
          password
        })
        .then(res => {
          console.log(res);
          Toast({
            message: "登陆成功~",
            position: "middle",
            duration: 1900
          });
          this.$cookie.set("userId", res.id, { expires: "Session" });
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        });
    },

    //绑定微信
    bind() {
      //appID
      let appID = `wx4522fb49b27981d6`;
      //appsecret
      let appSerect = `015257afd30d4d7b1f4c304f0126982c`;
      //点击授权后重定向url地址
      let redirectUrl = `/login`;
      let host = `http://192.168.2.104:8080`;
      //微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
      let authorizeUrl =
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
        `${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      this.authorizeUrl = authorizeUrl;
    },

    //注册
    register() {
      this.$router.push("/register");
    },

    //忘记密码
    forget() {
      this.$router.push("/forget");
    }
  },
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