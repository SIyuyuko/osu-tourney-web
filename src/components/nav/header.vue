<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-06 15:55:22
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-24 15:06:38
 * @FilePath: /osu!tourney-site/tourney-site/src/components/nav/header.vue
 * @Description: 页头导航栏
-->
<template>
  <a-layout-header>
    <div class="operate-button-group">
      <a-button class="collapse-btn" type="link" @click="() => (collapsed = !collapsed)">
        <font-awesome-icon v-if="collapsed" class="trigger" icon="fa-solid fa-indent" />
        <font-awesome-icon v-else class="trigger" icon="fa-solid fa-outdent" />
      </a-button>
      <a-dropdown v-model:open="mobileCollapsed" :trigger="['click', 'hover']">
        <a-button class="collapse-btn-mobile" type="link" @click="mobileCollapsed = !mobileCollapsed">
          <font-awesome-icon v-if="!mobileCollapsed" icon="fa-solid fa-bars" />
          <font-awesome-icon v-else icon="fa-solid fa-bars" fade />
        </a-button>
        <template #overlay>
          <div>
            <Menu></Menu>
          </div>
        </template>
      </a-dropdown>
      <a-button class="theme-btn" type="link" @click="toggleTheme()">
        <font-awesome-icon v-show="theme === 'light'" icon="fa-regular fa-moon" />
        <font-awesome-icon v-show="theme === 'dark'" icon="fa-solid fa-moon" />
      </a-button>
    </div>
    <div class="user-header">
      <a-button v-if="!isLogin" type="link" @click="login()">
        <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
      </a-button>
      <a-button v-else type="link" @click="logout()">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
      </a-button>
      <a-button type="link" @click="loadView('setting')">
        <font-awesome-icon icon="fa-solid fa-gear" />
      </a-button>
    </div>
  </a-layout-header>
</template>
<script setup name="Header">
import { inject, ref, onBeforeMount } from 'vue';
import Menu from './menu.vue';
import { getOauthUrl } from '@/api/data_api';
let theme = inject('themeMode');
let collapsed = inject('collapsed');
let mobileCollapsed = ref(false);
let isLogin = ref(false);
const loadView = inject('loadView');
// 切换主题
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

// 登录
function login() {
  getOauthUrl().then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      let oauthUrl = res.data.message;
      window.open(oauthUrl);
    }
  });
}
// 用户登出
function logout() {
  localStorage.removeItem('userKey');
}
onBeforeMount(() => {
  if (localStorage.getItem('userKey')) {
    isLogin.value = true;
  }
});
</script>
<style lang="scss" scoped>
.ant-layout-header {
  padding: 0;
  display: flex;

  .operate-button-group {
    display: flex;
    margin: auto 0;
  }

  .user-header {
    display: flex;
    margin: 0 0 0 auto;
    align-items: center;
    vertical-align: middle;
  }
}

.collapse-btn-mobile {
  display: none;
}

@media (max-width: 1024px) {
  .ant-layout-header {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1;
  }

  .collapse-btn {
    display: none;
  }

  .collapse-btn-mobile {
    display: block;
  }
}
</style>
