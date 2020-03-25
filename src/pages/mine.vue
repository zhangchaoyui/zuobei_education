<template>
  <div class="mine">
    <div class="header">
      <div class="img">
        <img src="/images/user.jpg" alt />
      </div>
      <div class="username">
        <span>蜡笔小新蜡笔小新蜡笔小新蜡笔小新蜡笔小新</span>
        <img src="/images/icon27.png" alt />
      </div>
      <div class="user_info">完善信息</div>
    </div>
    <div class="record">
      <div class="record_left">
        <span>38,325</span>
        <span>上传作品次数</span>
      </div>
      <div class="record_right">
        <span>18,325</span>
        <span>点赞次数</span>
      </div>
    </div>
    <div class="functionList">
      <div class="function" v-for="(item,index) in list" :key="index" @click="click(item.type)">
        <img class="icon" :src="`/images/`+item.icon" />
        {{item.name}}
        <span class="span_img">
          <img src="/images/icon41.png" alt />
        </span>
      </div>
    </div>
    <Tabbar :selected="selected" :tabs="tabs" :nav="4"></Tabbar>
  </div>
</template>

 <script>
import Tabbar from "../components/Tabbar";
export default {
  name: "mine",
  data() {
    return {
      selected: "我的",
      tabs: [
        require("../../public/images/icon40.png"),
        require("../../public/images/icon9.png"),
        require("../../public/images/icon10.png"),
        require("../../public/images/icon11_yellow.png")
      ],
      list: [
        {
          icon: "icon18.png",
          name: "我的作品集",
          type: 1
        },
        {
          icon: "icon25.png",
          name: "积分商城 ",
          type: 2
        },
        {
          icon: "icon23.png",
          name: "我的订单",
          type: 3
        },
        {
          icon: "icon24.png",
          name: "收货地址",
          type: 4
        },
        {
          icon: "icon12.png",
          name: "关于我们",
          type: 5
        },
        {
          icon: "icon13.png",
          name: "意见反馈",
          type: 6
        },
        {
          icon: "icon22.png",
          name: "我的老师",
          type: 7
        }
      ]
    };
  },
  mounted() {},
  methods: {
    //功能跳转
    click(type) {
      console.log(type);
      switch (type) {
        case 1:
          this.$router.push("/mywroks");
          break;
        case 2:
          this.$router.push("/shop");
          break;
        case 3:
          this.$router.push("/myOrder");
          break;
        case 4:
          this.$router.push("/addressList");
          break;
        case 5:
          this.$router.push("/about");
          break;
        case 6:
          this.$router.push("/feedback");
          break;
        case 7:
          this.$router.push("/myTeacher");
          break;
      }
    }
  },
  components: {
    Tabbar
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/reset.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.mine {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding-top: 0;
  background: #f5f5f5;
  overflow: hidden;
  position: relative;
  .header {
    width: 100%;
    height: 3.7rem;
    background: url("/images/icon31.png") no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: row;
    .img {
      width: 1.33rem;
      height: 1.33rem;
      margin: 0.74rem 0 0 0.38rem;
      img {
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 1.33rem;
        overflow: hidden;
      }
    }
    .username {
      width: 48%;
      margin: 1.25rem 0 0 0.15rem;
      font-size: 0.32rem;
      color: #333333;
      font-weight: bold;
      font-family: "微软雅黑";
      overflow: hidden;
      display: flex;
      flex-direction: row;
      padding-left: 2%;

      span {
        width: 90%;
        @include textWidth();
      }
      img {
        width: 0.18rem;
        height: 0.2rem;
        margin: 0.16rem 0 0 0.07rem;
      }
    }
    .user_info {
      width: 1.49rem;
      height: 0.52rem;
      padding: 0.13rem;
      margin: 1.25rem 0 0 0.15rem;
      font-size: 0.24rem;
      line-height: 0.24rem;
      color: #333;
      text-align: center;
      background: #fbc355;
      border-radius: 0.52rem;
      border: 1px solid #f9d58d;
      box-sizing: border-box;
    }
  }
  .record {
    width: 90%;
    height: 1.49rem;
    position: absolute;
    top: 2.54rem;
    left: 5%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;
    .record_left {
      width: 50%;
      height: 0.91rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-top: 0.25rem;
      position: relative;
      span {
        width: 100%;
      }
      span:first-child {
        font-size: 0.4rem;
        color: #f5bb0e;
        line-height: 0.6rem;
      }
      span:last-child {
        font-size: 0.22rem;
        color: #555555;
        line-height: 0.4rem;
      }
      &:before {
        content: "";
        width: 2px;
        height: 0.91rem;
        border-right: 1px solid #eeeeee;
        position: absolute;
        right: 0;
      }
    }
    .record_right {
      width: 50%;
      height: 0.91rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-top: 0.25rem;
      span {
        width: 100%;
      }
      span:first-child {
        font-size: 0.4rem;
        color: #f5bb0e;
        line-height: 0.6rem;
      }
      span:last-child {
        font-size: 0.22rem;
        color: #555555;
        line-height: 0.4rem;
      }
    }
  }
  .functionList {
    width: 90%;
    margin: 0.7rem auto 0;
    background: #fff;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    padding: 0.36rem 0;
    .function {
      width: 90%;
      margin: 0 auto;
      height: 0.76rem;
      line-height: 0.76rem;
      font-size: 0.26rem;
      border-bottom: 0.002rem solid #f3f2f3;
      padding: 0.05rem 0;
      display: flex;
      position: relative;
      .icon {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0.14rem 0.2rem 0 0.34rem;
        vertical-align: middle;
      }
      .span_img {
        width: 0.13rem;
        position: absolute;
        top: 0.04rem;
        right: 0.12rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .function:last-child {
      border-bottom: none;
    }
  }
}
</style>