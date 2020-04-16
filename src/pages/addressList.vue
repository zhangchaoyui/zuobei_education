<template>
  <div class="addressList" v-if="type==1">
    <div v-show="data" class="address" v-for="(item,index) in data" :key="index">
      <mt-cell-swipe
        :right="[
                {
                    content: '删除',
                    style: {
                      width: '0.8rem',
                      background:' red',
                      color: '#fff',
                      
                    },
                    handler: () => deleteAddress(item.id)
                }   
                     
            ]"
      >
        <img src="/images/icon36.png" alt />
        <div class="content">
          <div class="title">
            {{item.name}}
            <span>{{item.tel}}</span>
          </div>
          <div class="address_content">{{item.sheng}} {{item.shi}} {{item.qu}} {{item.adress}}</div>
        </div>
        <div class="right" @click="replace(item.id)">编辑</div>
      </mt-cell-swipe>
    </div>
    <div class="empty" v-show="!data">暂无收货地址</div>
    <Btn btnType="3" sureText="添加收货地址" v-on:submit="addAddress"></Btn>
  </div>
  <div class="addressList" v-else-if="type==2">
    <div class="address" v-for="(item,index) in data" :key="index">
      <img src="/images/icon36.png" alt />
      <div class="content">
        <div class="title">
          {{item.name}}
          <span>{{item.tel}}</span>
        </div>
        <div class="address_content">{{item.sheng}} {{item.shi}} {{item.qu}} {{item.adress}}</div>
      </div>
      <div class="right" @click="go(item)">选择</div>
    </div>
  </div>
</template>
<script>
import Btn from "../components/Button";
import util from "../util/util";
import stroage from "../stroage/index";
export default {
  name: "addressList",
  data() {
    return {
      type: this.$route.params.type,
      data: "",
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0 //移动距离
      // deleteSlider: "" //滑动时的效果,使用v-bind:style="deleteSlider"
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
          res.deleteSlider = "";
          this.data = res;
        });
    },
    //添加地址
    addAddress() {
      this.$router.push("/addAddress/0");
    },
    //删除地址
    deleteAddress(i) {
      this.axios.post("/good/addel", { id: i }).then(() => {
        util.toast("删除成功~");
        setTimeout(() => {
          this.getOrderList();
        }, 1500);
      });
    },

    go(data) {
      stroage.setItem("data", data);
      this.$router.go(-1);
    },
    replace(id) {
      this.$router.push(`/addAddress/${id}`);
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
    .mint-cell {
      width: 100%;
      height: 100%;
      .mint-cell-wrapper {
        width: 100%;
        height: 100%;
        .mint-cell-title {
          flex: 0;
        }
        .mint-cell-value {
          width: 100%;
          height: 100%;
        }
      }

      .mint-cell-swipe-button {
        display: block;
        padding: 0 10px;
        border-radius: 5px;
        font-size: 0.26rem;
        line-height: 1.8rem;
        text-align: center;
      }
    }
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
