<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:13:19
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-27 09:03:22
 * @FilePath: /tourney-site/src/components/tour/tournamentInfo.vue
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
            <a-descriptions-item :label="$t('tournament.time')">{{ tourData.time }}</a-descriptions-item>
            <a-descriptions-item :label="$t('tournament.mode')">{{ tourData.mode }}</a-descriptions-item>
            <a-descriptions-item :label="$t('tournament.type')">{{ tourData.type }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-card-meta>
      <template #actions>
        <font-awesome-icon icon="fa-solid fa-table" :title="$t('tournament.mainSheet')" @click="openUrl(tourData.mainSheetUrl)" />
        <!-- <font-awesome-icon icon="fa-solid fa-ellipsis" title="详细信息" /> -->
      </template>
    </a-card>
  </div>
  <a-empty v-else :description="$t('tournament.emptyActive')" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%;" />
</template>
<script setup name="TournamentInfo">
import { onMounted, ref } from 'vue';
import { message, Empty } from 'ant-design-vue';
import i18n from '@/language';
const data = window.tournament; // 比赛配置
const tournamentName = data.homeTournament;
let tourData = ref();
function openUrl(url) {
  if (url !== "" && url) {
    window.open(url, "_blank");
  } else {
    message.warning(i18n.global.t('tournament.setUrlWarning'));
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
