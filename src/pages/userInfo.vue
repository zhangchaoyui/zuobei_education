<template>
  <div class="userinfo">
    <div class="container">
      <div class="header">
        <img src="../../public/images/logo.png" alt />
      </div>
      <div class="functionList">
        <div class="function">
          <img class="icon" src="../../public/images/icon21.png" />
          <input type="text" placeholder="发明家的姓名" v-model="name" @blur="blurIn" />
        </div>
        <div class="function">
          <img class="icon" src="../../public/images/icon26.png" />
          <input type="text" placeholder="发明家的性别" v-model="sex" @blur="blurIn" />
        </div>
        <div class="function">
          <img class="icon" src="../../public/images/icon16.png" />
          <input type="text" placeholder="发明家的手机号码" maxlength='11' v-model="phone" @blur="blurIn" />
        </div>
        <div class="function">
          <img class="icon" src="../../public/images/icon8.png" />
          <input type="text" placeholder="发明家的生日" v-model="birthday" @blur="blurIn" />
        </div>
        <div class="function" @click="choose" v-if="address==''">
          <img class="icon" src="../../public/images/address.png" />
          邮寄发明材料的地址
        </div>
        <div class="function" @click="choose" v-else style="color:black">
          <img class="icon" src="../../public/images/address.png" />
          {{address}}
        </div>
        <!--省市区三级联动-->
        <div class="divwrap" v-if="show">
          <v-distpicker
            type="mobile"
            @province="onChangeProvince1"
            @city="onChangeCity"
            @area="onChangeArea"
          ></v-distpicker>
        </div>
        <!--遮罩层-->
        <div class="blacks" v-if="show" @click="countermand"></div>
      </div>
      <Btn btnType="1" sureText="保存" v-on:submit="preservation"></Btn>
    </div>
  </div>
</template>

 <script>
import VDistpicker from "v-distpicker";
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "userinfo",
  data() {
    return {
      name: "", //名称
      sex: "", //性别
      phone: "", //手机
      birthday: "", //生日
      address: "", //地址
      show: false,
      //省市区
      province: "",
      city: "",
      area: ""
    };
  },
  mounted() {
    this.http
      .post("/login/userinfo", {
        token: this.$cookie.get("token")
      })
      .then(res => {
        this.address = res.adress || "邮寄发明材料的地址";
        this.name = res.name;
        this.birthday = res.birth;
        if (!res.sex) {
          res.sex = "男";
        } else {
          res.sex = "女";
        }
        this.sex = res.sex;
        this.phone = res.mobile;
      });
  },

  methods: {
    //ios上拉回弹
    blurIn() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },
    //保存
    preservation() {
      let {
        name, //名称
        sex, //性别
        phone, //手机
        birthday, //生日
        address
      } = this;
      if (name == "" || sex == "" || birthday == "") {
        util.toast("请完善小朋友信息~");
        return;
      } else if (address == "") {
        util.toast("请完善邮寄地址信息~");
        return;
      }
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (phone == "") {
        util.toast("请完善正确的手机号~");
        return;
      } else if (phone == "" || !myreg.test(phone)) {
        util.toast("请输入正确的手机号码！");
        return;
      }
      this.axios
        .post("/login/vali", {
          name,
          sex,
          phone,
          birthday,
          address,
          token: this.$cookie.get("token")
        })
        .then(() => {
          util.toast("添加信息成功~");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        });
    },

    //取消选择地区
    countermand: function() {
      this.show = false;
    },
    //打开选择地区
    choose: function() {
      this.show = true;
    },
    onChangeProvince1: function(a) {
      this.province = a.value;
      if (a.value == "台湾省") {
        this.show = false;
      }
    },
    onChangeCity: function(a) {
      this.city = a.value;
    },
    onChangeArea: function(a) {
      this.area = a.value;
      this.show = false;
      this.address = this.province + this.city + this.area;
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
        color: #757575;
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
  /*遮罩层*/
  .blacks {
    position: fixed;
    width: 100%;
    height: 50%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.45);
  }
  /*省市区三级联动*/
  .divwrap {
    height: 50%;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    font-size: 0.24rem;
  }

  /*外部*/
  .divwrap .distpicker-address-wrapper {
    color: #0d0d0d;
    height: 100%;
  }

  /*头部*/
  .divwrap .address-header {
    background: #f5bb0e;
    color: #fff;
    width: 100%;
    position: fixed;
    bottom: 50%;
    font-size: 0.3rem;
  }

  /*头部内容*/
  .divwrap .address-header ul li {
    flex-grow: 1;
    text-align: center;
  }

  /*选择过省市区的头部*/
  .divwrap .address-header .active {
    color: #fff;
    border-bottom: 0.05rem solid #fff;
  }

  /*内容部分*/
  .divwrap .address-container {
    overflow: scroll;
    height: 100%;
  }
  /*内容部分*/
  .divwrap .address-container li {
    padding: 10px 10px;
  }

  /*点过的地区内容*/
  .divwrap .address-container .active {
    color: red;
  }
}
</style>