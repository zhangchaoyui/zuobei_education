<template>
  <div class="search">
    <form action v-on:submit.prevent>
      <mt-search
        v-model="value"
        placeholder="请输入查询作品名称"
        @keyup.enter.native="search"
        class="font-size-8"
      ></mt-search>
    </form>
    <!-- 作品列表 -->
    <div class="articleList" v-if="data=={}">
      <div class="title">
        <div class="title_content">
          <img src="/images/icon39.png" />作品列表
        </div>
      </div>
      <div class="content2">
        <div
          class="works"
          @click="worksDetail(item.id)"
          v-for="(item,index) in data"
          v-bind:key="index"
        >
          <img v-lazy="item.image" />
          <div class="worksDetail">
            <div class="works_name">{{item.title}}</div>
            <img src="/images/fabulous_red.png" style="border-radius:0" />
            <div class="num">{{item.praise}}</div>
          </div>
          <div class="user">
            <img src="/images/user.jpg" />
            <div class="user_name">{{item.name}}</div>
            <div class="submit">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      value: "",
      data: {}
    };
  },
  mounted() {},
  methods: {
    blurIn() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },
    search() {
      console.log(111);
      this.http
        .post("/Works/index", {
          key: this.value
        })
        .then(res => {
          console.log(res);
          this.data = res;
        });
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.search {
  width: 96%;
  margin: 0.1rem auto 0;
  background: #fff;
  padding-bottom: 1.1rem;
  .mint-search {
    height: auto;
    margin-top: 0.2rem;
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

  .articleList {
    width: 100%;
    height: auto;
    padding-bottom: 0.14rem;
    background: url("/images/background10.png");
    background-size: 100%;
    box-sizing: border-box;
    margin-top: 5%;
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
