<template>
  <div class="app">
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed v-if="$route.meta.showTab">
      <mt-tab-item id="0" :class="{'on':selected==0}">
        <img slot="icon" class="ss" src="../public/images/icon40.png" v-if="selected!=0" />
        <img slot="icon" class="ss" src="../public/images/icon15.png" v-else />
        首页
      </mt-tab-item>
      <mt-tab-item id="1" v-if="UserType==1" :class="{'on':selected==1}">
        <img slot="icon" src="../public/images/icon9.png" v-if="selected!=1" />
        <img slot="icon" src="../public/images/icon9_yellow.png" v-else />
        上传作品
      </mt-tab-item>
      <mt-tab-item id="2" :class="{'on':selected==2}">
        <img slot="icon" src="../public/images/icon10.png" v-if="selected!=2" />
        <img slot="icon" src="../public/images/icon10_yellow.png" v-else />
        作品排行
      </mt-tab-item>
      <mt-tab-item id="3" :class="{'on':selected==3}">
        <img slot="icon" src="../public/images/icon11.png" v-if="selected!=3" />
        <img slot="icon" src="../public/images/icon11_yellow.png" v-else />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import stroage from "./stroage/index";
export default {
  name: "App",
  data() {
    return {
      selected: 0,
      showTab: 0,
      UserType: this.$cookie.get("user_type") || 1
    };
  },
  mounted() {
    //截取域名后缀
    console.log(location.href.split("/#/")[1])
    switch (location.href.split("/#/")[1]) {
      case "":
        this.selected = 0;
        break;
      case "upload":
        this.selected = 1;
        break;
      case "worksList":
        this.selected = 2;
        break;
      case "mine":
        this.selected = 3;
        break;
    }
    //判断token
    if (this.$cookie.get("token")) {
      stroage.setItem("status", 1);
    } else {
      stroage.setItem("status", 0);
    }
  },

  watch: {
    //路由改变
    $route(res) {
      console.log(res);
      if (res.meta.title == "首页") {
        this.selected = 0;
      } else if (res.meta.title == "上传作品") {
        this.selected = 1;
      } else if (res.meta.title == "作品列表") {
        this.selected = 2;
      } else if (res.meta.title == "我的") {
        this.selected = 3;
      }
      this.UserType = this.$cookie.get("user_type");
    },
    //tabbar改变
    selected: function(val) {
      switch (val) {
        case "0":
          window.location.replace("/#/");
          break;
        case "1":
          window.location.replace("/#/upload");
          break;
        case "2":
          window.location.replace("/#/worksList");
          break;
        case "3":
          window.location.replace("/#/mine");
          break;
      }
    }
  },
  methods: {}
};
</script>

<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
.is-selected {
  color: #f5bb0e !important;
}
.on {
  color: #f5bb0e;
}
.mint-tabbar {
  border: 0;
  background: #fff;
  border-color: #fff;
}
</style>
