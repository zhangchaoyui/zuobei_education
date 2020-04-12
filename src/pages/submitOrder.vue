<template>
  <div class="submitOrder">
    <div class="address">
      <img src="/images/icon36.png" alt />
      <div class="content">
        <div class="title">
          蜡笔小新
          <span>1869615000</span>
        </div>
        <div class="address_content">山东省临沂市兰山区颐高上海街1103</div>
      </div>
      <img src="/images/icon41.png" alt />
    </div>
    <div class="orderinfo">
      <img src="/images/user.jpg" alt />
      <div class="ordercontent">
        <div class="name">Keep旗舰店LINE布朗熊手环智能运动心率手表多功能计步器防水游泳</div>
        <div class="bottom">
          <span>799积分</span>
          <span>X1</span>
        </div>
      </div>
    </div>
    <Btn btnType="3" sureText="提交订单" v-on:submit="submitOrder"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
export default {
  name: "myorder",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    //提交订单
    this.submitOrder();
  },
  methods: {
    submitOrder() {
      this.axios.get("/article/about", { params: {} }).then(res => {
        console.log(res);
        this.data = this.showHtml(res.post_content);
      });
    }
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/mixin.scss";
.submitOrder {
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
  }
  .orderinfo {
    width: 96%;
    height: 2.32rem;
    display: flex;
    align-items: center;
    margin: 0rem auto 0.5rem;
    background: #fff;
    justify-content: space-around;
    border-radius: 5px;
    img {
      width: 1.63rem;
      height: 1.63rem;
      border-radius: 5px;
    }
    .ordercontent {
      width: 65%;
      height: 1.63rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 5px;
      .name {
        width: 100%;
        height: 1.2rem;
        font-size: 0.28rem;
        line-height: 0.3rem;
        color: #333333;
      }
      .bottom {
        width: 100%;
        height: 0.33rem;
        line-height: 0.33rem;
        display: flex;
        justify-content: space-between;
        span {
          display: block;
          font-size: 0.22rem;
          color: #f5bb0e;
          &:last-child {
            color: #888888;
          }
        }
      }
    }
  }
}
</style>
