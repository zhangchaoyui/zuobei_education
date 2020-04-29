<template>
  <div class="search">
    <div class="search2">
      <img src="../../public/images/search.png" alt />
      <input type="text" placeholder="请输入搜索作品名称"  v-model="value"/>
      <div @click="search">搜索</div>
    </div>
    <!-- 作品列表 -->
    <div class="articleList" v-if="data.length>0">
      <div class="title">
        <div class="title_content">
          <img src="../../public/images/icon39.png" />作品列表
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
    <div class="mask" v-if="value!=''&&data.length<=0">暂无搜索作品</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      value: "",
      data: [],
      mask: true
    };
  },
  mounted() {},
  methods: {
    blurIn() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },
    search() {
      this.http
        .post("/Works/index", {
          key: this.value
        })
        .then(res => {
          this.data = res;
        });
    },

    worksDetail(id) {
      this.$router.push(`/worksdetail/${id}`);
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
  .search2 {
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
    font-size: 0.26rem;
    img {
      width: 0.26rem;
      height: 0.26rem;
      margin-left: 5%;
      margin-right: 3%;
    }
    input {
      width: 70%;
      border: none;
      padding-left: 3%;
      background: none;
      height: 100%;
    }
    div {
      margin-left: 2%;
      color: #f5bb0e;
    }
  }

  .articleList {
    width: 100%;
    height: auto;
    padding-bottom: 0.14rem;
    background: url("../../public/images/background10.png");
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
  .mask {
    width: 100%;
    height: 50vh;
    line-height: 50vh;
    font-size: 0.28rem;
    text-align: center;
    color: #cccccc;
  }
}
</style>
