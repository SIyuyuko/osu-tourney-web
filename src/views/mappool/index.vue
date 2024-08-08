<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 01:54:03
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-05 09:19:46
 * @FilePath: /osu!tourney-site/tourney-site/src/views/mappool/index.vue
 * @Description: 图池页面组件
-->
<template>
  <div class="page no-scroll">
    <div class="nav">
      <a-breadcrumb>
        <a-breadcrumb-item @click="changeCurPage('list')">
          <a v-if="curPage !== 'list'">图池列表</a>
          <span v-else>图池列表</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-if="curPage === 'mappool' || showSetting" @click="changeCurPage('mappool')">
          <a v-if="curPage === 'setting'">{{ poolTitle }}</a>
          <span v-else>{{ poolTitle }}</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-if="curPage === 'setting' && showSetting">图池设置</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="view">
      <!-- <keep-alive> -->
      <component :is="current" :data="curPage === 'mappool' ? poolData : null"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script setup name="Mappool">
import { ref, shallowRef, provide } from 'vue';
import PoolList from './poolList.vue';
import PoolView from './poolView.vue';
let curPage = ref('list');
let current = shallowRef(PoolList);
let menu = ref([
  { name: 'list', component: shallowRef(PoolList) },
  { name: 'mappool', component: shallowRef(PoolView) },
  // { name: 'setting', component: shallowRef(PoolSetting) },
]);
let poolTitle = ref('Mappool');
let showSetting = ref(false);
let poolData = ref(); // 图池数据
provide('changeCurPage', changeCurPage);
// provide('showSetting', showSettingPage);
// 切换页面
function changeCurPage(page, data) {
  curPage.value = page;
  for (let item of menu.value) {
    if (item.name === page) {
      current.value = item.component;
      if (data && page === 'mappool') {
        poolTitle.value = data.title;
        poolData.value = data;
      }
    }
  }
}
// 显示图池设置
// function showSettingPage(visible) {
//   showSetting.value = visible;
//   if (visible) {
//     changeCurPage('setting');
//   }
// }
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;

  .nav {
    padding: 0 10px;
  }

  .view {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
  }
}
</style>
