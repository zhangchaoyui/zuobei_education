<template>
  <div class="login">
    <div class="container">
      <div class="page">
        <img src="../../public/images/logo.png" alt class="logo" />
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
            <input type="password" placeholder="请输入密码" v-model="password" @blur="blurIn" />
          </div>
        </div>
        <Btn btnType="2" sureText="登录" v-on:submit="login"></Btn>
        <div class="user_operation">
          <div @click="bind">注册</div>
          <div @click="forget">忘记密码</div>
        </div>
        <div class="wx_chat" @click="bind">
          <img src="../../public/images/icon20.png" alt />
          <div>首次登录绑定微信</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
import util from "../util/util";
import stroage from "../stroage/index";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      password: "",
      code: ""
    };
  },
  mounted() {
    if (util.GetQueryString("code")) {
      this.getOpenId();
    }
  },
  methods: {
    blurIn() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },

    //登录
    login() {
      let { phone, password } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "" || !myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (password == "") {
        util.toast("请输入密码！");
        return;
      }
      util.Indicator("加载中");
      setTimeout(() => {
        this.http
          .post("/login/login", {
            token: this.$cookie.get("token"),
            phone,
            password
          })
          .then(res => {
            if (res) {
              util.toast("登录成功~");
              this.$cookie.set("token", res.token, { expires: "3D" });
              stroage.setItem("status", 1);
              this.$cookie.set("user_type", res.user_type, { expires: "3D" });
              setTimeout(() => {
                if (this.$cookie.get("w_id")) {
                  window.location.replace(
                    `/#/worksdetail/${this.$cookie.get("w_id")}`
                  );
                } else {
                  window.location.replace("/");
                }
              }, 2000);
            }
          });
      }, 800);
    },

    //微信授权
    bind() {
      const appid = "wx4522fb49b27981d6";
      const code = util.GetQueryString("code"); // 截取路径
      if (code == null || code === "") {
        const local = `http://zuobei.400539.com/#/login/-1`;
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appid +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
      } else {
        this.code = code;
      }
    },

    //获取用户信息
    getOpenId() {
      this.http
        .post("/login/getToken", {
          code: util.GetQueryString("code"),
          token: this.$cookie.get("token")
        })
        .then(res => {
          console.log(res, 333);
          if (res) {
            if (res.user_type != undefined) {
              util.toast("登录成功~");
              setTimeout(() => {
                this.$cookie.set("token", res.token, { expires: "Session" });
                this.$cookie.set("user_type", res.user_type, { expires: "3D" });
                stroage.setItem("status", 1);
                if (this.$cookie.get("w_id")) {
                  window.location.replace(
                    `/#/worksdetail/${this.$cookie.get("w_id")}`
                  );
                } else {
                  window.location.replace("/");
                }
              }, 1800);
            } else {
              this.$cookie.set("token", res, { expires: "Session" });
              this.$router.push("/register");
            }
          }
        });
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
  background: url("../../public/images/background10.png") repeat-y;
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
        height: 14vh;
        margin: 10vh auto 0.63rem;
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
        margin: 6vh auto 0;
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