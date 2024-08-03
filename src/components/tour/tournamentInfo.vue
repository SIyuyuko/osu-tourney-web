<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:13:19
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-01 16:52:16
 * @FilePath: /osu!tourney-site/tourney-site/src/components/tour/tournamentInfo.vue
 * @Description: 比赛概览组件
-->
<template>
  <div class="card" v-if="tourData">
    <a-card>
      <template #cover>
        <img class="poster" alt="poster" :src="tourData.poster" />
      </template>
      <a-card-meta>
        <template #description>
          <a-descriptions :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }" layout="vertical">
            <template #title>
              <span>{{ tourData.fullTitle ? tourData.fullTitle : tourData.title }}</span>
            </template>
            <a-descriptions-item label="比赛时间">{{ tourData.time }}</a-descriptions-item>
            <a-descriptions-item label="比赛模式">{{ tourData.mode }}</a-descriptions-item>
            <a-descriptions-item label="比赛形式">{{ tourData.type }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-card-meta>
      <template #actions>
        <font-awesome-icon icon="fa-solid fa-table" title="比赛主表格" @click="openUrl(tourData.mainSheetUrl)" />
        <!-- <font-awesome-icon icon="fa-solid fa-ellipsis" title="详细信息" /> -->
      </template>
    </a-card>
  </div>
</template>
<script setup name="TournamentInfo">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
const data = window.tournament; // 比赛配置
const tournamentName = data.homeTournament;
let tourData = ref();
function openUrl(url) {
  if (url !== "" && url) {
    window.open(url, "_blank");
  } else {
    message.warning("请先配置网址链接");
  }
}
onMounted(() => {
  if (data) {
    data.list.map((tour) => {
      if (tour.title === tournamentName) {
        tourData.value = tour;
      }
    });
  }
});
</script>
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
