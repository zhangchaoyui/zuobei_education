<template>
  <div class="forget">
    <div class="container">
      <div class="page">
        <img src="../../public/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input type="text" placeholder="请输入手机号码" v-model="phone" @blur="blurIn" />
          </div>
          <div class="phone">
            <input type="text" placeholder="请输入验证码" v-model="code" @blur="blurIn" />
            <button @click="codeTime" v-if="timeStatus==1">获取验证码</button>
            <button v-if="timeStatus==0" style="color:#EFEFEF">获取验证码{{time}}</button>
          </div>
          <div class="phone">
            <input type="text" placeholder="请输入新密码" v-model="password" @blur="blurIn" />
          </div>
        </div>
        <Btn btnType="2" sureText="重置密码" v-on:submit="forget"></Btn>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "forget",
  data() {
    return {
      phone: "",
      password: "",
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
    //重置密码
    forget() {
      let { phone, password, code } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "" || !myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (code == "") {
        util.toast("请验证码！");
        return;
      } else if (password == "") {
        util.toast("请输入新密码！");
        return;
      }
      util.Indicator("加载中");
      this.http
        .post("/login/reset", {
          phone,
          code,
          password
        })
        .then(res => {
          if (res) {
            util.toast("重置密码成功~");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        });
    },

    //验证码倒计时
    codeTime() {
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (this.phone == "" || !myreg.test(this.phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      }
      this.http.post("/Sms/index", { phone: this.phone }).then(() => {
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
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.forget {
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