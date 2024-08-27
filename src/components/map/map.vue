<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:17:45
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-26 14:37:07
 * @FilePath: /tourney-site/src/components/map/map.vue
 * @Description: 谱面组件
-->
<template>
  <a-card :data-theme="themeMode" class="map-panel" :class="isCard ? '' : 'detail'" v-if="map || loaded" size="small">
    <a-card-meta v-if="!isReferee">
      <template #description>
        <div class="cover">
          <img :src="`${imgApi + item?.data?.beatmapset_id + imgApiSuffix}`" />
        </div>
        <div class="content-mask">
          <!-- #region 谱面信息 -->
          <div class="content left">
            <span class="map-title"
              >{{ map?.data?.beatmapset?.title }}
              <span v-if="map?.data?.beatmapset?.title !== map?.data?.beatmapset?.title_unicode"> {{ map?.data?.beatmapset?.title_unicode }}</span>
            </span>
            <span class="map-people">{{ map?.data?.beatmapset?.artist }} // {{ map?.data?.beatmapset?.creator }}</span>
            <span class="map-id">{{ map?.data?.version }} - b{{ map?.data?.id }}</span>
            <span class="map-detail" v-if="!isCard && map?.params">
              <span>CS {{ map?.data?.cs }}</span>
              <span>AR {{ map?.params?.approach_rate }}</span>
              <span>OD {{ map?.params?.overall_difficulty }}</span>
              <span>Combo {{ map?.params?.max_combo }}</span>
            </span>
          </div>
          <div class="content right">
            <div class="tag" :class="map?.mod">
              <span>{{ map?.mod + map?.index }}</span>
            </div>
            <div class="star">
              <span
                ><span>{{ map?.params?.star_rating }}</span
                >*
              </span>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </template>
    </a-card-meta>
    <a-card-meta class="referee" v-else>
      <template #description>
        <div class="info">
          <span>{{ props.item?.id }}</span>
          <span class="tag" :class="props.item?.mod">{{ props.item?.mod + props.item?.index }}</span>
        </div>
      </template>
    </a-card-meta>
    <!-- #region 快捷按钮组 -->
    <template #actions>
      <div class="website-btn" :title="$t('mappool.seeMapInfo')" @click="openBeatmapWebsite(map?.data?.id)">
        <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
      </div>
      <div class="copy-btn" :title="$t('mappool.getMapID')" @click="copyBeatmapID(map)">
        <font-awesome-icon icon="fa-solid fa-copy" v-show="!map?.isCopied"></font-awesome-icon>
        <font-awesome-icon icon="fa-solid fa-check" :class="map?.isCopied ? 'copied' : ''" v-if="map?.isCopied"></font-awesome-icon>
      </div>
      <div v-if="!isReferee" class="download-btn" :title="$t('mappool.downloadMap')" @click="downloadBeatmap(map?.data?.beatmapset_id)">
        <font-awesome-icon icon="fa-solid fa-download"></font-awesome-icon>
      </div>
      <div v-else class="check-btn" :title="!map.checkStatus ? $t('mappool.markMap') : $t('mappool.removeMark')" @click="toggleMapStatus(map)">
        <font-awesome-icon v-if="!map.checkStatus" icon="fa-solid fa-circle-check"></font-awesome-icon>
        <font-awesome-icon v-if="map.checkStatus" icon="fa-solid fa-circle-minus" style="color: #d9363e" />
      </div>
      <div class="copy-btn" :title="$t('mappool.getMapCommand')" @click="copyCommand(map, 'map')">
        <font-awesome-icon icon="fa-solid fa-map" v-show="!map?.setMap" />
        <font-awesome-icon icon="fa-solid fa-clipboard-check" :class="map?.setMap ? 'copied' : ''" v-if="map?.setMap" />
      </div>
      <div class="copy-btn" :title="$t('mappool.getModCommand')" @click="copyCommand(map, 'mod')">
        <font-awesome-icon icon="fa-solid fa-code" v-show="!map?.getCommand" />
        <font-awesome-icon icon="fa-solid fa-clipboard-check" :class="map?.getCommand ? 'copied' : ''" v-if="map?.getCommand" />
      </div>
    </template>
    <!-- #endregion -->
  </a-card>
  <div class="loading-panel" :class="isCard ? 'small' : ''" v-else>
    <a-spin></a-spin>
  </div>
