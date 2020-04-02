<template>
  <div class="rules">
      <div>{{data}}</div>
  </div>
</template>
 
 <script>
export default {
  name: "rules",
  data() {
    return {
        data:''
    };
  },
  mounted() {
    this.axios.get("/article/rules", { params: {} }).then(res => {
      this.data = res.data;
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