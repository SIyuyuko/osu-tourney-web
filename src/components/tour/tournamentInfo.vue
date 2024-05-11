<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:13:19
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-09 13:43:57
 * @FilePath: /tourney-site/src/components/tour/tournamentInfo.vue
 * @Description: 比赛概览组件
-->
<template>
  <div class="card">
    <a-card>
      <template #cover>
        <img class="poster" alt="poster" src="@/assets/image/tournament/poster.png" />
      </template>
      <a-card-meta>
        <template #description>
          <a-descriptions :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }" layout="vertical">
            <template #title>
              <span>Yuyuko's Hidden Cup Season 4</span>
            </template>
            <a-descriptions-item label="比赛时间">2024.1.25 - 2024.3.10</a-descriptions-item>
            <a-descriptions-item label="比赛模式">osu! Standard</a-descriptions-item>
            <a-descriptions-item label="比赛形式">4v4 Team VS</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-card-meta>
      <template #actions>
        <font-awesome-icon icon="fa-solid fa-table" title="比赛主表格" />
        <font-awesome-icon icon="fa-solid fa-ellipsis" title="详细信息" />
      </template>
    </a-card>
  </div>
</template>
<script setup name="TournamentInfo"></script>
<style lang="scss" scoped>
.card {
  .ant-card {
    width: 500px;

    :deep(.ant-card-cover>*) {
      height: 200px;
      object-fit: cover;
    }
  }
}

@media (max-width: 1024px) {
  .card {
    .ant-card {
      width: 100%;

      :deep(.ant-card-cover>*) {
        height: 160px;
      }
    }

  }
}
</style>
