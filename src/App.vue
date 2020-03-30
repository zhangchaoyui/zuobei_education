<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.axios.post("/login/index", {}).then(res => {
      console.log(res)
      this.$cookie.set("token", res, { expires: "Session" });
      this.$store.dispatch("userType", res);
    });
  },
  methods: {}
};
</script>

<style>
</style>
