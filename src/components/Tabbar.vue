<template>
  <div class="app">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="0">
        <img slot="icon" class="ss" src="../../public/images/icon40.png" v-if="selected!=0" />
        <img slot="icon" class="ss" src="../../public/images/icon15.png" v-else />
        首页
      </mt-tab-item>
      <mt-tab-item id="1">
        <img slot="icon" src="../../public/images/icon9.png" v-if="selected!=1" />
        <img slot="icon" src="../../public/images/icon9_yellow.png" v-else />
        上传作品
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../../public/images/icon10.png" v-if="selected!=2" />
        <img slot="icon" src="../../public/images/icon10_yellow.png" v-else />
        作品列表
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../../public/images/icon11.png" v-if="selected!=3" />
        <img slot="icon" src="../../public/images/icon11_yellow.png" v-else />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      selected: 0
    };
  },

  watch: {
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
  methods: {
    
  }
};
</script>

<style lang='scss'>
.is-selected {
  color: #f5bb0e !important;
}
.mint-tabbar {
  border: 0;
  background: #fff;
  border-color: #fff;
}
</style>
