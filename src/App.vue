<template>
  <router-view></router-view>
</template>

<script>
import storage from "./stroage/index";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.axios.post("/login/index", {}).then(res => {
      console.log(res);
      this.$cookie.set("token", res.data, { expires: "Session" });
      storage.setItem("userType", res.code);
    });
  },
  methods: {}
};
</script>

<style>
</style>
