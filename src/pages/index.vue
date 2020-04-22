<template>
  <div class="index">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in swiper" :key="index">
        <img :src="item.image" @click="link(index)" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="search" @click="search">
      <img src="../../public/images/search.png" alt />请输入您要搜索的名称
    </div>
    <div class="nav-list" v-if="Usertype==1">
      <div class="nav_row" @click="nav(1)">
        <img src="../../public/images/category1.png" />
        作品排行
      </div>
      <div class="nav_row" @click="nav(2)">
        <img src="../../public/images/category2.png" />
        月度排行
      </div>
      <div class="nav_row" @click="nav(3)">
        <img src="../../public/images/category3.png" />
        我的订单
      </div>
      <div class="nav_row" @click="nav(4)">
        <img src="../../public/images/category4.png" />
        积分商城
      </div>
    </div>
    <!-- 文章详情 -->
    <div class="articleList">
      <div class="title">
        <div class="title_content">
          <img src="../../public/images/icon30.png" />文章资讯
        </div>
        <img src="../../public/images/icon6.png" class="right_icon" @click="newsList" />
      </div>
      <div class="content">
        <div class="from" @click="news(item.id)" v-for="(item,index) in Article" v-bind:key="index">
          <div class="img">
            <img v-lazy="item.thumbnail" />
          </div>
          <div class="text">
            <div class="title">{{item.post_title}}</div>
            <div class="text_content">{{item.post_content}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 外链 -->
    <div class="nav_img" @click="external">
      <img src="../../public/images/background4.png" />
    </div>
    <!-- 作品列表 -->
    <div class="articleList">
      <div class="title">
        <div class="title_content">
          <img src="../../public/images/icon39.png" />作品列表
        </div>
        <img src="../../public/images/icon6.png" class="right_icon" @click="worksList" />
      </div>
      <div class="works_nav">
        <div v-bind:class="{'btn':btn==1}" @click="getWorks(1)">最新点评</div>
        <div v-bind:class="{'btn':btn==2}" @click="getWorks(2)">最新上传</div>
        <div v-bind:class="{'btn':btn==3}" @click="getWorks(3)">最多点评</div>
      </div>
      <div class="content2">
        <div
          class="works"
          @click="worksDetail(item.id)"
          v-for="(item,index) in Works"
          v-bind:key="index"
        >
          <div class="img">
            <img v-lazy="item.image" />
          </div>
          <div class="worksDetail">
            <div class="works_name">{{item.title}}</div>
            <img src="../../public/images/fabulous_red.png" style="border-radius:0" />
            <div class="num">{{item.praise}}</div>
          </div>
          <div class="user">
            <img :src="item.avatar" />
            <div class="user_name">{{item.name}}</div>
            <div class="submit">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import stroage from "../stroage/index";
export default {
  name: "index",
  data() {
    return {
      value: "",
      btn: 1,
      swiper: [],
      Article: [],
      Works: [],
      Usertype: ""
    };
  },
  mounted() {
    this.getSwiper();
    this.getArticle();
    this.getWorks();
    this.Usertype = this.$cookie.get("user_type") || 1;
  },
  methods: {
    //跳转作品详情页
    worksDetail(id) {
      this.$router.push(`/worksdetail/${id}`);
    },

    //跳转作品列表
    worksList() {
      this.$router.push("/workslist");
    },

    //跳转外链
    external() {
      wx.miniProgram.navigateTo({ url: "/page/index/index" });
    },

    //banner跳转
    link(index) {
      let { swiper } = this;
      if (swiper[index].type == 1) {
        this.$router.push(`/news/${swiper[index].titles}`);
      } else {
        window.location.replace(swiper[index].url);
      }
    },

    //跳转文章资讯
    news(e) {
      this.$router.push(`/news/${e}`);
    },
    //跳转文章列表
    newsList() {
      this.$router.push("/newList");
    },

    //跳转导航
    nav(e) {
      if (e == 1) {
        this.$router.push("/workslist");
      } else if (e == 2) {
        this.$router.push("/monthList");
      } else if (e == 3) {
        this.$router.push("/order");
      } else if (e == 4) {
        this.$router.push("/shop");
      }
    },

    //获取轮播图信息
    getSwiper() {
      this.axios.get("/index/slide").then(res => {
        this.swiper = res;
      });
    },
    //获取文章
    getArticle() {
      this.axios.get("/article/index", { params: { limit: 3 } }).then(res => {
        this.Article = res.data;
      });
    },

    //获取作品
    getWorks(e) {
      this.axios.get("/works/index", { params: { order: e } }).then(res => {
        this.Works = res;
        this.btn = e || 1;
      });
    },

    search() {
      this.$router.push("/search");
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.index {
  width: 96%;
  margin: 0.1rem auto 0;
  background: #fff;
  padding-bottom: 1.1rem;
  .mint-swipe {
    width: 100%;
    height: 4.15rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 4.15rem;
    }
  }
  .search {
    width: 100%;
    height: 0.62rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    color: #858585;
    margin-top: 4%;
    margin-bottom: 2%;
    background: #f9f9f9;
    border-radius: 0.3rem;
    padding: 0;
    img {
      width: 0.26rem;
      height: 0.26rem;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  .mint-search {
    width: 100%;
    height: auto;
    margin-top: 0.2rem;
    display: flex;
    overflow: hidden;
    .mint-searchbar {
      padding: 0px 10px;
      border-radius: 0.4rem;
      background: #f9f9f9 !important;
      .mint-searchbar-inner {
        background: none !important;
        .mintui-search {
          font-size: 0.34rem;
        }
        .mint-searchbar-core {
          padding-left: 5%;
          background: none !important;
        }
      }
      .mint-searchbar-cancel {
        font-size: 0.34rem;
        color: $colorA;
      }
    }
  }
  .nav-list {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0.47rem 0 0.33rem;
    .nav_row {
      width: 1.23rem;
      height: 1.26rem;
      text-align: center;
      font-size: $fontK;
      font-weight: 500;
      color: $colorB;
      font-family: "微软雅黑";
      img {
        width: auto;
        height: 0.85rem;
      }
    }
  }
  .articleList {
    width: 100%;
    height: auto;
    padding-bottom: 0.14rem;
    background: url("../../public/images/background10.png");
    background-size: 100%;
    box-sizing: border-box;
    .title {
      width: 100%;
      display: flex;
      flex-direction: row;
      position: relative;
      .title_content {
        width: 30%;
        height: 0.36rem;
        line-height: 0.36rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0.33rem auto 0.3rem;
        font-size: 0.29rem;
        color: #fff;
        img {
          display: inline-block;
          height: 0.33rem;
          margin-right: 0.14rem;
          vertical-align: middle;
        }
      }
      .right_icon {
        display: inline-block;
        height: 0.2rem;
        position: absolute;
        top: 0.395rem;
        right: 0.29rem;
      }
    }
    .content {
      width: 94%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      text-align: left;
      background: #fff;
      .from {
        display: flex;
        flex-direction: row;
        width: 96%;
        margin: 0 auto;
        padding: 0.33rem 0 0.28rem;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        box-sizing: border-box;
        .img {
          width: 30%;
          border-radius: 5px;
          overflow: hidden;
          img {
            display: inline-block;
            width: 100%;
            height: 1.5rem;
            vertical-align: middle;
          }
        }
        .text {
          width: 67%;
          margin-left: 3%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          text-align: left;
          .title {
            // width: 100%;
            font-size: $fontK;
            color: $colorB;
            font-weight: bold;
            margin-bottom: 0.18rem;
            @include textWidth();
            display: block;
          }
          .text_content {
            width: 100%;
            max-height: 0.56rem;
            line-height: 0.28rem;
            font-size: 0.21rem;
            color: #777777;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .content2 {
      width: 94%;
      margin: 0 auto;
      text-align: left;
      background: #fff;
      overflow: hidden;
      padding-bottom: 0.2rem;
      .works {
        width: 46%;
        height: 3.58rem;
        display: flex;
        flex-direction: column;
        padding: 0.27rem 0 0 0.26rem;
        box-sizing: border-box;
        float: left;
        margin-left: 2%;
        .img {
          width: 100%;
          height: 2.22rem;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .worksDetail {
          width: 100%;
          line-height: $fontJ;
          display: flex;
          flex-direction: row;
          margin-top: 0.21rem;
          .works_name {
            width: 90%;
            @include textWidth();
            font-size: 0.26rem;
            line-height: 0.28rem;
          }
          img {
            width: auto;
            height: 0.21rem;
            margin-right: 2%;
          }
          .num {
            color: #f05556;
            font-size: $fontJ;
          }
        }
        .user {
          width: 100%;
          line-height: 0.5rem;
          display: flex;
          flex-direction: row;
          margin-top: 0.14rem;
          img {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.5rem;
          }
          .user_name {
            width: 54%;
            padding-left: 3%;
            @include textWidth();
            font-size: $fontJ;
            box-sizing: border-box;
            color: #333333;
          }
          .submit {
            width: 30%;
            text-align: right;
            font-size: 0.18rem;
            color: #999999;
          }
        }
      }
    }
    .works_nav {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0 auto 0.27rem;
      font-size: $fontJ;
      color: #ffffff;
      text-align: center;
      div {
        height: 0.39rem;
        line-height: 0.4rem;
        padding: 0.08rem 0.24rem;
      }
      .btn {
        background: #fff;
        border-radius: 20px;
        color: $colorA;
      }
    }
  }
  .nav_img {
    width: 96%;
    margin: 0.22rem auto 0rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 1.96rem;
    }
  }
}
</style>
