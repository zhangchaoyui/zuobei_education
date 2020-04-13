<template>
  <div class="news">
    <div class="title">{{data.post_title}}</div>
    <div class="time">{{data.published_time}}</div>
    <div>
      <div>
        <p v-html="post_content"></p>
      </div>
    </div>
  </div>
</template>
 
 <script>
 import util from '../util/util'
export default {
  name: "news",
  data() {
    return {
      id: this.$route.params.id,
      data: "",
      post_content: ""
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    //获取文章详情
    getDetail() {
      this.axios
        .get("/article/detail", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          this.data = res;
          this.post_content = util.showHtml(res.post_content);
        });
    },
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.news {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  .title {
    width: 100%;
    height: auto;
    font-size: 0.33rem;
    line-height: 0.5rem;
    color: #333333;
    margin-top: 0.56rem;
  }
  .time {
    width: 100%;
    font-size: 0.24rem;
    line-height: 0.6rem;
    color: #999999;
  }
}
</style>