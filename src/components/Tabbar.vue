<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="index" v-bind:class="{'color':nav==1}">
      <img slot="icon" :src="this.atabs[0]" />
      主页
    </mt-tab-item>
    <mt-tab-item id="upload" v-bind:class="{'color':nav==2}">
      <img slot="icon" v-bind:src="this.atabs[1]" />
      上传作品
    </mt-tab-item>
    <mt-tab-item id="worksList" v-bind:class="{'color':nav==3}">
      <img slot="icon" v-bind:src="this.atabs[2]" />
      作品排行
    </mt-tab-item>
    <mt-tab-item id="user" v-bind:class="{'color':nav==4}">
      <img slot="icon" v-bind:src="this.atabs[3]" />
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  data() {
    return {
      //选中的tabbar值message为外面页面传入的值selected
      message: this.selected,
      //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
      atabs: this.tabs,
      nav: this.nav
    };
  },
  props: {
    selected: String,
    tabs: Array
  },
  watch: {
    message: function(val) {
      // 这里就可以通过 val 的值变更来确定去向
      switch (val) {
        case "index":
          this.$router.push("/");
          break;
        case "upload":
          this.$router.push("/upload");
          break;
        case "worksList":
          this.$router.push("/worksList");
          break;
        case "user":
          this.$router.push("/mine");
          break;
      }
    }
  }
};
</script>
<style lang='scss'>
.color {
  color: #f5bb0e;
}
</style>