</template>

<script setup name="Map">
import { ref, inject, onMounted, nextTick, watch } from 'vue';
// import { getModDiffStar } from '@/utils/mappool';
import { getBeatmapInfo, getBeatmapAttributes } from '@/api/data_api';
let themeMode = inject('themeMode');
let imgApi = ref('https://assets.ppy.sh/beatmaps/');
let imgApiSuffix = ref('/covers/card.jpg');
let beatmapApi = ref('http://osu.ppy.sh/b/');
let beatmapdownloadApi = ref('https://dl.sayobot.cn/beatmaps/download/');
let props = defineProps({
  item: {
    type: Object,
  },
  isCard: {
    type: Boolean,
  },
  isReferee: {
    type: Boolean,
  },
});
const emit = defineEmits(['update']);
let map = ref();
let loaded = ref(false);
// 打开谱面官网链接
function openBeatmapWebsite(bid) {
  let url = beatmapApi.value + bid;
  window.open(url, '_blank');
}
// 复制谱面ID
function copyBeatmapID(item) {
  let input = document.createElement('input');
  input.value = item.data?.id;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.remove();
  item.isCopied = true;
  setTimeout(() => {
    item.isCopied = false;
  }, 1000);
}
// 下载谱面文件
function downloadBeatmap(sid) {
  let url = beatmapdownloadApi.value + sid;
  window.open(url, '_self');
}
function toggleMapStatus(map) {
  map.checkStatus = !map.checkStatus;
  emit('update', map);
}
// 复制比赛指令
function copyCommand(item, type) {
  let input = document.createElement('input');
  // console.log(item);
  let mpPrefix = type === 'map' ? '!mp map' : '!mp mods';
  let value = type === 'map' ? item.data?.id ?? item?.id : item.mod;
  if (type === 'mod') {
    let freeModList = ['DT', 'FM', 'TB', 'EX'];
    let suffix = freeModList.includes(item.mod) ? 'freemod' : 'nf';
    value = item.mod.toLowerCase() + ' ' + suffix;
    if (freeModList.includes(item.mod) && item.mod !== 'DT') {
      value = suffix;
    }
    if (item.mod === 'NM') {
      value = suffix;
    }
  }
  input.value = `${mpPrefix} ${value}`;
  // console.log(input.value);
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.remove();
  let e = type === "map" ? 'setMap' : 'getCommand';
  item[e] = true;
  setTimeout(() => {
    item[e] = false;
  }, 1000);
}
function initBeatmap(item) {
  getBeatmapInfo(item.id).then((res) => {
    if (res.status === 200) {
      nextTick(() => {
        map.value = Object.assign(props.item, res.data);
        // console.log(map);
        getBeatmapParams(map.value);
      });
    } else {
      setTimeout(() => {
        initBeatmap(item);
      }, 2000);
    }
  });
}
async function getBeatmapParams(map) {
  let noModList = ['FM', 'TB', 'EX'];
  let params = {
    bid: map.id,
    mod: noModList.includes(map.mod) ? 'NM' : map.mod,
    mode: map.data.mode,
  };
  getBeatmapAttributes(params).then((res) => {
    let data = res.data;
    for (let i in data) {
      if (data[i].toString().indexOf('.') !== -1) {
        if (i === 'star_rating') {
          data[i] = data[i].toFixed(2);
        } else {
          data[i] = data[i].toFixed(1);
        }
      }
    }
    map.params = data;
    loaded.value = true;
  });
}
watch(
  () => {
    props.item;
  },
  () => {
    if (!props.isReferee) {
      loaded.value = false;
      initBeatmap(props.item);
    } else {
      loaded.value = true;
      map.value = props.item;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
onMounted(() => {
  if (!props.isReferee) {
    initBeatmap(props.item);
  } else {
    loaded.value = true;
  }
});
</script>
<style lang="scss" scoped>
.map-panel {
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  width: 300px;
  overflow: hidden;

  .cover {
    filter: brightness(0.4) blur(0.4px);
    -webkit-filter: brightness(0.4) blur(0.4px);
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .content-mask {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;

    .content {
      display: flex;
      height: -webkit-fill-available;
      flex-direction: column;
    }

    .content.left {
      padding: 2px 10px;
      width: 100%;
      justify-content: space-between;

      span:first-child {
        span {
          font-size: 10px;
          color: rgb(176, 178, 178);
        }
      }

      span:not(:first-child) {
        font-size: 10px;
        color: rgb(176, 178, 178);
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .content.right {
      justify-content: space-between;
      width: 64px;

      .tag {
        text-align: center;
        width: 60px;
        margin: 0 0 0 auto;
        clip-path: path('M0 0 Q6 2 6 8 Q6 22 22 22 L60 22 L60 0 Z');

        span {
          padding: 0 2px 0 10px;
          position: relative;
        }
      }

      .star {
        margin: 0 5px 5px 10px;
        display: flex;
        justify-content: flex-end;

        span {
          font-size: 24px;

          span {
            font-size: 22px;
          }
        }
      }
    }
  }
}

.map-panel.detail {
  width: calc(50% - 10px);
  // height: 100px;
  position: relative;
  color: #ffffff;

  :deep(.ant-card-body) {
    padding: 0;

    div {
      color: #ffffff;
    }

    .ant-card-meta-description {
      overflow: hidden;
      position: relative;
    }
  }

  .content-mask .content.left {
    padding: 10px;

    .map-title {
      font-size: 18px;

      span {
        font-size: 14px;
      }
    }

    .map-people {
      font-size: 12px;
      top: -5px;
      position: relative;
    }

    .map-id {
      font-size: 12px;
      top: -7px;
      position: relative;
    }

    .map-detail {
      display: flex;
      column-gap: 50px;
      margin-top: -7px;

      & > span {
        font-size: 14px;
        color: #eaeaea;
      }
    }
  }

  .content-mask .content.right {
    height: auto;
    width: 110px;

    .tag {
      font-size: 26px;
      width: 110px;
      clip-path: path('M0 0 Q16 6 16 18 Q16 36 36 36 L110 36 L110 0 Z');

      span {
        padding: 0 2px 0 20px;
      }
    }

    .star span {
      font-size: 30px;

      span {
        font-size: 28px;
      }
    }
  }
}

.referee {
  :deep(.ant-card-meta-description) {
    display: inline-flex;
    align-items: center;
    margin: auto !important;
    width: 100%;
    justify-content: center;
  }

  .info {
    .tag {
      color: #ffffff;
      border-radius: 2px;
      width: 40px;
      height: 20px;
      display: inline-flex;
      text-align: center;
      margin: auto;
      justify-content: center;
      align-items: center;
      margin: 0 0 0 10px;
    }
  }
}

.loading-panel {
  width: calc(50% - 10px);
  height: 140px;
  text-align: center;
  display: flex;
  background-color: rgb(234, 234, 234, 0.5);
  border-radius: 10px;

  div {
    margin: auto;
  }
}

.loading-panel.small {
  height: 82px;
}

ul.operate-button-menu {
  * {
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .pool-body {
    .pool-content {
      .map-panel {
        min-width: 0;
        width: 100%;

        .content-mask {
          .content.left {
            width: 80%;
            overflow: hidden;
          }

          .operate-mask.clicked {
            visibility: visible;
            background-color: rgba(0, 0, 0, 0.6);
            transition: all 0.3s;
            max-width: 100%;
            width: -webkit-fill-available;
            height: 60px;
          }

          .operate-mask {
            visibility: hidden;

            .operate-button-group {
              margin: auto;
              display: flex;
              max-width: 100%;
              height: 100%;
              align-items: center;
              text-align: center;
              justify-content: center;
              column-gap: 50px;
            }
          }
        }

        .content-mask:hover {
          .operate-mask.clicked {
            visibility: visible;
            background-color: rgba(0, 0, 0, 0.6);
            transition: all 0.3s;
            max-width: 100%;
            width: -webkit-fill-available;
            height: 60px;
          }

          .operate-mask {
            visibility: hidden;
          }
        }
      }
    }
  }
}

@media (min-width: 900px) {
  .pool-body {
    .pool-content {
      .map-panel {
        width: calc(50% - 10px);

        .content-mask {
          .content.left {
            width: 68%;
          }
        }
      }

      .map-panel.last {
        width: calc(50% - 10px);
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
