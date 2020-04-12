<template>
  <div class="productDetail">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img v-lazy="'/images/banner3.jpg'" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img v-lazy="'/images/banner3.jpg'" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img v-lazy="'/images/banner3.jpg'" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="content">
      <div class="title">
        积分
        <span>799</span>
      </div>
      <div class="product_name">Keep旗舰店LINE布朗熊手环智能运动心率手表多功能计步器防水游泳</div>
      <div class="bottom_title">Keep旗舰店 LINE布朗熊手环 智能运动</div>
    </div>
    <div class="br"></div>
    <div class="detail">
      <p>产品详情</p>
      <img src="/images/banner3.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "productDetail",
  data() {
    return {};
  },
  mounted() {
    this.getProductDetail();
  },
  methods: {
    //获取积分详情
    getProductDetail() {
      this.http
        .post("/good/good_det", {
         params:{
           id:this.$router.params.id
         }
        })
        .then(res => {
          console.log(res);
        });
    },
    //立即兑换
    change() {
      this.http
        .post("/good/change", {
         params:{
           id:this.$router.params.id,
           token:this.$cookie.get('token')
         }
        })
        .then(res => {
          console.log(res);
        });
    },
  },
  components: {}
};
</script>

<style lang="scss">
.productDetail {
  width: 100%;
  height: auto;
  .mint-swipe {
    width: 100%;
    height: 7.44rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 7.44rem;
    }
  }
  .content {
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0.47rem 0 0.37rem;
    .title {
      font-size: 0.24rem;
      color: #f5bb0e;
      line-height: 0.47rem;
      span {
        font-size: 0.42rem;
        color: #f5bb0e;
      }
    }
    .product_name {
      width: 100%;
      height: auto;
      font-size: 0.3rem;
      font-weight: bold;
      font-family: "微软雅黑";
      line-height: 0.4rem;
      color: #333333;
    }
    .bottom_title {
      width: 100%;
      height: auto;
      font-size: 0.22rem;
      line-height: 0.43rem;
      color: #888888;
    }
  }
  .br {
    width: 100%;
    height: 0.18rem;
    background: #f7f7f7;
  }
  .detail {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    p {
      display: inline-block;
      width: 90%;
      margin: 0 auto;
      font-size: 0.28rem;
      line-height: 0.8rem;
      color: #333333;
      font-weight: bold;
    }
    img {
      width: auto;
      height: auto;
    }
  }
}
</style>
