<template>
  <div class="monthList">
    <div class="header">
      <div class="title">
        <img src="/images/icon19.png" alt />人气王
      </div>
      <div class="userList">
        <div class="user">
          <div class="img">
            <img src="/images/user.jpg" alt />
          </div>
          <span class="username">蜡笔小新</span>
          <span class="fabulous">
            获赞
            <span class="ci">2600</span>次
          </span>
        </div>
        <div class="user">
          <div class="img2">
            <img src="/images/user.jpg" alt />
          </div>
          <span class="username">蜡笔小新</span>
          <span class="fabulous">
            获赞
            <span class="ci">2600</span>次
          </span>
        </div>
        <div class="user">
          <div class="img3">
            <img src="/images/user.jpg" alt />
          </div>
          <span class="username">蜡笔小新</span>
          <span class="fabulous">
            获赞
            <span class="ci">2600</span>次
          </span>
        </div>
        <div class="user">
          <div class="img4">
            <img src="/images/user.jpg" alt />
          </div>
          <span class="username">蜡笔小新</span>
          <span class="fabulous">
            获赞
            <span class="ci">2600</span>次
          </span>
        </div>
      </div>
    </div>
    <div class="header2">
      <div class="title">
        <img src="/images/vip.png" alt />坚持王
      </div>
      <div class="userList">
        <div class="row">
          <div class="user">
            <div class="img">
              <img src="/images/user.jpg" alt />
              <img src="/images/icon44.png" class="biao" alt />
            </div>
            <span class="username">蜡笔小新</span>
            <span class="fabulous">
              上传
              <span class="ci">2600</span>次
            </span>
          </div>
          <div class="user">
            <div class="img">
              <img src="/images/user.jpg" alt />
              <img src="/images/icon44.png" class="biao" alt />
            </div>
            <span class="username">蜡笔小新</span>
            <span class="fabulous">
              上传
              <span class="ci">2600</span>次
            </span>
          </div>
          <div class="user">
            <div class="img">
              <img src="/images/user.jpg" alt />
              <img src="/images/icon44.png" class="biao" alt />
            </div>
            <span class="username">蜡笔小新</span>
            <span class="fabulous">
              上传
              <span class="ci">2600</span>次
            </span>
          </div>
          <div class="user">
            <div class="img">
              <img src="/images/user.jpg" alt />
              <img src="/images/icon44.png" class="biao" alt />
            </div>
            <span class="username">蜡笔小新</span>
            <span class="fabulous">
              上传
              <span class="ci">2600</span>次
            </span>
          </div>
        </div>
        <div class="cloumn">
          <div class="let">1</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
        <div class="cloumn">
          <div class="let">1</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
        <div class="cloumn">
          <div class="let">2</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
        <div class="cloumn">
          <div class="let">3</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
        <div class="cloumn">
          <div class="let">4</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
        <div class="cloumn">
          <div class="let">5</div>
          <div class="let_img">
            <img src="/images/user.jpg" alt />
          </div>
          <div class="username">多喝热水</div>
          <div class="let_right">
            上传作品
            <span>400</span>次
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "monthList",
  data() {
    return {
      adhere: "",
      sentiment: ""
    };
  },
  mounted() {
    this.axios
      .get("/Works/sentiment", {
        params: {
          id: this.id
        }
      })
      .then(res => {
        this.sentiment = res;
      });
    this.axios
      .get("/works/adhere", {
        params: {
          id: this.id
        }
      })
      .then(res => {
        this.adhere = res;
      });
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss'>
@import "./../assets/scss/reset.scss";
@import "./../assets/scss/mixin.scss";
.monthList {
  width: 90%;
  margin: 1vh auto 0;
  height: auto;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 4rem;
    margin: 0 auto;
    background: url("/images/background2.png") no-repeat;
    background-size: 100%;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.32rem;
      margin: 0.27rem 0 0.26rem;
      color: white;
      img {
        width: 0.44rem;
        height: 0.38rem;
        margin-right: 0.1rem;
      }
    }
    .userList {
      width: 94%;
      margin: 0 auto;
      background: white;
      border-radius: 0.3rem;
      display: flex;
      flex: 4;
      justify-content: space-around;
      padding: 0.2rem 0 0.3rem;
      .user {
        width: 24%;
        height: auto;
        .img {
          background: url("/images/icon1.png") no-repeat;
        }
        .img2 {
          background: url("/images/icon2.png") no-repeat;
        }
        .img3 {
          background: url("/images/icon3.png") no-repeat;
        }
        .img4 {
          background: url("/images/icon4.png") no-repeat;
        }
        .img,
        .img2,
        .img3,
        .img4 {
          width: 1.14rem;
          height: 1.35rem;
          overflow: hidden;
          background-size: 100%;
          margin: 0 auto;
          img {
            display: block;
            width: 0.98rem;
            height: 0.98rem;
            border-radius: 0.5rem;
            margin: 0.34rem 0.05rem 0;
          }
        }
        .username {
          display: block;
          line-height: 0.6rem;
          width: 100%;
          text-align: center;
          font-size: 0.26rem;
          color: #444444;
        }
        .fabulous {
          display: block;
          width: 100%;
          height: 0.19rem;
          line-height: 0.3rem;
          font-size: 0.15rem;
          color: #777777;
          text-align: center;
          .ci {
            font-size: 0.15rem;
            color: #f05556;
          }
        }
      }
    }
  }
  .header2 {
    width: 100%;
    background: url("/images/background2.png") repeat-y;
    background-size: 100% 100%;
    display: block;
    flex-direction: column;
    padding-bottom: 2%;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.32rem;
      margin: 0.27rem 0 0.26rem;
      color: white;
      img {
        width: 0.44rem;
        height: 0.38rem;
        margin-right: 0.1rem;
      }
    }
    .userList {
      width: 94%;
      margin: 0 auto;
      background: white;
      border-radius: 0.3rem;
      display: flex;
      flex-direction: column;
      padding: 0.23rem 0 0.3rem;
      .row {
        display: flex;
        flex-direction: row;
        .user {
          display: flex;
          flex-direction: column;
          width: 24%;
          height: auto;
          position: relative;
          .img {
            width: 1.04rem;
            height: 1.04rem;
            display: flex;
            background: #f5bb0e;
            border-radius: 0.8rem;
            margin: 0 auto;
            position: relative;
            img {
              display: block;
              width: 0.98rem;
              height: 0.98rem;
              border-radius: 0.5rem;
              margin: 0.03rem 0.03rem 0;
            }
            .biao {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0.3rem;
              height: 0.24rem;
            }
          }
          .username {
            display: block;
            line-height: 0.6rem;
            width: 100%;
            text-align: center;
            font-size: 0.26rem;
            color: #444444;
          }
          .fabulous {
            display: block;
            width: 100%;
            line-height: 0.3rem;
            font-size: 0.15rem;
            color: #777777;
            text-align: center;
            .ci {
              font-size: 0.15rem;
              color: #f05556;
            }
          }
        }
      }
      .cloumn {
        width: 94%;
        margin: 0.3rem auto 0;
        height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border: none;
        }
        .let {
          width: 15%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #666666;
          font-size: 0.26rem;
          text-align: center;
        }
        .let_img {
          width: 16%;
          overflow: hidden;
          img {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 0.4rem;
          }
        }
        .username {
          width: 52%;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.24rem;
          text-align: left;
          margin-left: 3%;
          @include textWidth();
        }
        .let_right {
          width: 35%;
          height: 0.5rem;
          line-height: 0.5rem;
          text-align: right;
          font-size: 0.2rem;
          color: #777777;
          span {
            color: #f05556;
          }
        }
      }
    }
  }
}
</style>
