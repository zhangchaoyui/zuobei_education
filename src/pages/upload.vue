<template>
  <div class="upload">
    <div class="text">
      <textarea class="textarea" placeholder="输入你作品的标题…" v-model="value"></textarea>
    </div>
    <div class="img">
      <div class="img_cloumn" v-for="(item,index) in showImg" :key="index">
        <img v-bind:src="item" />
      </div>
      <div class="img_cloumn" v-if="imgList.length<=3">
        <img src="/images/icon38.png" @click="onClickUp" />
      </div>
    </div>
    <Btn btnType="1" sureText="发表" v-on:submit="fromData"></Btn>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "upload",
  data() {
    return {
      imgList: [], //图片列表
      showImg: [], //图片显示列表
      value: "", //内容
      title: "" //title
    };
  },
  methods: {
    //选择图片
    onClickUp() {
      let that = this;
      // util.Indicator("加载中");
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              Indicator.close();
              var serverId = res.serverId; // 返回图片的服务器端ID
              that.imgList.push(serverId);
              // wx.downloadImage({
              //   serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
              //   isShowProgressTips: 1, // 默认为1，显示进度提示
              //   success: function(res) {
              //     var localId = res.localId; // 返回图片下载后的本地ID
              //     this.showImg.push(showImg);
              //   }
              // });
            }
          });
        }
      });
    },

    //上传
    fromData() {
      let { value, imgList } = this;
      this.http
        .post("/works/work", {
          title: "111",
          value,
          image: imgList
        })
        .then(res => {
          alert(res);
          console.log(res);
          // util.toast("登陆成功~");
        });
    }
  },

  created() {
    this.axios
      .post("/token/sdksign", { url: location.href.split("#")[0] })
      .then(res => {
        wx.config({
          debug: true,
          appId: res.appid,
          timestamp: parseInt(res.timestamp),
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["chooseImage", "uploadImage", "downloadImage"]
        });
        wx.ready(function() {
          console.log("ready");
        });
        wx.error(function() {
          console.log(res);
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
      margin-left: 0.18rem;
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
