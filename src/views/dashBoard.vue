<!--
 * @Author: SIyuyuko
 * @Date: 2024-04-28 16:43:45
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-27 12:31:00
 * @FilePath: /tourney-site/src/views/dashBoard.vue
 * @Description: 项目主页面
-->
<template>
  <div style="height: 100%; display: flex" :data-theme="theme">
    <a-layout>
      <Sider></Sider>
      <a-layout>
        <Header></Header>
        <a-layout-content>
          <keep-alive>
            <component :is="current"></component>
          </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
  <a-drawer v-model:open="showSetting" :title="$t('setting.title')" :width="450">
    <Setting></Setting>
  </a-drawer>
</template>
<script setup name="Dashboard">
import Header from '@/components/nav/header.vue';
import Sider from '@/components/nav/sider.vue';
import Home from './home/index.vue';
import Tournament from './tournament/index.vue';
import Mappool from './mappool/index.vue';
import Setting from './setting.vue';
import Command from './command/index.vue';
import { inject, ref, shallowRef, watch, onBeforeMount, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import i18n from '@/language';
import { login } from '@/api/data_api.js';
const route = useRoute();
const router = useRouter();
let theme = inject('themeMode');
let selectMenu = inject('current');
let current = shallowRef();
let menu = ref([
  { name: 'home', component: shallowRef(Home) },
  { name: 'tournament', component: shallowRef(Tournament) },
  { name: 'mappool', component: shallowRef(Mappool) },
  { name: 'command', component: shallowRef(Command) },
]);
let showSetting = ref(false);
provide('loadView', loadView);
// 动态匹配加载页面组件
function loadView(val) {
  for (let item of menu.value) {
    if (item.name === val) {
      current.value = item.component;
    }
  }
  if (val === 'setting') {
    // current.value = null;
    showSetting.value = true;
  }
}
// 用户登录
function log(token) {
  login(token).then((res) => {
    if (res.data.data) {
      let data = JSON.stringify(res.data.data);
      localStorage.setItem('userKey', data);
      window.alert('登录成功！');
      router.push('/');
    }
  });
}
onBeforeMount(() => {
  i18n.global.locale = window.user.language;
  loadView(selectMenu.value);
});
watch(selectMenu, (val) => {
  loadView(val);
});
watch(
  route,
  (val) => {
    if (val.query.code) {
      log(val.query.code);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.ant-layout-content {
  margin: 25px 15px;
  padding: 20px;
  min-height: 280px;
  overflow: auto;
  border-radius: 10px;
}

.ant-layout-content:has(.no-scroll) {
  overflow: hidden;
}
</style>
