<template>
  <div class="addressList">
    <div
      v-show="data"
      class="address"
      v-for="(item,index) in data"
      :key="index"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :style="deleteSlider"
    >
      <img src="/images/icon36.png" alt />
      <div class="content">
        <div class="title">
          {{item.name}}
          <span>{{item.tel}}</span>
        </div>
        <div class="address_content">{{item.sheng}} {{item.shi}} {{item.qu}} {{item.adress}}</div>
      </div>
      <div class="right">编辑</div>
      <div class="remove" @click="deleteAddress(item.id)">删除</div>
    </div>
    <div class="empty" v-show="!data">暂无收货地址</div>
    <Btn btnType="3" sureText="添加收货地址" v-on:submit="addAddress"></Btn>
  </div>
</template>
<script>
import Btn from "../components/Button";
import util from "../util/util";
export default {
  name: "addressList",
  data() {
    return {
      data: "",
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0, //移动距离
      deleteSlider: "" //滑动时的效果,使用v-bind:style="deleteSlider"
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios
        .post("/good/adreslist", { token: this.$cookie.get("token") })
        .then(res => {
          console.log(res);
          this.data = res;
        });
    },
    //添加地址
    addAddress() {
      this.$router.push("/addAddress");
    },

    //滑动
    touchStart(ev) {
      ev = ev || event;
      //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length == 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev) {
      ev = ev || event;
      //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = 50;
      if (ev.touches.length == 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX == 0) {
          this.deleteSlider = "transform:translateX(0px)";
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          //具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = "transform:translateX(-" + this.disX * 5 + "px)";
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      let wd = 50;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        //如果距离小于删除按钮一半,强行回到起点
        if (this.disX * 5 < wd / 2) {
          this.deleteSlider = "transform:translateX(0px)";
        } else {
          //大于一半 滑动到最大值
          this.deleteSlider = "transform:translateX(-" + wd + "px)";
        }
      }
    },
    //删除地址
    deleteAddress(i) {
      this.axios.post("/good/addel", { id: i }).then(() => {
        util.toast("删除成功~");
        setTimeout(() => {
          this.getOrderList();
        }, 1500);
      });
    }
  },
  components: {
    Btn
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/mixin.scss";
.addressList {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .address {
    width: 96%;
    height: 1.8rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto 0.2rem;
    background: #fff;
    border-radius: 5px;
    position: relative;
    user-select: none;
    transition: 0.3s;
    img {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 1% 0 3%;
      &:last-child {
        width: 0.14rem;
        height: 0.22rem;
        margin-left: 6%;
      }
    }

    .content {
      width: 70%;
      height: 0.8rem;
      display: flex;
      flex-direction: column;
      margin-left: 3%;
      border-right: 1px solid #e5e5e5;

      .title {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem;
        color: #333333;
        @include textWidth();
        span {
          font-size: 0.26rem;
          color: #888888;
        }
      }
      .address_content {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem;
        color: #333333;
        @include textWidth();
      }
    }
    .right {
      width: 14%;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #b4b3b3;
      font-size: 0.24rem;
    }
    .remove {
      position: absolute;
      width: 0.8rem;
      height: 1.8rem;
      background: red;
      right: -14%;
      top: 0;
      color: #fff;
      text-align: center;
      font-size: 0.26rem;
      line-height: 1.8rem;
      border-radius: 5px;
    }
  }
  .empty {
    width: 100%;
    min-height: 60vh;
    line-height: 60vh;
    text-align: center;
    font-size: 0.3rem;
    color: #ccc;
  }
}
</style>
