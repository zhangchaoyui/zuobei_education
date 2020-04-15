<template>
  <div class="do_review">
    <div class="text">
      <textarea class="textarea" placeholder="输入内容~" v-model="value"></textarea>
    </div>
    <Btn btnType="1" sureText="发表" v-on:submit="fromData"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "do_review",
  data() {
    return {
      id: this.$route.params.id,
      value: "" //内容
    };
  },
  mounted() {},
  methods: {
    //老师评论
    fromData() {
      let { value, id } = this;
      if (value == "") {
        util.toast("请输入回复内容~");
        return;
      }
      util.Indicator("加载中");
      this.http
        .post("/works/do_review", {
          rid: id,
          token: this.$cookie.get("token"),
          content: value
        })
        .then(() => {
          util.toast("回复成功~");
          this.value = "";
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        });
    }
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
.do_review {
  width: 92%;
  margin: 0.1rem auto 0;
  height: auto;
  .text {
    width: 100%;
    .textarea {
      width: 100%;
      height: 3.2rem;
      margin-top: 0.1rem;
      padding: 0.1rem;
      box-sizing: border-box;
      border: none;
      resize: none;
      color: #333;
      font-size: 0.28rem;
    }
  }
}
</style>
