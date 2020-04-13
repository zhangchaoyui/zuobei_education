<template>
  <div class="logistics">
    <div class="title">
      <img src="/images/icon14.png" alt />
      韵达快递：4158454548556
    </div>
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <li>
            <div class="status-content-before">您的订单开始处理</div>
            <div class="status-time-before">2017-08-17 23:31 周四</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">卖家发货</div>
            <div class="status-time-before">2017-08-18 09:11 周五</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往深圳中转站</div>
            <div class="status-time-before">2017-08-19 01:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">到达深圳</div>
            <div class="status-time-before">2017-08-19 06:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往潮汕中心</div>
            <div class="status-time-before">2017-08-19 09:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li class="latest">
            <div class="status-content-latest">快件到达 潮汕中心</div>
            <div class="status-time-latest">2017-08-20 14:16 周日</div>
            <div class="status-line"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "logistics",
  data() {
    return {
      id: this.$route.params.id,
      data: ""
    };
  },
  mounted() {
    this.http
      .post("/Tran/index", {
        id: this.id
      })
      .then(res => {
        console.log(res);
        this.data = res;
      });
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.logistics {
  .title {
    width: 95%;
    padding: 0 2.5%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    img {
      width: 0.39rem;
      height: 0.31rem;
      margin-right: 3%;
      margin-left: 6%;
    }
  }
  .package-status {
    padding: 18px 0 0 0;
  }
  .package-status .status-list {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 8px;
    list-style: none;
  }
  .package-status .status-list li {
    border-left: 2px solid #d9d9d9;
    text-align: left;
  }
  .package-status .status-list li:before {
    /* 流程点的样式 */
    content: "";
    border: 3px solid #f3f3f3;
    background-color: #d9d9d9;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-left: -9px;
    margin-right: 10px;
  }
  .package-status .status-list .latest:before {
    background-color: #0dad12;
    border-color: #f8e9e4;
  }
  .package-status .status-box {
    overflow: hidden;
  }
  .package-status .status-list li {
    height: auto;
  }
  .package-status .status-list {
    margin-top: -8px;
  }
  .package-status .status-box {
    position: relative;
  }
  .package-status .status-box:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px;
  }
  .package-status .status-list {
    margin-top: 0px;
  }
  /* .package-status .status-list .latest{border:none} */
  /* .package-status .status-list li{margin-bottom:-2px} */

  .status-list li:not(:first-child) {
    padding-top: 10px;
  }

  .status-content-before {
    text-align: left;
    margin-left: 25px;
    margin-top: -20px;
    font-size: 0.25rem;
  }
  .status-content-latest {
    text-align: left;
    margin-left: 25px;
    color: green;
    margin-top: -20px;
  }
  .status-time-before {
    text-align: left;
    margin-left: 25px;
    font-size: 10px;
    margin-top: 5px;
  }
  .status-time-latest {
    text-align: left;
    margin-left: 25px;
    color: green;
    font-size: 10px;
    margin-top: 5px;
  }
  .status-line {
    border-bottom: 1px solid #ccc;
    margin-left: 25px;
    margin-top: 10px;
  }
}
</style>
