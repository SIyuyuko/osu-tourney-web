<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 11:07:54
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-23 16:57:09
 * @FilePath: /tourney-site/src/components/nav/menu.vue
 * @Description: 目录菜单组件
-->
<template>
  <a-menu class="menu" :selectable="true" v-model:selectedKeys="selectedKeys" theme="light" mode="inline"
    @click="selectMenu" :forceSubMenuRender="true" triggerSubMenuAction="click">
    <a-menu-item key="home">
      <span class="anticon"><font-awesome-icon icon="fa-solid fa-house-user" /></span>
      <span>{{ $t('menu.home') }}</span>
    </a-menu-item>
    <a-menu-item key="tournament">
      <span class="anticon"><font-awesome-icon icon="fa-solid fa-chess" /></span>
      <span>{{ $t('menu.tournament') }}</span>
    </a-menu-item>
    <a-menu-item key="mappool">
      <span class="anticon"><font-awesome-icon icon="fa-solid fa-map" /></span>
      <span>{{ $t('menu.mappool') }}</span>
    </a-menu-item>
    <a-menu-item key="command">
      <span class="anticon"><font-awesome-icon icon="fa-solid fa-terminal" /></span>
      <span>{{ $t('menu.command') }}</span>
    </a-menu-item>
  </a-menu>
  <div class="logo">
    <span>Tourney Web</span>
  </div>
</template>
<script setup name="Menu">
import { ref, inject } from 'vue';
let current = inject('current');
let selectedKeys = ref(['home']);
function selectMenu(val) {
  current.value = val.key;
}
</script>
<style lang="scss" scoped>
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

@media (max-width: 1024px) {
  .logo {
    display: none;
  }
}
</style>
