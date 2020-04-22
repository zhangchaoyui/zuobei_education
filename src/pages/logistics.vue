<template>
  <div class="logistics">
    <div class="title">
      <img src="../../public/images/icon14.png" alt />
      {{data.brand}}：{{data.no}}
    </div>
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <!-- <li>
            <div class="status-content-before">您的订单开始处理</div>
            <div class="status-time-before">2017-08-17 23:31 周四</div>
            <div class="status-line"></div>
          </li>-->
          <li class="latest" v-for="(item,index) in data.data" :key="index">
            <div class="status-content-latest">{{item.context}}</div>
            <div class="status-time-latest">{{item.time}}</div>
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
      data: {}
    };
  },
  mounted() {
    this.http
      .post("/Tran/index", {
        id: this.id
      })
      .then(res => {
        this.data = res.data[0];
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
    margin: 0 auto;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
    img {
      width: 0.39rem;
      height: 0.31rem;
      margin-right: 3%;
      margin-left: 6%;
    }
  }
  .package-status {
    padding: 18px 0 0 0;
    width: 90%;
    margin: 0 auto;
  }
  .package-status .status-list {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 8px;
    list-style: none;
  }
  .package-status .status-list li {
    color: black;
    border-left: 2px solid #ccc;
    border-bottom: none;
    text-align: left;
    &:first-child {
      border-left: 2px solid #f5bb0e;
      &:before {
        /* 流程点的样式 */
        content: "";
        border: 3px solid #f3f3f3;
        background-color: #f5bb0e;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        margin-left: -9px;
        margin-right: 10px;
      }
    }
    &:before {
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
  }
  .package-status .status-list .latest {
    &:last-child {
      div {
        border-bottom: none !important;
      }
    }
    &:first-child:before {
      content: "";
      background-color: #f5bb0e;
      border-color: #f8e9e4;
    }
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

  .status-content-before {
    text-align: left;
    margin-left: 25px;
    margin-top: -20px;
    font-size: 0.25rem;
  }
  .status-content-latest {
    text-align: left;
    margin-left: 25px;
    color: #999999;
    margin-top: -20px;
    font-size: 0.28rem;
    &:first-child {
      color: black;
    }
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
    color: #999999;
    font-size: 12px;
    margin-top: 5px;
  }
  .status-line {
    border-bottom: 1px solid #ccc;
    margin-left: 25px;
    margin-top: 10px;
  }
}
</style>
