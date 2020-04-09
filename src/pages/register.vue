<template>
  <div class="register">
    <div class="type" v-if="page==1">
      <p>请选择您的身份？</p>
      <p class="lastp">帮助我们更好地为您提供服务</p>
      <div class="img">
        <div class="children" @click="type(1)">
          <img src="/images/2.png" alt />
          <p>孩子</p>
        </div>
        <div class="teacher" @click="type(2)">
          <img src="/images/1.png" alt />
          <p>老师</p>
        </div>
      </div>
    </div>
    <div class="container" v-if="page==2">
      <div class="page">
        <img src="/images/logo.png" alt class="logo" />
        <div class="input">
          <div class="phone">
            +86
            <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone" />
          </div>
          <div class="phone">
            <input type="number" placeholder="请输入验证码" maxlength="4" v-model="code" />
            <button @click="codeTime()" v-if="timeStatus==1">获取{{time}}</button>
            <button v-if="timeStatus==0">获取{{time}}</button>
          </div>
          <div class="phone">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
        </div>
        <Btn btnType="2" sureText="注册" v-on:submit="register"></Btn>
      </div>
    </div>
  </div>
</template>
 
 <script>
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "register",
  data() {
    return {
      page: 1,
      phone: "",
      password: "",
      code: "",
      time: 60,
      timeStatus: 1
    };
  },
  mounted() {},
  methods: {
    //注册
    register() {
      let { phone, password, code } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "" || !myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (code == "") {
        util.toast("请验证码！");
        return;
      } else if (password == "") {
        util.toast("请输入密码！");
        return;
      }
      util.Indicator("加载中");
      this.http
        .post("/login/reg", {
          phone,
          code,
          password
        })
        .then(() => {
          util.toast("注册成功~");
          setTimeout(() => {
            window.location.href = "http://zuobei.niu5.cc/#/login";
          }, 2000);
        });
    },

    //验证码倒计时
    codeTime() {
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
    },

    //身份选择
    type(e) {
      this.page = 2;
       this.http.post("/login/iden", {
          tid: e,
        })
        .then(() => {
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
.register {
  width: 100%;
  min-height: 100vh;
  background: url("/images/background10.png") repeat-y;
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
          width: 70%;
          height: 100%;
          border: none;
          font-size: 0.3rem;
          padding-left: 3%;
          box-sizing: border-box;
        }
        button {
          width: 20%;
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