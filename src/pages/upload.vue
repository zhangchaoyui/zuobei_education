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
        <img v-bind:src="localIds" />
        <input type="file" capture="camera" @click="fileClick" id="upload_file" />
      </div>
      <div class="img_cloumn">
        <img src="/images/icon38.png" />
        <input type="file" capture="camera" id="upload_file" accept="image/*" />
      </div>
    </div>
    <Btn btnType="1" sureText="发表" v-on:submit="fileClick"></Btn>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import Btn from "../components/Button";
export default {
  name: "upload",
  data() {
    return {
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0,
      localIds:''
    };
  },
  methods: {
    fileClick() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log(res);
          alert(res);
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    }
  },
  created() {
    console.log(location.href)
    this.axios
      .post("/token/sdksign", { url: location.href })   //.split("#")[0]
      .then(res => {
        // console.log(res);
        wx.config({
          debug: true,
          appId: res.appid,
          timestamp: parseInt(res.timestamp),
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["chooseImage", "previewImage", "uploadImage"]
        });
        wx.ready(function() {
          // console.log(1);
          // console.log("ready");
        });
        wx.error(function(res) {
          // console.log(2);
          // console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      });
  },
  components: {
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
