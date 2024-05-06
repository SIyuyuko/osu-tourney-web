<!--
 * @Author: SIyuyuko
 * @Date: 2024-04-28 16:43:45
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-07 02:06:07
 * @FilePath: /tourney-site/src/views/dashboard.vue
 * @Description: 项目主页面
-->
<template>
  <div style="height: 100%; display: flex" :data-theme="theme">
    <a-layout>
      <Sider></Sider>
      <a-layout>
        <Header></Header>
        <a-layout-content :style="{ margin: '25px 15px', padding: '20px', minHeight: '280px' }">
          <keep-alive>
            <component :is="current"></component>
          </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup name="Dashboard">
import Header from '@/components/nav/header.vue';
import Sider from '@/components/nav/sider.vue';
import Home from './home/index.vue';
import Tournament from './tournament/index.vue';
import Mappool from './mappool/index.vue';
import { inject, ref, shallowRef, watch, onBeforeMount } from 'vue';
let theme = inject('themeMode');
let selectMenu = inject('current');
let current = shallowRef();
let menu = ref([
  { name: 'home', component: shallowRef(Home) },
  { name: 'tournament', component: shallowRef(Tournament) },
  { name: 'mappool', component: shallowRef(Mappool) },
]);
// 动态匹配加载页面组件
function loadView(val) {
  for (let item of menu.value) {
    if (item.name === val) {
      current.value = item.component;
    }
  }
}
onBeforeMount(() => {
  loadView(selectMenu.value);
});
watch(selectMenu, (val) => {
  loadView(val);
});
</script>
<style lang="scss" scoped></style>
