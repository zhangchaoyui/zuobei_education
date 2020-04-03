<template>
  <div class="personal">
    <div class="img">
      <img src="/images/logo.png" />
    </div>
    <div class="content" v-html="data">{{data}}</div>
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    this.axios.get("/article/about", { params: {} }).then(res => {
      console.log(res);
      this.data = this.showHtml(res.post_content);
    });
  },
  methods: {
    showHtml(str) {
      return str
        .replace(str ? /&(?!#?\w+;)/g : /&/g, "&amp;")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  },
  components: {}
};
</script>

<style lang="scss">
.personal {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url("/images/background10.png") repeat-y;
  background-size: 100%;
  margin: 0;
  .img {
    display: block;
    margin: 1rem auto 0;
    width: 2.4rem;
    height: 1.59rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: 88%;
    margin: 0.56rem auto 0;
    font-size: 0.26rem;
    line-height: 0.5rem;
    color: #555555;
  }
}
</style>
