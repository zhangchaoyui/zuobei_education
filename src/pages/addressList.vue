<template>
  <div class="addressList">
   
  </div>
</template>
<script>
export default {
  name: "addressList",
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
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.addressList {
  
}
</style>
