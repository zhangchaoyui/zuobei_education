<template>
  <div class="shop">
    <div class="header">
      <div class="content">
        <div class="content_left">
          <div class="title">我的积分</div>
          <div class="center">318,325</div>
          <div class="bottom">如何赚积分任务规则</div>
        </div>
        <div class="content_right">
          <img src="/images/icon7.png" alt />
          明细
          <img src=/images/icon6.png alt />
        </div>
      </div>
    </div>
    <div class="nav">
      <div>
        积分值
        <img src="/images/icon46.png" alt />
      </div>
      <div>
        商品分类
        <img src="/images/icon46.png" alt />
      </div>
    </div>
    <div class="product">
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn" @click="productDetail()">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
      <div class="cloumn">
        <div class="img">
          <img src="/images/22.png" alt />
        </div>
        <p>松下电吹风</p>
        <p>300积分</p>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../util/util";
export default {
  name: "shop",
  data() {
    return {
      data: {
        id: "",
        jid: "",
        page: ""
      } //商品数据
    };
  },
  mounted() {
    this.getProductDetail();
    this.getJifen();
  },
  methods: {
    //获取我的积分
    getJifen() {
      let data = {};
      data;
      this.http
        .post("/good/index", {
          tid: this.tid,
          jid: this.jid,
          page: this.page
        })
        .then(res => {
          console.log(res);
          this.data = res.data;
          util.toast(res);
        });
    },
    //获取商品列表
    getProductDetail() {
      let data = {};
      data;
      this.http
        .post("/good/index", {
          tid: this.tid,
          jid: this.jid,
          page: this.page
        })
        .then(res => {
          console.log(res);
          this.data = res.data;
          util.toast(res);
        });
    },
    //跳转用户详情
    productDetail(id) {
      this.$router.push(`/productDetail/${id}`);
    }
  },
  components: {}
};
</script>

<style lang="scss">
.shop {
  width: 100%;
  height: auto;
  .header {
    width: 6.9rem;
    height: 2.9rem;
    margin: 0.2rem auto 0;
    background: url("/images/background2.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 100%;
      height: 1.9rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .content_left {
        width: 60%;
        height: 1.9rem;
        margin-left: 10%;
        color: white;
        .title {
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
        .center {
          font-size: 0.6rem;
          line-height: 1.3rem;
        }
        .bottom {
          width: 54%;
          font-size: 0.2rem;
          line-height: 0.2rem;
          border-bottom: 1px solid white;
        }
      }
      .content_right {
        width: 20%;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: white;
        font-size: 0.24rem;
        background: #f6b230;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        padding: 0.12rem 0.1rem;
        img {
          &:first-child {
            width: 0.29rem;
            height: 0.29rem;
            margin-left: 0.2rem;
            margin-right: 5%;
          }
          &:last-child {
            width: 0.12rem;
            height: 0.2rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
  .nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 0.32rem;
    border-bottom: 1px solid #f6f6f6;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0.3rem 0;
      position: relative;
      &::before {
        content: "";
        width: 50%;
        height: 2px;
        background: #f5bb0e;
        position: absolute;
        bottom: 0;
        left: 15%;
      }
      img {
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.12rem;
      }
    }
  }
  .product {
    width: 90%;
    height: auto;
    margin: 0 auto;
    padding: 0.3rem 0 0;
    .cloumn {
      width: 33.3333%;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      float: left;
      overflow: hidden;
      .img {
        margin: 0 auto;
        img {
          display: inline-block;
          width: auto;
          height: 1.63rem;
        }
      }
      p {
        display: inline-block;
        text-align: center;
        font-size: 0.26rem;
        line-height: 0.4rem;
        color: #333333;
        &:last-child {
          color: #f5bb0e;
        }
      }
    }
  }
}
</style>
