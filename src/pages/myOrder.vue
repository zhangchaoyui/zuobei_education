<template>
  <div class="addressList">
    <div class="header">
      <div class="nav">
        <ul>
          <li>全部</li>
          <li>待发货</li>
          <li>待收货</li>
          <li>已完成</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="cell1">
        <div class="title">
          特斯拉
          <span>交易成功</span>
        </div>
        <div class="cell">
          <div class="text">
            <div class="brand">特斯拉</div>
            <span class="intro">新能源汽车五座座小型轿车五座汽车五座小型轿车五座汽车</span>
            <span class="spay">应付账款￥330.090</span>
            <span class="pay">实际付款：￥330.000</span>
          </div>
          <div class="img">
            <img src />
          </div>
        </div>
        <div class="footer">
          <div class="btn">
            <div class="option">删除订单</div>
            <div class="option">置换新车</div>
            <div class="option">立即评价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.addressList {
  .header {
    display: block;
    width: auto;
    height: 0.5rem;
  }

  .head {
    font-size: 0.16rem;
    height: 0.44rem;
    background: #26a69a;
    color: white;
    text-align: center;
    line-height: 0.44rem;
  }

  .head > a {
    color: white;
    float: left;
    margin-left: 0.12rem;
  }

  .nav {
    height: 0.44rem;
    background: white;
    font-size: 0.12rem;
    line-height: 0.44rem;
    padding-left: 0.28rem;
  }
  .nav > ul {
    display: block;
    height: 100%;
  }

  .nav > ul > li {
    float: left;
    margin: 0px 0.15rem;
    height: 100%;
  }

  .content {
    margin-top: 1rem;
  }

  .cell1 {
    height: 1.59rem;
    background: white;
    font-size: 0.12rem;
    margin-top: 0.13rem;
  }

  .title {
    height: 0.22rem;
    border-bottom: 1px solid #d8d8d8;
    padding-left: 0.12rem;
    padding-right: 0.12rem;
  }

  .title > span {
    float: right;
    font-size: 0.09rem;
    color: #a4a3a3;
  }

  .cell {
    height: 0.96rem;
    background: white;
    border-bottom: 1px solid #d8d8d8;
    padding: 0.12rem 0;
  }

  .cell > .img {
    width: 1.27rem;
    height: 0.72rem;
    float: left;
    margin-left: 0.12rem;
  }

  /*.content{
overflow: scroll;
}*/

  .cell > .text {
    width: 2.12rem;
    margin-right: 0.12rem;
    float: right;
  }

  .cell > .text > span {
    display: block;
  }

  .cell .intro {
    font-size: 0.1rem;
    color: #a4a3a3;
  }

  .cell .spay {
    font-size: 0.09rem;
    color: #a4a3a3;
  }

  .cell .pay {
    color: #26a69a;
    font-size: 0.1rem;
  }

  .footer {
    height: 0.32rem;
    padding: 0.1rem;
    text-align: center;
  }
  .footer > .btn {
    float: right;
  }

  .option {
    width: 0.65rem;
    border: 1px solid #26a69a;
    border-radius: 2px;
    float: left;
    margin-left: 0.07rem;
  }
}
</style>
