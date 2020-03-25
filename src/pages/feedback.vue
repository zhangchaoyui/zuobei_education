<template>
  <div class="feedback">
    <div class="text">
      <textarea class="textarea" placeholder="说出你对小小发明家的建议和问题..."></textarea>
    </div>
    <Btn btnType="1" sureText="发表"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
export default {
  name: "feedback",
  data() {
    return {
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0
    };
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
