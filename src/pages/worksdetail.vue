 <template>
  <div class="worksdetail">
    <div class="header">
      <div class="header_img">
        <img v-bind:src="data.result.avatar" alt />
      </div>
      <div class="header_userinfo">
        <span>{{data.result.nickname}}</span>
        <!-- <span>14分钟前</span> -->
        <span>{{data.result.time}}</span>
      </div>
      <div class="header_right">
        <img src="/images/fabulous_red.png" alt />
        {{data.result.praise}}
      </div>
    </div>
    <div class="works_title">{{data.result.title}}</div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in data.result.image" :key="index">
        <img v-lazy="item" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="br"></div>
    <div class="evaluate">
      <div class="title">
        <span>留言</span>
      </div>
      <div class="evaluate_list">
        <div class="evaluate_detail" v-for="(item,index) in data.message" :key="index">
          <div class="evaluate_img">
            <img v-bind:src="item.avatar" alt />
          </div>
          <div class="evaluate_title">
            <div class="top">
              <div class="title_left">{{item.nickname}}</div>
              <div class="title_right">{{item.time}}</div>
            </div>
            <div class="evaluate_content">{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="br2"></div>
    <div class="bottom">
      <div class="user">
        <img src="/images/user.jpg" alt />
        小新老师
      </div>
      <!-- <div class="content">他把具有丰富想象力的4-14岁的小朋友聚集在一起，通过头脑风碌、发明课程，把世界变成我们他把具有丰富…</div> -->
      <div class="content">
        <div class="voice">
          <img src="/images/icon28.png" alt />
          收听老师点评
        </div>
      </div>
      <div class="icon">
        <div>
          <img src="/images/icon5.png" alt />分享
        </div>
        <div>
          <img
            src="/images/icon30.png"
            @touchstart="recording($event)"
            @touchmove="touchend($event)"
            @touchend="endVoice"
          />留言
        </div>
        <div>
          <img src="/images/fabulous.png" alt />点赞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
let START,END,recordTimer,voice={};
export default {
  name: "worksdetail",
  data() {
    return {
      id: this.$route.params.id,
      data: {}
    };
  },
  mounted() {
    // util.login(); 判断用户登录
    this.getWorksDetail();
  },
  methods: {
    //获取作品详情
    getWorksDetail() {
      this.axios
        .get("/works/detail", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.data = res;
        });
    },

    //录音功能
    recording(event) {
      event.preventDefault();
      START = new Date().getTime();
      recordTimer = setTimeout(function() {
        wx.startRecord({
          success: function(res) {
            console.log(res)
            // localStorage.rainAllowRecord = "true";
          },
          cancel: function() {
            alert("用户拒绝授权录音");
          }
        });
      }, 300);
    },
    //松手结束录音
    touchend(event) {
      event.preventDefault();
      END = new Date().getTime();
      if (END - START < 300) {
        END = 0;
        START = 0;
        //小于300ms，不录音
        clearTimeout(recordTimer);
      } else {
        wx.stopRecord({
          success: function(res) {
            voice.localId = res.localId;
            this.uploadVoice();
          },
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        });
      }
    },

    //上传录音
    uploadVoice() {
      //调用微信的上传录音接口把本地录音先上传到微信的服务器
      //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
      wx.uploadVoice({
        localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          console.log(res)
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          this.http
            .post('', {
              data: JSON.stringify(res)
            })
            .then(res => {
              console.log(res);
            });
        }
      });
    },
    endVoice() {
      //注册微信播放录音结束事件【一定要放在wx.ready函数内】
      wx.onVoicePlayEnd({
        success: function(res) {
          console.log(res);
          // stopWave();
        }
      });
    },

    //分享功能
    initShareInfo(wx) {
      let shareInfo = {
        title: "慕课支付分享专项课程", // 分享标题
        desc: "欢迎学习慕课支付分享专项课程", // 分享描述
        link: "http://m.51purse.com/#/index", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: "" // 分享图标
      };
      wx.onMenuShareAppMessage(shareInfo);
      wx.onMenuShareTimeline(shareInfo);
      wx.onMenuShareQQ(shareInfo);
      wx.onMenuShareQZone(shareInfo);
      // wx.updateAppMessageShareData(shareInfo);
      // wx.updateTimelineShareData(shareInfo);
    }
  },
  created() {
    this.axios
      .post("/token/responseMsg", { url: location.href.split("#")[0] })
      .then(res => {
        console.log(res);
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: parseInt(res.data.timestamp),
          nonceStr: res.data.nonceStr,
          signature: res.data.signanonceStrture,
          jsApiList: [
            "startRecord",
            "stopRecord",
            "onVoicePlayEnd",
            "uploadVoice"
          ]
        });
        wx.ready(function() {
          console.log("ready");
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.worksdetail {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  .header {
    width: 90%;
    height: 1.01rem;
    overflow: hidden;
    padding: 0.32rem 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .header_img {
      width: 1.01rem;
      height: 1.01rem;
      border-radius: 1.05rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header_userinfo {
      width: 60%;
      height: 100%;
      padding-left: 2%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      span:first-child {
        color: #333333;
        font-size: 0.3rem;
        line-height: 0.4rem;
        margin-top: 0.21rem;
        @include textWidth();
      }
      span:last-child {
        color: #999999;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
    }
    .header_right {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 0.34rem;
      color: #f05556;
      img {
        display: block;
        margin-top: -0.1rem;
        width: 0.32rem;
        height: 0.34rem;
        margin-right: 5%;
      }
    }
  }
  .works_title {
    width: 90%;
    margin: 0 auto;
    height: auto;
    font-size: 0.36rem;
    color: #333333;
    line-height: 0.5rem;
  }
  .mint-swipe {
    width: 90%;
    margin: 0 auto;
    height: 4.15rem;
    overflow: hidden;
    margin: 0.37rem auto;
    img {
      width: 100%;
      height: 4.15rem;
    }
  }
  .br {
    width: 100%;
    height: 0.18rem;
    background: #f9f9f9;
  }
  .evaluate {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 100%;
      line-height: 0.5rem;
      font-size: 0.3rem;
      padding: 0 0 0.01rem 5%;
      box-sizing: border-box;
      color: #333333;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: left;
      span {
        text-align: center;
        display: inline-block;
        width: 10%;
        padding: 0.15rem 0.1rem 0.1rem;
        border-bottom: 2px solid #e8b92b;
      }
    }
    .evaluate_list {
      width: 90%;
      height: auto;
      margin: 0.1rem auto;
    }
    .evaluate_detail {
      width: 100%;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      .evaluate_img {
        overflow: hidden;
        img {
          width: 0.62rem;
          height: 0.62rem;
          border-radius: 0.3rem;
        }
      }
      .evaluate_title {
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
          width: 100%;
          height: 0.4rem;
          display: flex;
          flex-direction: row;
          margin-top: 0.17rem;
          margin-left: 0.2rem;
          .title_left {
            width: 50%;
            font-size: 0.24rem;
            line-height: 0.4rem;
            color: #777777;
          }
          .title_right {
            width: 51%;
            text-align: right;
            font-size: 0.24rem;
            line-height: 0.4rem;
            color: #777777;
          }
        }
        .evaluate_content {
          width: 100%;
          height: auto;
          line-height: 0.33rem;
          margin-left: 0.2rem;
          font-size: 0.23rem;
          color: #444444;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
    .evaluate_detail:last-child {
      .evaluate_content {
        border: none;
      }
    }
  }
  .br2 {
    width: 100%;
    height: 3.33rem;
  }
  .bottom {
    width: 100%;
    height: 3.2rem;
    position: fixed;
    bottom: 0;
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    background: #f6bc0e;
    .user {
      width: 90%;
      height: 0.77rem;
      display: flex;
      flex-direction: row;
      line-height: 0.77rem;
      font-size: 0.35rem;
      color: white;
      margin: 0.33rem auto 0.2rem;
      img {
        width: 0.77rem;
        height: 0.77rem;
        margin-right: 0.2rem;
        border-radius: 0.38rem;
      }
    }
    .content {
      width: 86%;
      // height: 0.77rem;
      font-size: 0.25rem;
      color: white;
      margin: 0 auto;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      .voice {
        width: 80%;
        height: 0.95rem;
        line-height: 1rem;
        margin: 0 auto;
        background: white;
        border-radius: 0.6rem;
        display: flex;
        align-items: center;
        color: #f6bc0e;
        font-size: 0.25rem;
        img {
          width: 0.3rem;
          height: 0.46rem;
          margin: 0.25rem 0.32rem 0.25rem 0.38rem;
        }
      }
    }
    .icon {
      width: 90%;
      height: 0.28rem;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      div {
        width: 33.33%;
        font-size: 0.23rem;
        display: flex;
        justify-content: center;
        position: relative;
        color: white;
        margin-top: 0.3rem;
        &::before {
          width: 1px;
          height: 0.28rem;
          background: white;
          content: "";
          position: absolute;
          top: 0;
          right: 0;
        }
        &:last-child::before {
          width: 0;
          height: 0;
        }
        img {
          width: 0.3rem;
          height: 0.28rem;
          vertical-align: middle;
          margin-right: 2%;
        }
      }
    }
  }
}
</style>
