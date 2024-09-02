<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:08:23
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-09-02 15:33:13
 * @FilePath: /tourney-site/src/components/util/cover.vue
 * @Description: 壁纸组件
-->
<template>
  <div class="cover-panel">
    <a-carousel v-if="banner?.coverList?.length > 0" arrows :autoplay="banner.autoPlayCover" :style="currentCover ? backdropStyle : {}" :afterChange="setCurrent">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 9999">
          <font-awesome-icon icon="fa-solid fa-circle-chevron-left" />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px; z-index: 9999">
          <font-awesome-icon icon="fa-solid fa-circle-chevron-right" />
        </div>
      </template>
      <div v-for="(item, index) in banner?.coverList" :key="index">
        <img :src="item" />
      </div>
    </a-carousel>
    <a-empty v-else :description="$t('banner.emptyCover')" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%"></a-empty>
  </div>
</template>
<script setup name="Cover">
import { ref, onMounted, watch, computed } from 'vue';
import { Empty } from 'ant-design-vue';
let props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});
let user = computed(() => props.info);
let banner = ref(window.banner);
let currentCover = ref('');
let backdropStyle = ref({
  transition: 'ease all 0.5s',
  'background-position': 'center',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',
});
// 切换壁纸回调
function setCurrent(index) {
  if (banner.value.coverList?.length > 0) {
    currentCover.value = banner.value.coverList[index];
    backdropStyle.value.backgroundImage = `url(${currentCover.value})`;
  }
}
onMounted(() => {
  setCurrent(0);
});
watch(
  user,
  (val) => {
    if (val && banner.value.showOsuCover) {
      banner.value.coverList.push(val.cover_url);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.cover-panel {
  width: 55%;
  position: relative;
}

:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: transparent;
  overflow: hidden;
  div {
    height: 100%;
    * > img {
      display: flex;
      object-fit: contain;
      height: 100%;
      width: 100%;
      margin: auto;
      backdrop-filter: brightness(0.4) blur(2px);
    }
  }
}
:deep(.slick-slider) {
  .slick-dots.slick-dots-bottom {
    bottom: -10px;
  }
}
:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
[data-theme='light'] {
  .slick-arrow.custom-slick-arrow {
    color: #141414;
  }

  .slick-arrow.custom-slick-arrow:hover {
    color: #141414;
  }
}
</style>
