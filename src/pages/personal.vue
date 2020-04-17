<template>
  <div class="personal">
    <div class="img" @click="onClickUp()">
      <img :src="img" />
      点击修改头像
    </div>
    <div class="br"></div>
    <div class="info">
      <div class="name">
        <span>用户名</span>
        <input type="text" v-model="username" />
      </div>
      <div class="name">
        <span>手机号</span>
        <input type="text" v-model="tel" />
      </div>
      <div class="name">
        <span>个人介绍</span>
        <input type="text" v-model="introduce" />
      </div>
    </div>
    <Btn btnType="1" sureText="保存" v-on:submit="submintData"></Btn>
  </div>
</template>

<script>
import Btn from "../components/Button";
import util from "../util/util";
import wx from "weixin-js-sdk";
export default {
  name: "personal",
  data() {
    return {
      username: "",
      tel: "",
      introduce: "",
      imgList: "",
      img: "",
      imgaesMaxLenght: 1
    };
  },
  mounted() {
    this.getMineInfo();
  },
  methods: {
    //获取个人信息
    getMineInfo() {
      this.http
        .post("/personal/edit", {
          token: this.$cookie.get("token")
        })
        .then(res => {
          this.introduce = res.content;
          this.tel = res.mobile;
          this.username = res.name;
          this.img = res.avatar;
        });
    },

    //选择图片
    onClickUp() {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.wxuploadImage(localIds);
        },
        fail: function() {
          console.log("失败");
        }
      });
    },

    wxuploadImage(localIds) {
      let that=this;
      var upload = function() {
        let loacId = localIds[0];
        if (window.__wxjs_is_wkwebview) {
          if (loacId.indexOf("wxlocalresource") != -1) {
            loacId = loacId.replace("wxlocalresource", "wxLocalResource");
          }
        }
        wx.uploadImage({
          localId: loacId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function(res) {
            that.submintImg(res.serverId);
          },
          fail: function() {
            alert("失败11");
          }
        });
      };
      upload();
    },

    //用户提交信息
    submintData() {
      let { username, tel, introduce } = this;
      util.Indicator("加载中");
      this.http
        .post("/Personal/editpost", {
          token: this.$cookie.get("token"),
          name: username,
          mobile: tel,
          content: introduce
        })
        .then(res => {
          if (res) {
            util.toast("提交成功~");
          }
        });
    },

    submintImg(serverId) {
      this.axios
        .post("/login/image", {
          token: this.$cookie.get("token"),
          serverid: serverId
        })
        .then(res => {
            util.toast("上传成功~");
            setTimeout(() => {
              this.getMineInfo();
            }, 1500);
        });
    }
  },
  components: {
    Btn
  },
  created() {
    util.login(); //判断用户登录
    this.axios
      .post("/token/sdksign", { url: location.href.split("#")[0] })
      .then(res => {
        wx.config({
          debug: false,
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
  }
};
</script>

<style lang="scss">
.personal {
  width: 100%;
  margin: 0.1rem auto 0;
  height: auto;
  .img {
    width: 1.8rem;
    height: auto;
    position: relative;
    margin: 0 auto;
    display: block;
    padding: 0.55rem 0 0.35rem;
    text-align: center;
    font-size: 0.25rem;
    line-height: 0.5rem;
    color: #999999;
    img {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 1rem;
      overflow: hidden;
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
  .br {
    width: 100%;
    height: 0.18rem;
    background: #f6f6f6;
  }
  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    font-size: 0.28rem;
    .name {
      width: 90%;
      line-height: 0.5rem;
      margin: 0 auto;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.3rem 0;
      &:first-child {
        padding-top: 1rem;
      }
      &:last-child {
        padding-bottom: 0.5rem;
      }
      span {
        &:first-child {
          width: 18%;
          text-align: left;
        }
        &:last-child {
          width: 78%;
          margin-left: 2%;
          text-align: left;
          color: #999999;
        }
      }
      input {
        border: none;
        width: 78%;
        font-size: 0.26rem;
      }
    }
  }
}
</style>
