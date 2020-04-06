<template>
  <div class="order">
    <div class="nav">
      <div class="frame">
        <div>全部</div>
        <div class="on">待发货</div>
        <div>待收货</div>
        <div>已完成</div>
      </div>
    </div>
    <div class="content">
      <div class="orderinfo">
        <div class="a">
          <img src="/images/user.jpg" alt />
          <div class="ordercontent">
            <div class="name">
              <div>Keep旗舰店LINE布朗熊手环智能运动心率手表多功能计步器防水游泳</div>
              <span>订单编号：S2019002</span>
              <span>时间：2020.3.14</span>
            </div>
            <div class="right">
              <span>799积分</span>
              <span>X1</span>
            </div>
          </div>
        </div>
        <div class="button2">
          <div class="left">查看物流</div>
          <div class="right">确认收货</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
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
@import "./../assets/scss/mixin.scss";
.order {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .nav {
    width: 100%;
    height: 0.9rem;
    margin: 0 auto;
    background: #fff;
    display: flex;
    .frame {
      width: 90%;
      height: 0.9rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0 auto;
      div {
        line-height: 0.3rem;
        font-size: 0.28rem;
        margin-top: 0.3rem;
        padding-bottom: 0.28rem;
        border-bottom: 1px solid #fff;
      }
      .on {
        border-bottom: 2px solid #f5bb0e;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .orderinfo {
      width: 96%;
      display: flex;
      flex-direction: column;
      margin: 0.2rem auto 0.5rem;
      background: #fff;
      border-radius: 5px;
      padding-bottom: 0.2rem;
      .a {
        display: flex;
        flex-direction: row;
        padding: 0.3rem 0 0.1rem;
        justify-content: space-around;
        align-items: center;
        img {
          width: 1.63rem;
          height: 1.63rem;
          border-radius: 5px;
        }
        .ordercontent {
          width: 65%;
          height: 1.63rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          border-radius: 5px;
          .name {
            width: 70%;
            height: 1.2rem;
            font-size: 0.22rem;
            line-height: 0.3rem;
            color: #333333;
            div {
              width: 100%;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 0.1rem;
            }
            span {
              display: block;
              width: 100%;
              height: 0.3rem;
              font-size: 0.21rem;
              line-height: 0.3rem;
              color: #888888;
            }
          }
          .right {
            width: 20%;
            line-height: 0.33rem;
            display: flex;
            flex-direction: column;
            text-align: right;
            span {
              display: block;
              width: 100%;
              font-size: 0.22rem;
              color: #f5bb0e;
              &:last-child {
                color: #888888;
              }
            }
          }
        }
      }

      .button2 {
        width: 55%;
        display: flex;
        margin-left: 45%;
        div {
          margin: 0 0.2rem;
          padding: 0 0.29rem;
          height: 100%;
          line-height: 0.5rem;
          font-size: 0.22rem;
          border-radius: 0.4rem;
          &:first-child {
            color: #898989;
            border: 1px solid #898989;
          }
          &:last-child {
            color: #f5bb0e;
            border: 1px solid #f5bb0e;
          }
        }
      }
    }
  }
}
</style>
