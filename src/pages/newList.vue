<template>
  <div class="newList">
    <!-- 文章详情 -->
    <div class="articleList">
      <div class="title">
        <div class="title_content">
          <img src="/images/icon30.png" />文章资讯
        </div>
      </div>
      <div
        class="content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30"
      >
        <div class="from" @click="news(item.id)" v-for="(item,index) in data" v-bind:key="index">
          <div class="img">
            <img v-lazy="item.thumbnail" />
          </div>
          <div class="text">
            <div class="title">{{item.post_title}}</div>
            <div class="text_content">{{item.post_content}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="loading-box tc" v-if="isLoading">
        <mt-spinner type="snake" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
      </div>-->
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "newList",
  data() {
    return {
      data: [],
      loading: true,
      page: 1
    };
  },
  mounted() {
    this.loading = true;
    this.getDetail();
  },
  methods: {
    //获取文章详情
    getDetail() {
      this.axios
        .get("/article/index", {
          params: {
            page: this.page,
            limit: 6
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.length <= 0) {
            console.log("为空不走f");
            this.loading = true;
          } else {
            this.loading = false;
          }
          this.data = this.data.concat(res.data);
        });
    },
    //跳转文章资讯
    news(e) {
      this.$router.push(`/news/${e}`);
    },

    loadMore() {
      this.loading = true;
      ++this.page;
      setTimeout(() => {
        this.getDetail();
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.newList {
  .articleList {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 0.14rem;
    background: url("/images/background10.png") repeat-y;
    background-size: 100% 100%;
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
      min-height: 95vh;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      text-align: left;
      background: #fff;
      border-radius: 10px;
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
        margin-left: 1%;
        img {
          width: auto;
          height: 2.22rem;
          border-radius: 5px;
          overflow: hidden;
        }
        .worksDetail {
          width: 100%;
          line-height: $fontJ;
          display: flex;
          flex-direction: row;
          margin-top: 0.21rem;
          .works_name {
            width: 78%;
            @include textWidth();
            font-size: 0.26rem;
            line-height: 0.28rem;
          }
          img {
            width: auto;
            height: 0.21rem;
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
            width: 28%;
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
}
</style>