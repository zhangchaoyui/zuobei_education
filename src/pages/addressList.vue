<template>
  <div class="addressList" v-if="type==1">
    <div class="address2" v-if="zhidingData">
      <mt-cell-swipe
        :right="[
                {
                    content: '删除',
                    style: {
                      width: '0.8rem',
                      background:' red',
                      color: '#fff',
                    },
                    handler: () => deleteAddress(zhidingData[0].id)
                }   
            ]"
      >
        <img src="../../public/images/icon36.png" alt />
        <div class="content">
          <div class="title">
            {{zhidingData[0].name}}
            <span>{{zhidingData[0].tel}}</span>
          </div>
          <div
            class="address_content"
          >{{zhidingData[0].sheng}} {{zhidingData[0].shi}} {{zhidingData[0].qu}} {{zhidingData[0].adress}}</div>
        </div>
        <div class="right" @click="replace(zhidingData[0].id)">编辑</div>
      </mt-cell-swipe>
    </div>

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
        <img src="../../public/images/icon36.png" alt />
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
    <div class="empty" v-if="data.length<=0">暂无收货地址</div>
    <Btn btnType="3" sureText="添加收货地址" v-on:submit="addAddress"></Btn>
  </div>
  <div class="addressList" v-else-if="type==2">
    <div class="address" v-for="(item,index) in data" :key="index">
      <img src="../../public/images/icon36.png" alt />
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
      data: [],
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0, //移动距离
      zhidingData: ""
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
          for (let i in res) {
            if (res[i].click == 1) {
              this.zhidingData = res.splice(i, 1);
            }
          }
          this.data = res;
        });
    },
    //添加地址
    addAddress() {
      this.$router.push("/addAddress/0/type/2");
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
      this.$router.push(`/addAddress/${id}/type/${1}`);
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
  .address,
  .address2 {
    width: 96%;
    height: 1.8rem;
    display: flex;
    align-items: center;
    margin: 0.1rem auto 0.12rem;
    background: #fff;
    border-radius: 5px;
    position: relative;
    user-select: none;
    transition: 0.3s;
    border-radius: 5px;
    .mint-cell {
      width: 100%;
      height: 100%;
      border: 1px solid white;
      .mint-cell-wrapper {
        width: 100%;
        height: 100%;
        .mint-cell-title {
          flex: 0;
        }
        .mint-cell-value {
          width: 100%;
          height: 100%;
          border: 1px solid white;
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
  .address2 {
    border: 1px solid #f5bb0e;
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
