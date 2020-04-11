 <template>
  <div class="workslist">
    <div class="search" @click="search">
      <img src="/images/search.png" alt />请输入您要搜索的名称
    </div>
    <div class="frame">
      <div class="nav">
        <div v-bind:class="{'btn':btn==1}" @click="getWorksList(1)">月度</div>
        <div v-bind:class="{'btn':btn==2}" @click="getWorksList(2)">季度</div>
        <div v-bind:class="{'btn':btn==3}" @click="getWorksList(3)">年度</div>
      </div>
      <div class="list">
        <div class="ranking">
          <div class="one" v-if="oneList">
            <div class="works_left">
              <div class="detail_let">
                <img v-bind:src="oneList[0].image||''" alt />
              </div>
              <div class="works_right">
                <div class="works_r_top">
                  <div class="userImage">
                    <img v-bind:src="oneList[0].avatar" alt />
                  </div>
                  <div class="userDetail">
                    <div>{{oneList[0].name}}111</div>
                    <div>{{oneList[0].time}}</div>
                  </div>
                </div>
                <div class="row">
                  累计上传
                  <span>{{oneList[0].num}}</span>&nbsp;次
                </div>
                <div class="row">
                  累计上传
                  <span>{{oneList[0].num}}</span>&nbsp;天
                </div>
                <div class="top">
                  <img src="/images/fabulous_red.png" alt />
                  {{oneList[0].praise}}
                </div>
              </div>
            </div>
            <div class="float_img">
              <div class="top_row">
                12
                <span>次</span>
              </div>
              <div class="bottom_row2">累计上墙</div>
            </div>
          </div>
          <div class="two" v-for="(item,index) in worksList" :key="index">
            <div class="works_left2" @click="WorksDetail(item.id)">
              <div class="detail_let">
                <img :src="item.image[0]||''" alt />
              </div>
              <div class="works_right">
                <div class="works_r_top">
                  <div class="userImage">
                    <img :src="item.avatar" alt />
                  </div>
                  <div class="userDetail">
                    <div>{{item.nickname}}</div>
                    <div>{{item.time}}</div>
                  </div>
                </div>
                <div class="row">
                  累计上传
                  <span>{{item.num}}</span>&nbsp;次
                </div>
                <div class="row">
                  累计上传
                  <span>{{item.num}}</span>&nbsp;天
                </div>
                <div class="top">
                  <img src="/images/fabulous_red.png" alt />
                  {{item.praise}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "workslist",
  data() {
    return {
      image: "",
      btn: 1, //按钮类型
      value: "", //搜索框内容
      worksList: [], //列表
      oneList: {} //第一个显示
    };
  },
  mounted() {
    this.getoOneList();
    this.getWorksList(1);
  },
  methods: {
    //获取排行榜信息
    getWorksList(e) {
      this.axios.get("/works/ranking", { params: { tid: e } }).then(res => {
        this.worksList = res.data;
        this.btn = e;
      });
    },
    //获取排行榜第一名信息
    getoOneList() {
      this.axios.get("/works/one", { params: {} }).then(res => {
        console.log(res.data)
        this.oneList = res.data;
      });
    },

    //跳转详情
    WorksDetail(id) {
      this.$router.push(`/worksdetail/${id}`);
    },

    search() {
      this.$router.push("/search");
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.workslist {
  width: 95%;
  margin: 0.1rem auto 0;
  background: #fff;
  padding-bottom: 1.1rem;
  .search {
    width: 100%;
    height: 0.62rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    color: #858585;
    margin-top: 4%;
    background: #f9f9f9;
    border-radius: 0.3rem;
    padding: 0;
    img {
      width: 0.26rem;
      height: 0.26rem;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  .frame {
    .nav {
      width: 70%;
      height: 0.8rem;
      margin: 0.2rem auto 0.1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      div {
        padding: 0.1rem;
        font-size: $fontI;
        color: #333333;
        border-bottom: 2px solid #fff;
      }
      .btn {
        color: #f5bb0e;
        border-bottom: 2px solid #f5bb0e;
      }
    }
    .list {
      display: inline-block;
      width: 100%;
      .ranking {
        .one {
          width: 100%;
          height: 4.5rem;
          background: url("/images/background.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
        }
        .two {
          width: 100%;
          height: 3rem;
          margin-top: 0.1rem;
          background: url("/images/background7.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .works_left {
          width: 90%;
          height: 3.108rem;
          margin: 1.76rem auto 0;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          .detail_let {
            height: auto;
            img {
              width: 3.2rem;
              height: 2.44rem;
              border-radius: 5px;
              vertical-align: middle;
            }
          }
          .works_right {
            width: 48%;
            height: 3.108rem;
            margin-left: 4%;
            .works_r_top {
              width: 100%;
              height: 0.88rem;
              line-height: 0.88rem;
              display: flex;
              margin-bottom: 5%;
              flex-direction: row;
              @include textWidth();
              img {
                width: 0.88rem;
                height: 0.88rem;
                border-radius: 0.44rem;
              }
              .userDetail {
                width: 60%;
                padding-left: 5%;
                box-sizing: border-box;
                div:nth-child(1) {
                  @include textWidth();
                  font-size: 0.29rem;
                  color: #333;
                  line-height: 0.53rem;
                  font-family: "微软雅黑";
                }
                div:nth-child(2) {
                  color: #8d8d8d;
                  font-size: 0.15rem;
                  line-height: 0.23rem;
                }
              }
            }
            .row {
              width: 100%;
              @include textWidth();
              font-size: 0.21rem;
              line-height: 0.23rem;
              color: #444444;
              padding-left: 2%;
              margin-bottom: 4%;
              box-sizing: border-box;
              span {
                display: inline-block;
                font-size: 0.29rem;
                line-height: 0.3rem;
                font-weight: 500;
                color: #444444;
              }
            }
            .top {
              width: 100%;
              @include textWidth();
              font-size: 0.36rem;
              line-height: 0.36rem;
              color: #f05556;
              font-weight: 540;
              font-family: "微软雅黑";
              padding-left: 2%;
              margin-top: 6%;
              box-sizing: border-box;
              img {
                display: inline-block;
                width: 0.31rem;
                height: 0.31rem;
                margin-right: 2%;
              }
            }
          }
        }
        .works_left2 {
          width: 90%;
          height: 3.108rem;
          margin: 0.5rem auto 0;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          .detail_let {
            height: auto;
            img {
              width: 3.2rem;
              height: 2.44rem;
              border-radius: 5px;
              vertical-align: middle;
            }
          }
          .works_right {
            width: 48%;
            height: 3.108rem;
            margin-left: 4%;
            margin-top: 2%;
            .works_r_top {
              width: 100%;
              height: 0.88rem;
              line-height: 0.88rem;
              display: flex;
              margin-bottom: 5%;
              flex-direction: row;
              @include textWidth();
              img {
                width: 0.88rem;
                height: 0.88rem;
                border-radius: 0.44rem;
              }
              .userDetail {
                width: 60%;
                padding-left: 5%;
                box-sizing: border-box;
                div:nth-child(1) {
                  @include textWidth();
                  font-size: 0.29rem;
                  color: #333;
                  line-height: 0.53rem;
                  font-family: "微软雅黑";
                }
                div:nth-child(2) {
                  color: #8d8d8d;
                  font-size: 0.15rem;
                  line-height: 0.23rem;
                }
              }
            }
            .row {
              width: 100%;
              @include textWidth();
              font-size: 0.21rem;
              line-height: 0.23rem;
              color: #444444;
              padding-left: 2%;
              margin-bottom: 4%;
              box-sizing: border-box;
              span {
                display: inline-block;
                font-size: 0.29rem;
                line-height: 0.3rem;
                font-weight: 500;
                color: #444444;
              }
            }
            .top {
              width: 100%;
              @include textWidth();
              font-size: 0.36rem;
              line-height: 0.36rem;
              color: #f05556;
              font-weight: 540;
              font-family: "微软雅黑";
              padding-left: 2%;
              margin-top: 6%;
              box-sizing: border-box;
              img {
                display: inline-block;
                width: 0.31rem;
                height: 0.31rem;
                margin-right: 2%;
              }
            }
          }
        }
        .float_img {
          width: 1.2rem;
          height: 1.4rem;
          position: absolute;
          bottom: -0.13rem;
          right: 0.1rem;
          background: url("/images/background8.png") no-repeat;
          background-size: 100% 99%;
          .top_row {
            width: 65%;
            @include textWidth();
            text-align: center;
            margin: 0.2rem auto 0;
            font-size: 0.32rem;
            color: #ffed9e;
            span {
              font-size: 0.12rem;
            }
          }
          .bottom_row2 {
            width: 100%;
            text-align: center;
            font-size: 0.2rem;
            color: #ffed9e;
          }
        }
      }
    }
  }
}
</style>
