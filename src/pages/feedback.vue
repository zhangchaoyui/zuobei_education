<template>
  <div class="feedback">
    <div class="text">
      <textarea class="textarea" placeholder="说出你对小小发明家的建议和问题..." v-model="value"></textarea>
    </div>
    <Btn btnType="1" sureText="发表" v-on:submit="postValue"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "feedback",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    //提交用户内容
    postValue() {
      this.http
        .post("/article/back", {
          content: this.value,
          token: this.$cookie.get("token")
        })
        .then(() => {
          util.toast("反馈成功~");
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
.feedback {
  width: 92%;
  margin: 0.1rem auto 0;
  height: 98vh;
  background: #fff;
  .text {
    width: 100%;

    .textarea {
      width: 100%;
      height: 5.2rem;
      margin-top: 0.1rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border: none;
      resize: none;
      color: #333;
      font-size: 0.28rem;
      background: #f6f6f6;
      border-radius: 0.2rem;
    }
  }
}
</style>
