<template>
  <div class="integral">
    <div class="header">
      <div class="content">
        <div class="content_left">
          <div class="title">我的积分</div>
          <div class="center">318,325</div>
          <div class="bottom">如何赚积分任务规则</div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div>获取记录</div>
      <div>使用记录</div>
    </div>
    <div class="list">
      <div class="row">
        <div class="row_left">
          <img src="/images/icon37.png" alt />
        </div>
        <div class="row_center">
          <div class="center_top">点赞</div>
          <div class="center_bottom">09-28 10:10</div>
        </div>
        <div class="row_right">+10.00</div>
      </div>
      <div class="row">
        <div class="row_left">
          <img src="/images/icon37.png" alt />
        </div>
        <div class="row_center">
          <div class="center_top">点赞</div>
          <div class="center_bottom">09-28 10:10</div>
        </div>
        <div class="row_right">+10.00</div>
      </div>
      <div class="row">
        <div class="row_left">
          <img src="/images/icon37.png" alt />
        </div>
        <div class="row_center">
          <div class="center_top">点赞</div>
          <div class="center_bottom">09-28 10:10</div>
        </div>
        <div class="row_right">+10.00</div>
      </div>
      <div class="row">
        <div class="row_left">
          <img src="/images/icon37.png" alt />
        </div>
        <div class="row_center">
          <div class="center_top">点赞</div>
          <div class="center_bottom">09-28 10:10</div>
        </div>
        <div class="row_right">+10.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integral",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.integral {
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
      height: 1.5rem;
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
          line-height: 1rem;
        }
        .bottom {
          width: 53%;
          font-size: 0.2rem;
          line-height: 0.2rem;
          border-bottom: 1px solid white;
          opacity: 0.6;
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
  .list {
    width: 94%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 0.2rem 0;
    .row {
      width: 94%;
      margin: 0 auto;
      padding: 0.1rem 0;
      line-height: 0.53rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .row_left {
        margin: -0.1rem 0.1rem 0 0;
        img {
          width: 0.53rem;
          height: 0.53rem;
        }
      }
      .row_center {
        width: 70%;
        height: auto;
        display: flex;
        flex-direction: column;
        padding-left: 2%;
        box-sizing: border-box;
        .center_top {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #333333;
        }
        .center_bottom {
          font-size: 0.18rem;
          line-height: 0.4rem;
          color: #999999;
        }
      }
      .row_right {
        width: 20%;
        text-align: right;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #f5bb0e;
      }
    }
  }
}
</style>
