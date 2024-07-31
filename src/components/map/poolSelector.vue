<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:20:39
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-31 17:55:52
 * @FilePath: /osu!tourney-site/tourney-site/src/components/map/poolSelector.vue
 * @Description: 图池选择器组件
-->
<template>
  <a-card class="pool-body">
    <template #title>
      <span>{{ poolData?.title + " " + mappool?.title }} Mappool</span>
    </template>
    <template #extra>
      <div class="star-btn">
        <font-awesome-icon v-show="mappool?.isDefault" icon="fa-solid fa-star" />
        <font-awesome-icon v-show="!mappool?.isDefault" icon="fa-regular fa-star" />
      </div>
      <div class="copy-btn" title="切换图池轮次">
        <a-dropdown placement="bottomRight">
          <div>
            <font-awesome-icon icon="fa-solid fa-angle-down" />
          </div>
          <template #overlay>
            <a-menu class="operate-button-menu">
              <a-menu-item v-for="(pool, index) in poolData.children" :key="index" @click="changeMappool(pool)">{{
                pool?.title }}</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </template>
    <div class="pool-content">
      <Map v-for="(map, index) in mappool?.map" :key="index" :item="map" :isCard="true"> </Map>
    </div>
  </a-card>
</template>

<script setup name="PoolSelector">
import { ref, onMounted, inject, nextTick } from 'vue';
import Map from './map.vue';
const data = inject('mappool'); // 图池配置
const poolName = data.homeMappool;
let poolData = ref();
let status = ref({}); // 图池状态
let mappool = ref();
// 切换图池轮次
function changeMappool(pool) {
  nextTick(() => {
    mappool.value = pool;
  })
}

onMounted(() => {
  // data.value.map((item) => {
  // 	return Object.assign(item, { clicked: false }); // 增加谱面点击状态属性
  // });
  // status.value = prop.mapData.status;
  // status.value.isLoading = true;
  setTimeout(() => {
    status.value.isLoading = false;
  }, 3000);
  if (data) {
    data.list.map((pool) => {
      if (pool.title === poolName) {
        poolData.value = pool;
        pool.children.map((child) => {
          if (child.isDefault || pool.children.length === 1) {
            mappool.value = child;
          }
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
:deep(*, *::before, *::after) {
  font-family: TorusSemiBold, Puhui;
}

[data-theme='light'] {
  :deep(.ant-card-body) {
    box-shadow: 0 0 0 1px #f0f0f0;
  }
}

[data-theme='dark'] {
  :deep(.ant-card-body) {
    box-shadow: 0 0 0 1px #303030;
  }
}

.pool-body {
  display: flex;
  color: #ffffff;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  :deep(.ant-card-head) {
    padding: 0 20px;

    .ant-card-extra {
      display: flex;
      column-gap: 10px;
      margin: 0 1px 0 0;
    }
  }

  :deep(.ant-card-body) {
    padding: 20px;
  }

  .pool-content {
    display: flex;
    justify-content: center;
    row-gap: 20px;
    column-gap: 20px;
    flex-wrap: wrap;

    .map-panel {
      :deep(.ant-card-body) {
        padding: 0;
        height: 60px;
        overflow: hidden;
        position: relative;

        div {
          margin: 0;
          color: #ffffff;
          background-position: center;
        }
      }

      :deep(.ant-card-actions) {
        height: 20px;
        align-items: center;
        border-top: 1px solid transparent;

        &>li>span {
          font-size: 10px;
        }
      }
    }
  }
}

.loading {
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  text-align: -webkit-center;
  row-gap: 10px;
}

*>input {
  visibility: hidden;
  display: none;
}

ul.operate-button-menu {
  * {
    font-size: 14px;
  }
}

:deep(.ant-skeleton-content) {
  height: 500px;
}
</style>
