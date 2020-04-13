<template>
  <div class="rules">
    <div v-html="title">{{title}}</div>
    <div v-html="post_content">{{post_content}}</div>
  </div>
</template>
 
 <script>
import util from "../util/util";
export default {
  name: "rules",
  data() {
    return {
      data: "",
      title: "",
      content: ""
    };
  },
  mounted() {
    this.axios.get("/article/rules", { params: {} }).then(res => {
      this.title = util.showHtml(res.post_title);
      this.post_content = util.showHtml(res.post_content);
    });
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.rules {
}
</style>