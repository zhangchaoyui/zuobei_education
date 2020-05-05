<template>
  <div class="productDetail">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in data.banner" :key="index">
        <img v-lazy='item'>
      </mt-swipe-item>
    </mt-swipe>
    <div class="content">
      <div class="title">
        积分
        <span>{{data.good_money}}</span>
      </div>
      <div class="product_name">{{data.good_name}}</div>
      <div class="bottom_title">{{data.good_desc}}</div>
    </div>
    <div class="br"></div>
    <div class="detail">
      <p>产品详情</p>
      <div v-html="content">{{content}}</div>
    </div>
    <Btn btnType="3" sureText="提交订单" v-on:submit="change()"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
import util from "../util/util";
import stroage from "../stroage/index";
export default {
  name: "productDetail",
  data() {
    return {
      id: this.$route.params.id,
      data: {},
      content: ""
    };
  },
  mounted() {
    stroage.clear("data");
    this.getProductDetail();
  },
  methods: {
    //获取积分详情
    getProductDetail() {
      this.http
        .post("/good/good_det", {
          token: this.$cookie.get("token"),
          id: this.id
        })
        .then(res => {
          this.data = res;
          this.content = util.showHtml(res.good_content);
        });
    },

    //立即兑换
    change() {
      if (this.data.good_money > this.data.score) {
        util.toast("对不起，您积分不足~");
        return;
      } else if (this.data.address != 1) {
        util.toast("对不起，请先选择地址~");
        return;
      } else if (this.data.good_num <= 0) {
        util.toast("对不起，商品库存不足~");
        return;
      }
      this.$router.push(`/submitOrder/${this.id}`);
    }
  },

  components: {
    Btn
  }
};
</script>

<style lang="scss">
.productDetail {
  width: 100%;
  height: auto;
  .mint-swipe {
    width: auto;
    height: 7.44rem;
    position: relative;
    overflow: hidden;
    .mint-swipe-item {
      width: 100%;
      img {
        height: 7.44rem;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
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
  image[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
    background: black;
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
      display: block;
      width: 100%;
      margin: 0 auto;
      font-size: 0.28rem;
      line-height: 0.8rem;
      color: #333333;
      font-weight: bold;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
