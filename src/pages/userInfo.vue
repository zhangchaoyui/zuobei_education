<template>
  <div class="userinfo">
    <div class="container">
      <div class="header">
        <img src="/images/logo.png" alt />
      </div>
      <div class="functionList">
        <div class="function">
          <img class="icon" src="/images/icon21.png" />
          <input type="text" placeholder="发明家的姓名" v-model="name" />
        </div>
        <div class="function">
          <img class="icon" src="/images/icon26.png" />
          <input type="text" placeholder="发明家的性别" v-model="sex" />
        </div>
        <div class="function">
          <img class="icon" src="/images/icon16.png" />
          <input type="text" placeholder="发明家的手机号码" v-model="phone" />
        </div>
        <div class="function">
          <img class="icon" src="/images/icon8.png" />
          <input type="text" placeholder="发明家的生日" v-model="birthday" />
        </div>
        <div class="function">
          <img class="icon" src="/images/address.png" />
          <input type="text" placeholder="邮寄发明材料的地址" v-model="address" />
        </div>
      </div>
      <v-distpicker type="mobile"></v-distpicker>
      <Btn btnType="1" sureText="保存" v-on:submit="preservation"></Btn>
    </div>
  </div>
</template>

 <script>
 import VDistpicker from 'v-distpicker'
import Btn from "../components/Button";
export default {
  name: "userinfo",
  data() {
    return {
      name: "", //名称
      sex: "", //性别
      phone: "", //手机
      birthday: "", //生日
      address: "" //地址
    };
  },
  mounted() {},
  methods: {
    //保存
    preservation() {
      let {
        name, //名称
        sex, //性别
        phone, //手机
        birthday, //生日
        address
      } = this;
      this.axios
        .post("/", {
          name,
          sex,
          phone,
          birthday,
          address
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  components: {
    Btn,
    VDistpicker
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.userinfo {
  width: 100%;
  display: inline-block;
  min-height: 100vh;
  background: #f5f5f5;
  .container {
    width: 96%;
    margin: 0.1rem auto 0;
    min-height: 98vh;
    border-radius: 0.1rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    .header {
      width: 2.712rem;
      height: 1.83rem;
      margin: 0.73rem auto 0.35rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .functionList {
      width: 90%;
      margin: 0rem auto 0;
      background: #fff;
      border-radius: 0.2rem;
      display: flex;
      flex-direction: column;
      padding: 0.36rem 0;
      .function {
        width: 90%;
        margin: 0 auto;
        height: 0.76rem;
        line-height: 0.76rem;
        font-size: 0.26rem;
        border-bottom: 0.002rem solid #ebebed;
        padding: 0.1rem 0;
        display: flex;
        .icon {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          margin: 0.14rem 0.2rem 0 0.34rem;
          vertical-align: middle;
        }
        input {
          border: none;
        }
        button {
          border: none;
        }
      }
    }
  }
}
</style>