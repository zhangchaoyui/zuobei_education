<template>
  <div class="news">
    <div class="title">源自英国Iittle inventors小小发明家</div>
    <div class="time">2020-03-19</div>
    <div></div>
  </div>
</template>
 
 <script>
export default {
  name: "news",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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