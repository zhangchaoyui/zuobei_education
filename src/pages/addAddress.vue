<template>
  <div class="addAddress">
    <div class="content">
      <mt-field placeholder="收货人" v-model="username"></mt-field>
      <mt-field placeholder="手机号码" maxlength="11" v-model="tel"></mt-field>
      <div class="fu">
        <mt-field placeholder="请选择地址" v-model="city"></mt-field>
        <div class="address" @click="choose">{{city}}</div>
      </div>
      <mt-field placeholder="详细地址：如道路、门牌号、小区、单元等" type="text" v-model="address"></mt-field>
      <mt-switch v-model="click" class="switch">默认收货地址</mt-switch>
    </div>

    <Btn btnType="3" sureText="确认提交" v-if="bianji==2" v-on:submit="submitAddress"></Btn>
    <Btn btnType="3" sureText="保存" v-else-if="bianji==1" v-on:submit="submitEditpost"></Btn>
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
</template>

<script>
import Btn from "../components/Button";
import VDistpicker from "v-distpicker";
import util from "../util/util";
export default {
  name: "addAddress",
  data() {
    return {
      username: "",
      tel: "",
      address: "",
      sheng: "",
      shi: "",
      qu: "",
      show: false,
      city: "",
      click: false,
      id: this.$route.params.id,
      bianji: this.$route.params.zhi
    };
  },
  mounted() {
    if (this.id != 0) {
      this.http
        .post("/good/detail", {
          id: this.id
        })
        .then(res => {
          this.username = res.name;
          this.tel = res.tel;
          this.sheng = res.sheng;
          this.shi = res.shi;
          this.qu = res.qu;
          this.city = res.sheng + res.shi + res.qu;
          this.address = res.adress;
        });
    }
  },
  methods: {
    //提交地址
    submitAddress() {
      let { sheng, shi, qu, address, tel, username, click } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (tel == "" && !myreg.test(tel)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (address == "") {
        util.toast("请输入详细地址！");
        return;
      }

      util.Indicator("加载中");
      if (!click) {
        click = 2;
      } else {
        click = 1;
      }
      this.http
        .post("/good/adress", {
          sheng,
          shi,
          qu,
          adress: address,
          tel,
          name: username,
          click,
          token: this.$cookie.get("token")
        })
        .then(() => {
          util.toast("地址添加成功！");
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
      this.sheng = a.value;
      if (a.value == "台湾省") {
        this.show = false;
      }
    },
    onChangeCity: function(a) {
      this.shi = a.value;
    },
    onChangeArea: function(a) {
      this.qu = a.value;
      this.show = false;
      this.city = this.sheng + this.shi + this.qu;
    },
    submitEditpost() {
      let { sheng, shi, qu, address, tel, username, click, id } = this;
      var myreg = /^[1]([3-9])[0-9]{9}$/;
      if (tel == "" && !myreg.test(tel)) {
        util.toast("请输入正确的手机号码！");
        return;
      } else if (address == "") {
        util.toast("请输入详细地址！");
        return;
      }
      util.Indicator("加载中");
      if (!click) {
        click = 2;
      } else {
        click = 1;
      }
      this.http
        .post("/good/editpost", {
          sheng,
          shi,
          qu,
          adress: address,
          tel,
          name: username,
          click,
          id,
          token: this.$cookie.get("token")
        })
        .then(() => {
          util.toast("地址编辑成功！");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
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
.addAddress {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  .content {
    width: 90%;
    margin: 0.2rem auto;
    padding: 0.2rem;
    border-radius: 5px;
    background: #fff;
    .fu {
      position: relative;
      width: 100%;
      .address {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
      }
    }
  }
  .address {
    height: 48px;
    line-height: 48px;
    font-size: inherit;
    padding: 0 10px;
    color: #757575;
  }
  .switch {
    width: 96%;
    margin: 0 auto;
    font-size: 0.25rem;
    .mint-switch-core {
      border-color: #fbc355;
      background-color: #fbc355;
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
    li {
      padding: 10px;
    }
  }

  /*点过的地区内容*/
  .divwrap .address-container .active {
    color: red;
  }
}
</style>
