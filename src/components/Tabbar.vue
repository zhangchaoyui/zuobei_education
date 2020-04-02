<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="index">
      <img slot="icon" :src="this.atabs[0]" />
      主页
    </mt-tab-item>
    <mt-tab-item id="upload">
      <img slot="icon" v-bind:src="this.atabs[1]" />
      上传作品
    </mt-tab-item>
    <mt-tab-item id="worksList" >
      <img slot="icon" v-bind:src="this.atabs[2]" />
      作品排行
    </mt-tab-item>
    <mt-tab-item id="user" >
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
          window.location.replace("/#/");
          break;
        case "upload":
          window.location.replace("/#/upload");
          break;
        case "worksList":
          window.location.replace("/#/worksList");
          break;
        case "user":
          window.location.replace("/#/mine");
          break;
      }
    }
  }
};
</script>
<style lang='scss'>
  .is-selected {
    color: #f5bb0e !important;
  }
</style>