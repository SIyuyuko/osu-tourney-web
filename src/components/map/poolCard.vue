<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:34:48
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-08 15:52:15
 * @FilePath: /osu!tourney-site/tourney-site/src/components/map/poolCard.vue
 * @Description: 图池列表卡片组件
-->
<template>
  <a-card class="pool-card" v-if="item.title !== '新建图池'" @click="changeCurPage('mappool', item)" hoverable>
    <span :title="item.title">{{ item.title }}</span>
  </a-card>
  <a-card class="add-card" v-else hoverable @click="createMappool()">
    <div>
      <font-awesome-icon icon="fa-solid fa-folder-plus" />
      <span class="add-title">新建图池</span>
    </div>
  </a-card>
</template>
<script setup name="poolCard">
import { inject, onMounted } from 'vue';
const changeCurPage = inject('changeCurPage');
// import { addPool } from '@/api/data_api.js';
defineProps({
  item: {
    type: Object,
  },
  data: {
    type: Array,
  },
});
const emit = defineEmits(['createPool']);
// 创建图池
function createMappool() {
  emit('createPool');
}
onMounted(() => { });
</script>
<style lang="scss" scoped>
.pool-card {
  :deep(.ant-card-body) {
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.add-card {
  .add-title {
    margin-left: 10px;
  }
}
</style>
