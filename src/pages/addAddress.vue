<template>
  <div class="addAddress">
    <div class="content">
      <mt-field placeholder="收货人" v-model="username"></mt-field>
      <mt-field placeholder="手机号码" type="email" v-model="email"></mt-field>
      <mt-field placeholder="所在地区" v-model="username"></mt-field>
      <mt-field placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元 室等" type="email" v-model="email"></mt-field>
    </div>
    <Btn btnType="3" sureText="提交订单" v-on:submit="submitOrder"></Btn>
  </div>
</template>

<script>
import { Field } from "mint-ui";
import Btn from "../components/Button";
export default {
  name: "addAddress",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    this.axios.get("/article/about", { params: {} }).then(res => {
      console.log(res);
      this.data = this.showHtml(res.post_content);
    });
  },
  methods: {},
  components: {
    Btn
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
  }
}
</style>
