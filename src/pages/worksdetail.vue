 <template>
  <div class="worksdetail">
    <div class="header">
      <div class="header_img">
        <img v-image-preview :src="result.avatar" alt />
      </div>
      <div class="header_userinfo">
        <span>{{result.nickname}}</span>
        <!-- <span>14分钟前</span> -->
        <span>{{result.time}}</span>
      </div>
      <div class="header_right" v-if="result.like==1">
        <img src="/images/fabulous_red.png" />
        {{result.praise}}
      </div>
      <div class="header_right2" v-else @click="Fabulous">
        <img src="/images/fabulous_ccc.png" />
        {{result.praise}}
      </div>
    </div>
    <div class="works_title">{{result.title}}</div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in result.image" :key="index">
        <img v-image-preview :src="item" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="br"></div>
    <div class="evaluate">
      <div class="title">
        <span>留言</span>
      </div>
      <div class="evaluate_list" v-if="message.length>0">
        <div class="evaluate_detail" v-for="(item,index) in message" :key="index">
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
      <div class="evaluate_empty" v-if="message.length<=0">暂无留言</div>
    </div>
    <div class="br2"></div>
    <!-- 客户端 -->
    <div class="bottom" v-if="Usertype==1">
      <div class="user" v-if="review.nickname">
        <img :src="review.avatar" v-image-preview />
        {{review.nickname}}
        <span v-if="review.reply==1" @click="do_review(review.id)">回复</span>
      </div>
      <div class="content" v-if="review.type==1&&review!=null">
        <div class="postion" v-if="review.image">
          <img :src="review.image" v-image-preview alt />
        </div>
        {{review.content}}
      </div>
      <div class="content" v-else-if="review.type==2&&review!=null">
        <div class="voice" @click="myplay">
          <img src="/images/icon28.png" alt />
          <audio :src="review.content" controls="controls" class="audio" id="audio"></audio>
          <span v-if="play">点击收听老师点评</span>
          <span v-else>播放语音中</span>
        </div>
      </div>
      <div class="icon">
        <div @click="initShareInfo">
          <img src="/images/icon5.png" alt />分享
        </div>
        <div @click="text(id)">
          <img src="/images/icon30.png" />留言
        </div>
        <div @click="Fabulous">
          <img src="/images/fabulous.png" />点赞
        </div>
      </div>
    </div>
    <!-- 老师未点评 -->
    <div class="bottom2" v-if="Usertype==2&&!review.content">
      <div class="user">
        <img src="/images/user.jpg" />
        我要点评
      </div>
      <div class="icon">
        <div @click="text(id)">
          <img src="/images/icon17.png" />文字点评
        </div>
        <div @click="showMask=!showMask">
          <img src="/images/icon30.png" />语音点评
        </div>
        <div @click="initShareInfo">
          <img src="/images/icon5.png" />分享
        </div>
      </div>
    </div>
    <!-- 老师点评完 -->
    <div class="bottom" v-if="Usertype==2&&review.content">
      <div class="user">
        <img :src="review.avatar" v-image-preview />
        {{review.nickname}}
        <div @click="initShareInfo">
          <img src="/images/fabulous.png" />分享
        </div>
      </div>
      <div class="content" v-if="review.type==1">
        <div class="postion" v-if="review.image">
          <img :src="review.image" v-image-preview alt />
        </div>
        {{review.content}}
      </div>
      <div class="content" v-else-if="review.type==2">
        <div class="voice" @click="myplay">
          <img src="/images/icon28.png" alt />
          <audio :src="review.content" controls="controls" class="audio" id="audio"></audio>
          <span v-if="play">点击收听老师点评</span>
          <span v-else>播放语音中</span>
        </div>
      </div>
    </div>

    <!-- 录音 -->
    <div class="Mask" v-show="showMask" @click="showMask=!showMask"></div>
    <div class="Eject" v-show="showMask">
      <img src="/images/icon47.png" v-if="isVoice ==0" />
      <div class="vm-voice-box" v-if="isVoice ==0">
        <p v-show="!isVoice" @click="voiceStart">点击录音</p>
      </div>

      <div class="vm-voice-player" v-if="isVoice ==1">
        <img src="/images/icon48.png" />
        <div class="suspend" @click="voiceEnd">| |</div>
      </div>

      <!-- // isListen  // 0-未试听/试听结束 1-试听中 2-暂停试听
      // 录完音 按钮展示-->
      <div class="vm-voice-player" v-if="isVoice == 2">
        <img src="/images/icon48.png" />
        <div class="vm-vp-button">
          <p class="vm-vp-revoice" @click="Reset">重录</p>
          <p class="vm-vp-submit" :class="{'vm-vp-no-submit' : isSubmit}" @click="voiceHandle()">提交</p>
          <p class="vm-vp-pause" @click="tryListen">试听</p>
        </div>
      </div>
    </div>
    <div class="mark" v-if="mask" @click="mask=false">
      <img src="/images/background13.png" alt />
    </div>
  </div>
</template>

