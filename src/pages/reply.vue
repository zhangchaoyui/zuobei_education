 <template>
  <div class="reply">
    <div class="evaluate">
      <div class="evaluate_list">
        <div class="evaluate_detail">
          <div class="evaluate_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="evaluate_title">
            <div class="top">
              <div class="title_left">刘小洋</div>
              <div class="evaluate_content">谢谢张老师的细心点评，听了老师的点评后，孩子进步不少呀！</div>
              <div class="title_right">2020.3.13</div>
            </div>
          </div>
          <div class="img2">
            <img src="/images/22.png" alt />
          </div>
        </div>
        <div class="evaluate_detail">
          <div class="evaluate_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="evaluate_title">
            <div class="top">
              <div class="title_left">刘小洋</div>
              <div class="evaluate_content">谢谢张老师的细心点评，听了老师的点评后，孩子进步不少呀！</div>
              <div class="title_right">2020.3.13</div>
            </div>
          </div>
          <div class="img2">
            <img src="/images/22.png" alt />
          </div>
        </div>
        <div class="evaluate_detail">
          <div class="evaluate_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="evaluate_title">
            <div class="top">
              <div class="title_left">刘小洋</div>
              <div class="evaluate_content">谢谢张老师的细心点评，听了老师的点评后，孩子进步不少呀！</div>
              <div class="title_right">2020.3.13</div>
            </div>
          </div>
          <div class="img2">
            <img src="/images/22.png" alt />
          </div>
        </div>
        <div class="evaluate_detail">
          <div class="evaluate_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="evaluate_title">
            <div class="top">
              <div class="title_left">刘小洋</div>
              <div class="evaluate_content">谢谢张老师的细心点评，听了老师的点评后，孩子进步不少呀！</div>
              <div class="title_right">2020.3.13</div>
            </div>
          </div>
          <div class="img2">
            <img src="/images/22.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reply",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.reply {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  .evaluate {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
      align-items: center;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #e5e5e5;
      .evaluate_img {
        margin-top: -0.4rem;
        overflow: hidden;
        img {
          width: 0.62rem;
          height: 0.62rem;
          border-radius: 0.3rem;
        }
      }
      .img2 {
        margin-top: 0.3rem;
        width: 1.14rem;
        height: 1.14rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .evaluate_title {
        width: 75%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .top {
          display: flex;
          flex-direction: column;
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
            text-align: left;
            font-size: 0.2rem;
            line-height: 0.4rem;
            color: #777777;
          }
        }
        .evaluate_content {
          width: 100%;
          height: auto;
          margin-top: 0.1rem;
          line-height: 0.33rem;
          font-size: 0.23rem;
          color: #444444;
          display: flex;
          flex-direction: column;
        }
      }
      &:last-child {
        border: none;
      }
    }
    .evaluate_detail:last-child {
      .evaluate_content {
        border: none;
      }
    }
  }
}
</style>
