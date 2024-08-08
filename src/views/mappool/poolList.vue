<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:15:55
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-08 17:30:12
 * @FilePath: /osu!tourney-site/tourney-site/src/views/mappool/poolList.vue
 * @Description: 图池列表组件
-->
<template>
  <div class="list-page">
    <a-list v-if="list" :grid="{ gutter: 16, column: 4 }" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item>
          <PoolCard :item="item" :data="list" @createPool="createPool" />
        </a-list-item>
      </template>
    </a-list>
    <a-empty v-else description="暂无图池" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%;" />
  </div>
</template>
<script setup name="poolList">
import { Empty } from 'ant-design-vue';
import PoolCard from '../../components/map/poolCard.vue';
const data = window.mappool;// 图池配置
const list = data.list.length > 0 ? data.list : null;// 图池列表
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
.list-page:has(.ant-empty-normal){
  flex-direction: row;
}
</style>
