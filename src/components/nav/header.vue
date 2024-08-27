<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-06 15:55:22
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-27 12:42:23
 * @FilePath: /tourney-site/src/components/nav/header.vue
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
      <a-button class="lang-btn" type="link" v-if="$i18n.locale">
        <a-dropdown placement="bottomLeft">
          <div>
            <font-awesome-icon icon="fa-solid fa-language" />
          </div>
          <template #overlay>
            <a-menu class="operate-button-menu">
              <a-menu-item :style="$i18n.locale === 'zh' ? langStyle : ''" @click="$i18n.locale = 'zh'">简体中文</a-menu-item>
              <a-menu-item :style="$i18n.locale === 'en' ? langStyle : ''" @click="$i18n.locale = 'en'">English</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-button>
    </div>
    <div class="user-header">
      <a-button type="link" @click="openUrl(wikiUrl)">
        <font-awesome-icon icon="fa-brands fa-wikipedia-w" />
      </a-button>
      <a-button type="link" @click="openUrl(repoUrl)">
        <font-awesome-icon icon="fa-brands fa-github" />
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
let theme = inject('themeMode');
let collapsed = inject('collapsed');
let mobileCollapsed = ref(false);
let isLogin = ref(false);
const loadView = inject('loadView');
const repoUrl = 'https://github.com/SIyuyuko/osu-tourney-web';
const wikiUrl = 'https://github.com/SIyuyuko/osu-tourney-web/wiki';
const langStyle = {
  'text-decoration': 'underline',
  'background-color': theme.value === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
};
// 切换主题
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  langStyle['background-color'] = theme.value === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';
}
// 网页跳转
function openUrl(url) {
  window.open(url, '_blank');
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
