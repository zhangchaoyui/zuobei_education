<template>
  <div class="register">
    <div class="container">
      <div class="page">
        <img src="../../public/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input
              type="text"
              placeholder="请输入手机号码"
              maxlength="11"
              v-model="phone"
              @blur="blurIn"
            />
          </div>
          <div class="phone">
            <input type="number" placeholder="请输入验证码" maxlength="4" v-model="code" @blur="blurIn" />
            <button @click="codeTime()" v-if="timeStatus==1">获取验证码</button>
            <button v-if="timeStatus==0" style="color:#EFEFEF">获取验证码{{time}}</button>
          </div>
          <!-- <div class="phone">
            <input type="password" placeholder="请输入密码" v-model="password" @blur="blurIn" />
          </div>-->
        </div>
        <Btn btnType="2" sureText="绑定手机号" v-on:submit="register"></Btn>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
import util from "../util/util";
import stroage from "../stroage/index";
export default {
  name: "register",
  data() {
    return {
      phone: "",
      code: "",
      time: 60,
      timeStatus: 1
    };
  },
  mounted() {},
  methods: {
    blurIn() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },

    //绑定手机
    register() {
      let { phone, password, code } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "") {
        util.toast("请输入手机号码！");
        return;
      } else if (!myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (code == "") {
        util.toast("请验证码！");
        return;
      }
      util.Indicator("加载中");
      this.http
        .post("/login/reg", {
          token: this.$cookie.get("token"),
          phone,
          code
        })
        .then(res => {
          if (res) {
            util.toast("绑定成功~");
            setTimeout(() => {
              this.$cookie.set("token", res.token, { expires: "7D" });
              this.$cookie.set("user_type", res.user_type, { expires: "7D" });
              this.$cookie.set("phone", phone, { expires: "7D" });
              stroage.setItem("status", 1);
              if (this.$cookie.get("w_id")) {
                window.location.replace(
                  `/#/workLists/${this.$cookie.get("w_id")}`
                );
              } else {
                window.location.replace(`/#/`);
              }
            }, 2000);
          }
        });
    },

    //验证码倒计时
    codeTime() {
      let { phone } = this;
      var myreg = /^1[1-9][0-9]{9}$/;
      if (phone == "") {
        util.toast("请输入手机号码！");
        return;
      } else if (!myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else {
        this.http
          .post("/Sms/index", {
            phone,
            token: this.$cookie.get("token")
          })
          .then(() => {
            util.toast("验证码发送成功~");
            this.timeStatus = 0;
            let { time } = this,
              a;
            a = setInterval(() => {
              if (time == 0) {
                this.timeStatus = 1;
                this.time = 60;
                clearInterval(a);
              } else {
                --time;
                this.time = time;
              }
            }, 1000);
          });
      }
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
.register {
  width: 100%;
  min-height: 100vh;
  background: url("../../public/images/background10.png") repeat-y;
  background-size: 100% 150%;
  display: flex;
  flex-direction: row;
  .type {
    width: 90%;
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
        font-size: 0.3rem;
        padding-left: 3%;
        margin: 0.34rem auto 0.4rem;
        background: #fff;
        border-radius: 0.5rem;
        overflow: hidden;
        input {
          width: 60%;
          height: 100%;
          border: none;
          font-size: 0.3rem;
          padding-left: 3%;
          box-sizing: border-box;
        }
        button {
          width: 40%;
          height: 100%;
          font-size: 0.3rem;
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