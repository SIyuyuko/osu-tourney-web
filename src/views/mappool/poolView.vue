<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:24:14
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-24 15:11:19
 * @FilePath: /osu!tourney-site/tourney-site/src/views/mappool/poolView.vue
 * @Description: 图池信息组件
-->
<template>
  <div v-for="(pool, index) in poolData?.children" :key="index">
    <span class="pool-title">{{ pool?.title }}</span>
    <div class="pool-content">
      <Map v-for="(map, index) in pool?.map" :key="index" :item="map" :isCard="false"> </Map>
    </div>
    <a-divider dashed />
  </div>
  <!-- <a-button type="primary" @click="showSettingPage(true)">设置</a-button> -->
</template>
<script setup>
import { onMounted } from 'vue';
import Map from '@/components/map/map.vue';
// const showSettingPage = inject('showSetting');
let props = defineProps({
  data: {
    type: Object,
  },
});
let poolData = props.data;
onMounted(() => { });
</script>
<style lang="scss" scoped>
.pool-title {
  font-size: 24px;
}

.pool-content {
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
}
</style>
