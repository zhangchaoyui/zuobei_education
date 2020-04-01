<template>
  <div class="upload">
    <div class="text">
      <textarea class="textarea" placeholder="输入你作品的标题…"></textarea>
    </div>
    <div class="img">
      <!-- <div class="img_cloumn">
        <img src="/images/icon38.png" />
      </div>-->
      <div class="img_cloumn">
        <img src="/images/icon38.png" />
        <input type="file" capture="camera" @click="fileClick()" id="upload_file" />
      </div>
      <div class="img_cloumn">
        <img src="/images/icon38.png" />
        <input type="file" capture="camera" @click="fileClick()" id="upload_file" accept="image/*" />
      </div>
    </div>
    <Btn btnType="1" sureText="发表"></Btn>
    <Tabbar :selected="selected" :tabs="tabs" :nav="2"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";
import Btn from "../components/Button";
export default {
  name: "upload",
  data() {
    return {
      selected: "上传作品",
      tabs: [
        require("../../public/images/icon40.png"),
        require("../../public/images/icon9_yellow.png"),
        require("../../public/images/icon10.png"),
        require("../../public/images/icon11.png")
      ],
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0
    };
  },
  methods: {
    fileClick() {
      // wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function(res) {
      //     console.log(res);
      //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //   }
      // });
    }
  },
  components: {
    Tabbar,
    Btn
  }
};
</script>

<style lang="scss">
.upload {
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
  .img {
    width: 100%;
    display: flex;
    clear: both;
    padding-bottom: 0.64rem;
    border-bottom: 1px solid #e5e5e5;
    flex-wrap: wrap;
    .img_cloumn {
      height: auto;
      position: relative;
      margin-left: 0.23rem;
      img {
        width: 2.09rem;
        height: 2.09rem;
      }
      input {
        width: 2.09rem;
        height: 2.09rem;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
}
</style>
