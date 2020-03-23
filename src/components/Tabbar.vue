<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="MainPage">
      <img slot="icon" :src="this.atabs[0]" />
      主页
    </mt-tab-item>
    <mt-tab-item id="ShoppingList">
      <img slot="icon" v-bind:src="this.atabs[1]" />
      上传作品
    </mt-tab-item>
    <mt-tab-item id="GroupList">
      <img slot="icon" v-bind:src="this.atabs[2]" />
      作品排行
    </mt-tab-item>
    <mt-tab-item id="UserCenter">
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
      atabs: this.tabs
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
        case "首页":
          this.$router.push("/");
          break;
        case "上传作品  ":
          this.$router.push("/shoppinglist");
          break;
        case "作品排行":
          this.$router.push("/grouplist");
          break;
        case "我的":
          this.$router.push("/usercenter");
          break;
      }
    }
  }
};
</script>