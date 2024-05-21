<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-21 11:15:24
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-21 11:54:26
 * @FilePath: /tourney-site/src/views/bind.vue
 * @Description: 用户绑定页
-->
<template>bind page</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { login } from '@/api/data_api.js';
const route = useRoute();
const router = useRouter();
function log() {
  let token = route.query.code;
  login(token).then((res) => {
    if (res.data.data) {
      let data = JSON.stringify(res.data.data);
      sessionStorage.setItem('userData', data);
      window.alert('登录成功！');
      router.push('/');
    }
  });
}
onMounted(() => {
  // log();
});
</script>
