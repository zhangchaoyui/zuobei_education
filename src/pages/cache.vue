<template>
  <div class="register">
    <button @click="click">清除缓存</button>
  </div>
</template>
 <script>
import stroage from "../stroage/index";
export default {
  name: "cache",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    click() {
      stroage.setItem("status", 0);
      this.$cookie.delete("token");
      this.$cookie.delete("user_type");
      setTimeout(() => {
        window.location.replace("/#/");
      }, 2000);
    }
  },
  components: {}
};
</script>

<style lang="scss">
</style>