<template>
  <div class="shop">
    <div class="header">
      <div class="content">
        <div class="content_left">
          <div class="title">我的积分</div>
          <div class="center">{{integral}}</div>
          <div class="bottom" @click="about">如何赚积分任务规则</div>
        </div>
        <div class="content_right" @click="Integral">
          <img src="/images/icon7.png" alt />
          明细
          <img src=/images/icon6.png alt />
        </div>
      </div>
    </div>
    <div class="nav">
      <div @click="getNav(2)" class="nav_child">
        {{showText}}
        <img src="/images/icon46.png" alt />
        <div class="integralList" v-show="showType">
          <div v-for="(item,index) in integralList" :key="index">
            <div class="row" @click="nav(2,index)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div @click="getNav(1)" class="nav_child">
        {{showproduct}}
        <img src="/images/icon46.png" alt />
        <div class="integralList" v-show="showStatus">
          <div v-for="(item,index) in classification" :key="index">
            <div class="row" @click="nav(1,index)">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product">
      <div
        class="cloumn"
        v-for="(item,index) in productData"
        :key="index"
        @click="productDetail(item.id)"
      >
        <div class="img">
          <img :src="item.good_img" alt />
        </div>
        <p>{{item.good_name}}</p>
        <p>{{item.good_money}}积分</p>
      </div>
    </div>
    <div class="mask" v-if="!status"></div>
    <div class="sign_in" v-if="!status">
      <div class="top">
        <div class="cloumn" v-for="(item,index) in numberRand" :key="index">
          <div class="list1" :class="{'Onlist1':fan==index}" @click="fanzhuan(index)">
            <img src="/images/fan.png" />
          </div>
          <div class="list2" :class="{'Onlist2':fan==index}">
            <div>
              x
              <span>{{item}}</span>
            </div>
            <div>已获得积分</div>
          </div>
        </div>
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
      tid: "",
      jid: "",
      page: 1,
      integral: 0, //积分规则
      productData: {}, //商品数据
      numberRand: [], //翻拍积分数据
      fan: 10, //翻拍下标
      status: 1, //今日是否签到
      num: 0, //判断是否点击签到
      showType: false, //显示积分值
      showStatus: true, //显示商品类型
      integralList: {}, //显示积分类型数据
      classification: {}, //显示商品类型数据
      showText: "积分值",
      showproduct: "商品分类"
    };
  },
  mounted() {
    this.http
      .post("/sign/numberRand", { token: this.$cookie.get("token") })
      .then(res => {
        console.log(res);
        this.status = res.status;
        this.numberRand = res.num;
      });
    this.getProductDetail();
    this.getJifen();
  },
  methods: {
    //获取我的积分
    getJifen() {
      this.http
        .post("/good/integral", {
          token: this.$cookie.get("token")
        })
        .then(res => {
          this.integral = res;
        });
    },
    //翻拍
    fanzhuan(index) {
      if (this.num == 0) {
        this.num = 1;
        this.fan = index;
        this.http
          .post("/sign/sign", {
            score: this.numberRand[index],
            token: this.$cookie.get("token")
          })
          .then(() => {
            util.toast("签到成功~");
            setTimeout(() => {
              this.status = 1;
              this.getJifen();
            }, 2000);
          });
      } else {
        return;
      }
    },
    //获取商品列表
    getProductDetail() {
      this.http
        .post("/good/index", {
          tid: this.tid,
          jid: this.jid,
          page: this.page
        })
        .then(res => {
          this.productData = res.data;
        });
    },

    //跳转商品详情
    productDetail(id) {
      this.$router.push(`/productDetail/${id}`);
    },

    //积分规则
    about() {
      this.$router.push("/rules");
    },

    //积分记录
    Integral() {
      this.$router.push("/integral");
    },

    //获取导航
    getNav(i) {
      this.http.post("/good/limit", { tid: i }).then(res => {
        if (i == 2) {
          this.integralList = res;
          this.showType = !this.showType;
        } else {
          this.classification = res;
          this.showStatus = !this.showStatus;
        }
      });
    },

    //选择导航
    nav(type, index) {
      if (type == 2) {
        this.jid = this.integralList[index].id;
        this.showText = this.integralList[index].name;
      } else if (type == 1) {
        this.tid = this.classification[index].id;
        this.showproduct = this.classification[index].name;
      }
      this.getProductDetail();
    }
  },
  components: {}
};
</script>

<style lang="scss">
.shop {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
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
          width: 45%;
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
    border-bottom: 1px solid #e1e1e1;
    .nav_child {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0.3rem 0;
      position: relative;
      border-radius: 5px;
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
    .integralList {
      position: absolute;
      top: 1rem;
      left: -100;
      background: #efefef;
      width: 2.17rem;
      height: auto;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      div {
        width: 100%;
        height: 0.8rem;
        font-size: 0.26rem;
        line-height: 0.8rem;
        margin: 0 auto;
        border-bottom: 1px solid #bfbfbf;
        &:last-child {
          border: none;
        }
      }
    }
  }
  .product {
    width: 90%;
    height: auto;
    margin: 0 auto;
    padding: 0.3rem 0 0;
    .cloumn {
      width: 30%;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      float: left;
      margin: 0 1.5%;
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
  .mask {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
  }
  .sign_in {
    width: 80%;
    height: 6.5rem;
    position: absolute;
    left: 10%;
    top: 15%;
    background: url("/images/background6.png");
    background-size: 100% 100%;
    z-index: 13;
    display: flex;
    .top {
      width: 92%;
      height: 2.2rem;
      margin: 3.5rem auto 0;
      display: flex;
      justify-content: space-around;
      .cloumn {
        width: 30%;
        height: 100%;
        transition: transform 0.6s ease-out;
        transition: transform 0.5s ease-in-out;
        -webkit-transition: transform 0.5s ease-in-out;
        -moz-transition: transform 0.5s ease-in-out;
        -ms-transition: transform 0.5s ease-in-out;
        -o-transition: transform 0.5s ease-in-out;
        -webkit-transform-style: preserve-3d;
        /*使其子类变换后得以保留 3d转换后的位置*/
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        -o-transform-style: preserve-3d;
        transform-style: preserve-3d;
        display: block;
        position: relative;
      }

      div {
        width: 100%;
        height: 100%;
      }
      .list1,
      .list2 {
        backface-visibility: hidden;
        transition: 0.6s ease-out;
        -webkit-transition: 0.6s ease-out;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        -o-transform-style: preserve-3d;
        transform-style: preserve-3d;
        position: absolute;
        top: 0;
        left: 0;
      }
      .list1 {
        z-index: 11;
        transform: rotateY(0deg);
        transform: rotateY(0deg);
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
        background: url("/images/background_signIn.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 0.55rem;
          height: 0.55rem;
        }
      }
      .Onlist1 {
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        z-index: 10;
      }
      .list2 {
        z-index: 10;
        transform: rotateY(-180deg);
        transform: rotateY(-180deg);
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        -ms-transform: rotateY(-180deg);
        -o-transform: rotateY(-180deg);
        font-size: 0.24rem;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
          width: 100%;
          height: 0.5rem;
          font-size: 0.36rem;
          line-height: 0.5rem;
          color: #fff;
          text-align: center;
          span {
            font-size: 0.55rem;
          }
          &:last-child {
            font-size: 0.22rem;
            height: 0.33rem;
            line-height: 0.33rem;
          }
        }
      }
      .Onlist2 {
        transform: rotateY(0deg);
        -webkit-transform: rotateY(0deg);
        z-index: 11;
        background: url("/images/background_signIn.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>
