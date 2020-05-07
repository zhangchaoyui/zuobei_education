<template>
  <div class="myworks">
    <!-- 作品列表 -->
    <div class="articleList">
      <div class="title">
        <div class="title_content">
          <img src="../../public/images/icon39.png" />我的作品集
        </div>
      </div>
      <div class="content2" v-if="data.length>0">
        <div class="works" v-for="(item,index) in data " :key="index" @click="worksDetail(item.id)">
          <div class="img">
            <img v-lazy="item.image" />
          </div>
          <div class="worksDetail">
            <div class="works_name">{{item.title}}</div>
            <img src="../../public/images/fabulous_red.png" alt />
            <div class="num">{{item.praise}}</div>
          </div>
          <div class="user">
            <img :src="item.avatar" alt />
            <div class="user_name">{{item.nickname}}</div>
            <div class="submit">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "myworks",
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.axios
      .post("personal/works", {
        token: this.$cookie.get("token")
      })
      .then(res => {
        this.data = res.data;
      });
  },
  methods: {
    worksDetail(id) {
      this.$router.push(`/worksDetail/${id}`);
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.myworks {
  .articleList {
    width: 96%;
    min-height: 98vh;
    background: url("../../public/images/background10.png") repeat-y;
    background-size: 100% 100%;
    margin: 0.2rem auto 0;
    .title {
      width: 100%;
      display: flex;
      flex-direction: row;
      position: relative;
      overflow: hidden;
      .title_content {
        height: 0.36rem;
        line-height: 0.36rem;
        display: flex;
        flex-direction: row;
        margin: 0.33rem auto 0.3rem;
        font-size: 0.31rem;
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
          border-radius: 10px;
          img {
            display: inline-block;
            width: auto;
            height: 1.5rem;
            vertical-align: middle;
          }
        }
        .text {
          width: 70%;
          margin-left: 3%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          .title {
            width: 100%;
            font-size: $fontK;
            color: $colorB;
            font-weight: bold;
            margin-bottom: 0.18rem;
            @include textWidth();
          }
          .text_content {
            width: 100%;
            max-height: 0.56rem;
            line-height: 0.28rem;
            font-size: 0.16rem;
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
            width: 50%;
            padding-left: 3%;
            @include textWidth();
            font-size: $fontJ;
            box-sizing: border-box;
            color: #333333;
          }
          .submit {
            font-size: 0.18rem;
            color: #999999;
            width: 30%;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>