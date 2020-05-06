<template>
  <div class="comment">
    <div class="img">
      <img :src="review.image" alt />
    </div>
    <div class="content">
      <span></span>
      {{review.content}}
    </div>
  </div>
</template>

<script>
import util from "../util/util";
export default {
  name: "comment",
  data() {
    return {
      review: ""
    };
  },
  mounted() {
    this.getWorksDetail();
  },
  methods: {
    //获取作品详情
    getWorksDetail() {
      util.Indicator("加载中");
      this.http
        .post("/works/detail", {
          id: this.$route.params.id,
          token: this.$cookie.get("token") || ""
        })
        .then(res => {
          console.log(res);
          this.review = res.review || {};
          console.log(this.review);
        });
    }
  },
  components: {}
};
</script>

<style lang="scss">
.comment {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .img {
    width: 90%;
    margin: 0.4rem auto;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .content {
    width: 90%;
    font-size: 0.26rem;
    margin: 0 auto;
    font-weight: "微软雅黑";
    font-weight: 500;
  }
}
</style>