<script>
import stroage from "../stroage/index";
import wx from "weixin-js-sdk";
import util from "../util/util";
export default {
  name: "worksdetail",
  data() {
    return {
      id: this.$route.params.id,
      mask: false,
      avatar: "", //头像
      message: {}, //留言
      result: {}, //作品作者
      review: {}, //老师数据
      Usertype: "", //用户类型
      startTime: 0, //录音开始时间
      recordTimer: null,
      localId: "", // 录音本地id
      serverId: "", // 录音微信服务id
      showMask: false,
      tip: 1, //提交 0- 重录
      isVoice: 0, // 0-未录音 1-录音中 2-录完音
      isListen: 0, // 0-未试听/试听结束 1-试听中 2-暂停试听
      isPlay: false, // 是否播放
      isSubmit: false, // 是否已提交
      play: true
    };
  },
  mounted() {
    this.getWorksDetail();
    this.Usertype = this.$cookie.get("user_type") || 1;
  },
  methods: {
    // 开始录音
    voiceStart(event) {
      let _this = this;
      event.preventDefault();
      // 延时后录音，避免误操作
      this.recordTimer = setTimeout(function() {
        // util.toast("开始录音了");
        wx.startRecord({
          success: function(res) {
            _this.startTime = new Date().getTime();
            _this.isVoice = 1;
          },
          cancel: function() {
            _this.isVoice = 0;
          }
        });
      }, 300);
    },

    // 停止录音
    voiceEnd(event) {
      this.isVoice = 2;
      let _this = this;
      event.preventDefault();
      // 间隔太短
      if (new Date().getTime() - this.startTime < 300) {
        this.startTime = 0;
        util.toast("录音时间太短~");
        // 不录音
        clearTimeout(this.recordTimer);
      } else {
        wx.stopRecord({
          success: function(res) {
            // util.toast("停止录音了");
            // 微信生成的localId，此时语音还未上传至微信服务器
            _this.localId = res.localId;
            _this.isVoice = 2;
          },
          fail: function(res) {
            console.log(JSON.stringify(res));
          }
        });
      }
    },

    // 试听
    tryListen() {
      let _this = this;
      wx.playVoice({
        localId: _this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
      wx.onVoicePlayEnd({
        // 监听播放结束
        success: function() {
          // util.toast("试听监听结束");
          _this.isListen = 0;
        }
      });
    },

    // // 试听停止
    // tryStop() {
    //   let _this = this;
    //   wx.pauseVoice({
    //     localId: _this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
    //   });
    // },

    // 处理录音数据
    voiceHandle() {
      let _this = this;
      util.Indicator("加载中");
      wx.uploadVoice({
        localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          // util.toast("提交微信服务器中");
          // 微信语音已上传至 微信服务器并返回一个服务器id
          _this.serverId = res.serverId; // 返回音频的服务器端ID
          _this.upVoice();
        }
      });
    },

    // 自己后台上传接口
    upVoice() {
      let data = {
        wid: this.id,
        serviceId: this.serverId,
        token: this.$cookie.get("token")
      };
      this.http.post("/works/amr", data).then(res => {
        util.toast(res);
        this.showMask = !this.showMask;
        this.getWorksDetail();
      });
    },

    //获取作品详情
    getWorksDetail() {
      util.Indicator("加载中");
      this.http
        .post("/works/detail", {
          id: this.$route.params.id,
          token: this.$cookie.get("token") || ""
        })
        .then(res => {
          this.message = res.message || {};
          this.result = res.result || {};
          this.review = res.review || {};
        });
    },

    //分享功能
    initShareInfo() {
      this.mask = true;
      wx.updateAppMessageShareData({
        title: "做呗科技", // 分享标题
        desc: "做呗科技", // 分享描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        imgUrl:
          "http://zuobei.400539.com/upload/portal/20200407/463012ed8c20a5f8cbff88fa6d50f625.jpeg",
        type: "link",
        success: () => {
          // 用户点击了分享后执行的回调函数
          this.mask = true;
          this.fenxiang();
        }
      });

      wx.updateTimelineShareData({
        title: "做呗科技", // 分享标题
        desc: "做呗科技", // 分享描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "http://zuobei.400539.com/upload/portal/20200407/463012ed8c20a5f8cbff88fa6d50f625.jpeg",
        type: "link",
        success: () => {
          // 用户点击了分享后执行的回调函数
          this.fenxiang();
          this.mask = true;
        },
        complete: function(err) {
          console.log(err);
        }
      });
    },

    fenxiang() {
      this.http
        .post("/sign/share", { token: this.$cookie.get("token") })
        .then(res => {});
    },

    //文字评论
    text(id) {
      this.$router.push(`/uploadText/${id}`);
    },

    //文字回复
    do_review(id) {
      this.$router.push(`/do_review/${id}`);
    },

    //重置录音
    Reset() {
      this.isVoice = 0;
      this.voiceStart();
    },

    //点赞
    Fabulous() {
      if (this.$cookie.get("token")) {
        this.dianzan();
      } else {
        util.login();
      }
    },

    dianzan() {
      util.Indicator("加载中");
      this.http
        .post("/works/dianzan", {
          tid: this.$route.params.id,
          token: this.$cookie.get("token")
        })
        .then(res => {
          if (res) {
            util.toast("点赞成功~");
            setTimeout(() => {
              this.getWorksDetail();
            }, 500);
          }
        });
    },

    //播放录音
    myplay() {
      this.play = false;
      document.getElementById("audio").play();
      document.getElementById("audio").addEventListener("ended", () => {
        this.play = true;
      });
    }
  },
  created() {
    let _this = this;
    this.axios
      .post("/token/sdksign", { url: location.href.split("#")[0] })
      .then(res => {
        wx.config({
          debug: false,
          appId: res.appid,
          timestamp: parseInt(res.timestamp),
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "uploadVoice",
            "downloadVoice",
            "playVoice",
            "pauseVoice",
            "onVoicePlayEnd",
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "onMenuShareAppMessage"
          ]
        });
        wx.ready(function() {
          wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function(res) {
              _this.isVoice = 2;
              _this.localId = res.localId;
            }
          });
          wx.error(function(res) {
            alert(res.errMsg);
          });
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
  position: relative;
  .mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    background: rgba($color: #000000, $alpha: 0.5);
    img {
      margin: 10% 5% 0 0%;
      display: block;
      width: auto;
      height: 7rem;
    }
  }
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
    .header_right2 {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 0.34rem;
      color: #ccc;
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
    .mint-swipe-item {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
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
    .evaluate_empty {
      width: 90%;
      height: 1.5rem;
      margin: 0.1rem auto;
      line-height: 1.5rem;
      font-size: 0.24rem;
      color: #ccc;
      text-align: center;
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
          margin-top: 0.2rem;
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
    position: fixed;
    bottom: 0;
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    background: #f6bc0e;
    padding-bottom: 0.2rem;
    .user {
      width: 90%;
      height: 0.77rem;
      display: flex;
      flex-direction: row;
      line-height: 0.77rem;
      font-size: 0.35rem;
      color: white;
      margin: 0.25rem auto 0.1rem;
      position: relative;
      div {
        width: 15%;
        float: right;
        font-size: 0.26rem;
        line-height: 0.77rem;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        img {
          width: 0.3rem;
          height: 0.28rem;
          vertical-align: middle;
          margin-right: 2%;
          border-radius: 0;
          margin-top: -7%;
        }
      }
      img {
        width: 0.77rem;
        height: 0.77rem;
        margin-right: 0.2rem;
        border-radius: 0.38rem;
      }
      span {
        display: block;
        position: absolute;
        right: 5%;
        top: 5%;
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
      display: flex;
      align-items: center;
      .postion {
        width: 2rem;
        height: 1.2rem;
        margin-right: 2%;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 2%;
        border-radius: 5px;
      }
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
        audio {
          opacity: 0;
          display: none;
        }
        img {
          width: 0.3rem;
          height: 0.46rem;
          margin: 0.25rem 0.32rem 0.25rem 0.38rem;
        }
      }
    }
    .icon {
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      padding-bottom: 0.1rem;
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
  .bottom2 {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    background: #f6bc0e;
    padding-bottom: 0.2rem;
    .user {
      width: 90%;
      height: 0.77rem;
      display: flex;
      flex-direction: row;
      line-height: 0.77rem;
      font-size: 0.35rem;
      color: white;
      margin: 0.25rem auto 0.1rem;
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
      .postion {
        width: 2rem;
        height: 1.2rem;
        margin-right: 2%;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
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
  .Mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.5;
    z-index: 10;
  }
  .Eject {
    width: 75%;
    padding: 0.2rem 0 0.7rem;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 0.2rem;
    z-index: 11;
    img {
      display: block;
      width: auto;
      margin: 0.5rem auto;
      height: 1.8rem;
      border-radius: 0.4rem;
    }
    .img2 {
      display: block;
      margin: 0.1rem auto;
      width: 90%;
      height: 3rem;
    }
    .vm-voice-box {
      width: 100%;
      display: flex;
      margin-top: 0.6rem;
      overflow: hidden;
      p {
        display: inline-block;
        width: 80%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin: 0 auto;
        border-radius: 0.4rem;
        text-align: center;
        color: white;
        background: #f5bb0e;
        font-size: 0.22rem;
      }
    }
    .vm-voice-player {
      width: 100%;
      display: flex;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      img {
        display: block;
        width: auto;
        margin: 0rem auto 0.4rem;
        height: 3rem;
        border-radius: 0.4rem;
      }
      .suspend {
        width: 60%;
        margin: 0 auto;
        background: #e8b92b;
        color: #fff;
        font-size: 0.4rem;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 1rem;
      }
      .vm-vp-button {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-bottom: 0.1rem;
        p {
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.22rem;
          text-align: center;
          border-radius: 0.5rem;
          color: #f5bb0e;
        }
        .vm-vp-revoice {
          width: 0.8rem;
          box-shadow: 0px 1px 3px 0px #ebb51f;
        }
        .vm-vp-submit {
          width: 2rem;
          background: #f5bb0e;
          color: white;
        }
        .vm-vp-pause {
          width: 0.8rem;
          box-shadow: 0px 1px 3px 0px #ebb51f;
        }
      }
    }
  }
}
</style>
