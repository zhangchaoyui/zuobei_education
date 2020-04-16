<template>
  <div class="order">
    <div class="nav">
      <div class="frame">
        <div :class="{'on':nid==1}" @click="nav(1)">全部</div>
        <div :class="{'on':nid==2}" @click="nav(2)">待发货</div>
        <div :class="{'on':nid==3}" @click="nav(3)">待收货</div>
        <div :class="{'on':nid==4}" @click="nav(4)">已完成</div>
      </div>
    </div>
    <div class="content">
      <div class="orderinfo" v-for="(item,index) in data" :key="index">
        <div class="a">
          <img :src="item.good_image" alt />
          <div class="ordercontent">
            <div class="name">
              <div>{{item.ex_good_name}}</div>
              <span>订单编号：{{item.out_trade_no}}</span>
              <span>时间：{{item.ex_time}}</span>
            </div>
            <div class="right">
              <span>{{item.ex_good_price}}积分</span>
              <span>X{{item.num}}</span>
            </div>
          </div>
        </div>
        <div class="button2" v-if="item.status!=4&&item.status!=2">
          <div class="left" @click="logistics(item.id)">查看物流</div>
          <div class="right" @click="confirm(item.id)">确认收货</div>
        </div>
        <div class="button3" v-if="item.status==4">
          <div class="left" @click="deleteOrder(item.id)">删除订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../util/util";
export default {
  name: "order",
  data() {
    return {
      data: "",
      nid: 1,
      page: 1,
      loading: true
    };
  },
  mounted() {
    this.nav(1);
  },
  methods: {
    //导航切换
    nav(i) {
      this.nid = i;
      if (i == 1) {
        i = "";
      }
      this.http
        .post("/good/goods", {
          tid: i,
          token: this.$cookie.get("token")
        })
        .then(res => {
          this.data = res;
        });
    },
    //物流页面
    logistics(id) {
      this.$router.push(`/logistics/${id}`);
    },
    //确认收货
    confirm(id) {
      this.http
        .post("/good/confirm", {
          gid: id
        })
        .then(() => {
          util.toast("确认收货成功~");
          setTimeout(() => {
            this.nav(this.nid);
          }, 1500);
        });
    },

    deleteOrder(id) {
      this.http
        .post("/good/delete", {
          pid: id
        })
        .then(() => {
          util.toast("删除订单成功~");
          setTimeout(() => {
            this.nav(this.nid);
          }, 1500);
        });
    }
  },
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
    min-height: 93vh;
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
              height: 0.8rem;
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

      .button3 {
        width: 30%;
        display: flex;
        margin-left: 70%;
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
