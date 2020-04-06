<template>
  <div class="addressList">
    <div class="address">
      <img src="/images/icon36.png" alt />
      <div class="content">
        <div class="title">
          蜡笔小新
          <span>1869615000</span>
        </div>
        <div class="address_content">山东省临沂市兰山区颐高上海街1103</div>
      </div>
      <div class="right">编辑</div>
    </div>
    <Btn btnType="3" sureText="提交订单" v-on:submit="submitOrder"></Btn>
  </div>
</template>
<script>
import Btn from "../components/Button";
export default {
  name: "addressList",
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
  methods: {
    submitOrder() {}
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/mixin.scss";
.addressList {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .address {
    width: 96%;
    height: 1.8rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto 0.2rem;
    background: #fff;
    border-radius: 5px;
    img {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 1% 0 3%;
      &:last-child {
        width: 0.14rem;
        height: 0.22rem;
        margin-left: 6%;
      }
    }

    .content {
      width: 70%;
      height: 0.8rem;
      display: flex;
      flex-direction: column;
      margin-left: 3%;
      border-right: 1px solid #e5e5e5;
      .title {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem;
        color: #333333;
        @include textWidth();
        span {
          font-size: 0.26rem;
          color: #888888;
        }
      }
      .address_content {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem;
        color: #333333;
        @include textWidth();
      }
    }
    .right {
      width: 14%;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #b4b3b3;
      font-size: 0.24rem;
    }
  }
}
</style>
