<template>
  <div class="mine">
    <div class="header">
      <div class="img">
        <img src="/images/user.jpg" alt />
      </div>
      <div class="username">
        <span>蜡笔小新</span>
        <img src="/images/icon27.png" alt />
      </div>
      <div>完善信息</div>
    </div>
    <!-- <div class="record">
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
      <div>
        <img src="/images/icon18.png" alt />我的作品集
        <span>
          <img src="/images/icon6.png" alt />
        </span>
      </div>
    </div>-->
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
        require("../../public/images/icon10.png")
      ]
    };
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
  padding-bottom: 1.1rem;
  overflow: hidden;
  .header {
    width: 100%;
    height: 3.7rem;
    background: url("/images/icon31.png") no-repeat;
    background-size: 100%;
    .img {
      width: 1.33rem;
      height: 1.33rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .username {
      width: 96%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>