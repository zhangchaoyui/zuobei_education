<template>
  <div class="logistics">
    <div class="title">
      <img src="../../public/images/icon14.png" alt />
      {{data.brand}}：{{data.no}}
    </div>
    <van-steps direction="vertical" :active="0">
      <van-step v-for="(item,index) in data.data" :key="index">
        <h3 class="status-content-latest">{{item.context}}</h3>
        <p class="status-time-latest">{{item.time}}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: "logistics",
  data() {
    return {
      id: this.$route.params.id,
      data: {}
    };
  },
  mounted() {
    this.http
      .post("/Tran/index", {
        id: this.id
      })
      .then(res => {
        console.log(res)
        this.data = res.data[0];
      });
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.logistics {
  .title {
    width: 95%;
    margin: 0 auto;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
    img {
      width: 0.39rem;
      height: 0.31rem;
      margin-right: 3%;
      margin-left: 6%;
    }
  }
  .van-steps--vertical {
    width: 90%;
    padding: 0 0 0 32px;
    margin: 0 auto;
    h3 {
      font-size: 0.26rem;
    }
    .van-step__title--active {
      color: black;
      font-weight: "微软雅黑";
    }
    .van-icon-checked::before {
      content: "\F02F";
      color: #f5bb0e;
    }
  }
}
</style>
