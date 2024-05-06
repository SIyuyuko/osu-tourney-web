<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-06 15:55:48
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-07 01:52:05
 * @FilePath: /tourney-site/src/components/nav/sider.vue
 * @Description: 侧边导航栏
-->
<template>
  <a-layout-sider class="sider" v-model:collapsed="collapsed" :trigger="null" collapsible breakpoint="xl" theme="light">
    <a-menu class="menu" v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @click="selectMenu">
      <a-menu-item key="home">
        <span class="anticon"><font-awesome-icon icon="fa-solid fa-house-user" /></span>
        <span>主页</span>
      </a-menu-item>
      <a-menu-item key="tournament">
        <span class="anticon"><font-awesome-icon icon="fa-solid fa-chess" /></span>
        <span>比赛</span>
      </a-menu-item>
      <a-menu-item key="mappool">
        <span class="anticon"><font-awesome-icon icon="fa-solid fa-map" /></span>
        <span>图池</span>
      </a-menu-item>
    </a-menu>
    <div class="logo">
      <span>Tourney Web</span>
    </div>
  </a-layout-sider>
</template>
<script setup name="Sider">
import { ref, inject } from 'vue';
let collapsed = inject('collapsed');
let current = inject('current');
let selectedKeys = ref(['home']);
function selectMenu(val) {
  console.log(val, selectedKeys.value);
  current.value = val.key;
}
</script>
<style lang="scss" scoped>
.sider :deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;

  .menu {
    padding: 9px 0 0 0;
    height: 100%;
  }

  .logo {
    text-align: center;
    margin: auto 0 0 0;
    padding: 0 0 5px 0;

    span {
      font-weight: 600;
    }
  }
}
</style>
