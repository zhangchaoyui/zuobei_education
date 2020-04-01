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
      this.$cookie.set("token", res, { expires: "Session" });
    });
  },
  methods: {}
};
</script>

<style>
</style>
