<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:15:55
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-19 15:46:28
 * @FilePath: /tourney-site/src/views/mappool/poolList.vue
 * @Description: 图池列表组件
-->
<template>
  <div class="list-page">
    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item>
          <PoolCard :item="item" :data="list" @createPool="createPool" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup name="poolList">
import PoolCard from '../../components/map/poolCard.vue';
import { inject } from 'vue';
const data = inject('mappool');// 图池配置
const list = data.list;// 图池列表
function createPool() {
  let pool = { title: '空白图池' };
  data.value.push(pool);
}
</script>
<style lang="scss" scoped>
:deep(.ant-list .ant-list-item) {
  padding: 0;
}
.list-page {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
