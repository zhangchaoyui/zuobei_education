<template>
  <div class="personal">
    <div class="img">
      <img src="/images/logo.png" />
    </div>
    <div class="content">
      &nbsp;&nbsp;&nbsp;&nbsp;自2014年起至2017年底，公司完成体验式营销前期布署，打造出适合体验式营销活动“外星人”主题、“超级英雄主题”主题、“超级纸片人”主题、“珍惜昆虫蝴蝶标本”等主题，为商业项目、房地产项目、4S店等行业进行活动服务，累计受众约达到10万人次。
      <p>&nbsp;&nbsp;为适应市场需求的不断深化，公司在服务于商业客户（B端）需求的同时，尝试增加面对终端消费（C端）的体验式服务，与2018年3月自主打造推出了“小小发明家”儿童创意发明教育品牌，运作模式为线上知识付费平台学习与线下多径点位体验式商业引流。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
.personal {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url("/images/background10.png") repeat-y;
  background-size: 100%;
  margin: 0;
  .img {
    display: block;
    margin: 1rem auto 0;
    width: 2.4rem;
    height: 1.59rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: 88%;
    margin: 0.56rem auto 0;
    font-size: 0.26rem;
    line-height: 0.5rem;
    color: #555555;
  }
}
</style>
