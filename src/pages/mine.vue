<template>
  <div class="mine">
    <div class="header">
      <div class="img">
        <img :src="user_info.avatar" v-image-preview alt />
      </div>
      <div class="username">
        <span>{{user_info.nickname}}</span>
        <img src="../../public/images/icon27.png" alt @click="UserInfo" />
      </div>
      <div class="user_info" @click="perfect">完善信息</div>
    </div>
    <div class="record" v-if="Usertype==1">
      <div class="record_left">
        <span>{{user_info.size1}}</span>
        <span>上传作品次数</span>
      </div>
      <div class="record_right">
        <span>{{user_info.size2}}</span>
        <span>点赞次数</span>
      </div>
    </div>

    <div class="record" v-else-if="Usertype==2">
      <div class="record_left">
        <span>{{user_info.size1}}</span>
        <span>点评作品数量</span>
      </div>
      <div class="record_right" @click="Reply">
        <span>{{user_info.size2}}</span>
        <span>回复我的点评</span>
      </div>
    </div>
    <div class="record2"></div>
    <div class="functionList" v-if="Usertype==1">
      <div class="function" v-for="(item,index) in list" :key="index" @click="click(item.type)">
        <img class="icon" :src="`../../public/images/`+item.icon" />
        <div v-if="item.type!=7">{{item.name}}</div>
        <a v-if="item.type==7" href="tel:0147-88469258">{{item.name}}</a>
        <span class="span_img" v-show="item.type!=7">
          <img src="../../public/images/icon41.png" alt />
        </span>
      </div>
    </div>
    <div class="functionList" v-else-if="Usertype==2">
      <div class="function" v-for="(item,index) in list2" :key="index" @click="click(item.type)">
        <img class="icon" :src="`../../public/images/`+item.icon" />
        {{item.name}}
        <span class="span_img">
          <img src="../../public/images/icon41.png" alt />
        </span>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

 <script>
import stroage from "../stroage/index";
export default {
  name: "mine",
  data() {
    return {
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
      ],
      list2: [
        {
          icon: "icon13.png",
          name: "我的点评",
          type: 8
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
        }
      ],
      user_info: {},
      Usertype: "",
      imgList: "", //图片列表
      showImg: "", //图片显示列表
      imgaesMaxLenght: 1
    };
  },
  mounted() {
    this.getMineInfo();
  },
  methods: {
    //功能跳转
    click(type) {
      switch (type) {
        case 1:
          this.$router.push("/mywroks"); //我的作品
          break;
        case 2:
          this.$router.push("/shop"); //积分商城
          break;
        case 3:
          this.$router.push("/order"); //我的订单
          break;
        case 4:
          this.$router.push("/addressList/1"); //我的地址
          break;
        case 5:
          this.$router.push("/about"); //关于
          break;
        case 6:
          this.$router.push("/feedback"); //反馈
          break;
        case 7:
          <a href="tel:0147-88469258"></a>;
          break;
        case 8:
          this.$router.push("/teacherWorks"); //老师点评列表
          break;
      }
    },

    //完善信息
    perfect() {
      this.$router.push("/userInfo");
    },

    //获取个人信息
    getMineInfo() {
      this.axios
        .post("/personal/index", {
          token: this.$cookie.get("token"),
          user_type: this.$cookie.get("user_type") || 1
        })
        .then(res => {
          this.user_info = res;
          this.Usertype = this.$cookie.get("user_type") || 1;
        });
    },

    //回复列表
    Reply() {
      this.$router.push("/reply");
    },

    UserInfo() {
      this.$router.push("/personal");
    }
  },
  components: {}
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
    height: 27vh;
    background: url("../../public/images/icon31.png") no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: row;
    .img {
      width: 1.33rem;
      height: 1.33rem;
      margin: 0.74rem 0 0 0.38rem;
      border-radius: 1.33rem;
      position: relative;
      overflow: hidden;
      border: 1px solid #fff;
      img {
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .username {
      width: 48%;
      margin: 1.3rem 0 0 0.15rem;
      font-size: 0.32rem;
      color: #333333;
      font-weight: bold;
      font-family: "微软雅黑";
      overflow: hidden;
      display: flex;
      flex-direction: row;
      padding-left: 2%;

      span {
        max-width: 90%;
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
    height: 1.5rem;
    position: absolute;
    top: 20vmax;
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
  .record2 {
    width: 90%;
    height: 0.8rem;
    opacity: 0;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
  }
  .functionList {
    width: 90%;
    margin: 0 auto 0;
    background: #fff;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0;
    .function {
      width: 90%;
      margin: 0 auto;
      height: 5.8vh;
      line-height: 0.76rem;
      font-size: 0.26rem;
      border-bottom: 0.002rem solid #f3f2f3;
      padding: 0.05rem 0;
      display: flex;
      position: relative;
      align-items: center;
      .icon {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.2rem 0 0.34rem;
        vertical-align: middle;
      }
      a {
        color: black;
      }
      .span_img {
        position: absolute;
        top: 0.04rem;
        right: 0.12rem;
        display: flex;
        align-items: center;
        height: 100%;
        img {
          width: 0.12rem;
          height: 0.2rem;
          margin-top: -0.09rem;
        }
      }
    }
    .function:last-child {
      border-bottom: none;
    }
  }
  .bottom {
    width: 100%;
    height: 1rem;
  }
}
</style>