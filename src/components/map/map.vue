<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:17:45
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-10 15:45:30
 * @FilePath: /osu!tourney-site/tourney-site/src/components/map/map.vue
 * @Description: 谱面组件
-->
<template>
  <a-card :data-theme="themeMode" class="map-panel" :class="item.isLast ? 'last' : ''">
    <a-card-meta :style="{ 'background-image': `url(${imgApi + item.data.beatmapset_id + imgApiSuffix}) ` }">
      <template #description>
        <div class="content-mask">
          <!-- #region 谱面信息 -->
          <div class="content left">
            <span>{{ item.data.beatmapset.title }}
              <span v-if="item.data.beatmapset.title !== item.data.beatmapset.title_unicode"> {{
                item.data.beatmapset.title_unicode }}</span>
            </span>
            <span>{{ item.data.beatmapset.artist }} // {{ item.data.beatmapset.creator }}</span>
            <span>{{ item.data.version }} - b{{ item.data.id }}</span>
          </div>
          <div class="content right">
            <div class="tag" :class="item.tag">
              <span>{{ item.tag }}</span>
            </div>
            <div class="star">
              <span>{{ item.star.toString().split('.')[0] }}<span v-if="item.star.toString().split('.')[1]">{{ '.' +
                item.star.toString().split('.')[1] }}</span>*
              </span>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </template>
    </a-card-meta>
    <!-- #region 快捷按钮组 -->
    <template #actions>
      <div class="website-btn" title="查看官网谱面信息" @click="openBeatmapWebsite(item.data.id)">
        <font-awesome-icon icon="fa-solid fa-share-from-square"></font-awesome-icon>
      </div>
      <div class="copy-btn" title="复制谱面ID" @click="copyBeatmapID(item)">
        <font-awesome-icon icon="fa-solid fa-copy" v-show="!item.isCopied"></font-awesome-icon>
        <font-awesome-icon icon="fa-solid fa-check" :class="item.isCopied ? 'copied' : ''"
          v-if="item.isCopied"></font-awesome-icon>
      </div>
      <div class="download-btn" title="下载该谱面" @click="downloadBeatmap(item.data.beatmapset_id)">
        <font-awesome-icon icon="fa-solid fa-download"></font-awesome-icon>
      </div>
      <div class="copy-btn" title="复制比赛指令">
        <a-dropdown placement="bottomRight">
          <div>
            <font-awesome-icon icon="fa-solid fa-code" v-show="!item.getCommand" />
            <font-awesome-icon icon="fa-solid fa-clipboard-check" :class="item.getCommand ? 'copied' : ''"
              v-if="item.getCommand" />
          </div>
          <template #overlay>
            <a-menu class="operate-button-menu">
              <a-menu-item @click="copyCommand(item, 'map')">指定比赛谱面</a-menu-item>
              <a-menu-item @click="copyCommand(item, 'mod')">指定比赛模组</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </template>
    <!-- #endregion -->
  </a-card>
</template>

<script setup name="Map">
import { ref, inject } from 'vue';
// import { getModDiffStar } from '@/utils/mappool';
let themeMode = inject('themeMode');
let imgApi = ref('https://assets.ppy.sh/beatmaps/');
let imgApiSuffix = ref('/covers/card.jpg');
let beatmapApi = ref('http://osu.ppy.sh/b/');
let beatmapdownloadApi = ref('https://dl.sayobot.cn/beatmaps/download/');
defineProps({
  item: {
    type: Object
  }
});
// 打开谱面官网链接
function openBeatmapWebsite(bid) {
  let url = beatmapApi.value + bid;
  window.open(url, '_blank');
}
// 复制谱面ID
function copyBeatmapID(item) {
  let input = document.createElement('input');
  input.value = item.data.id;
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
// 复制比赛指令
function copyCommand(item, type) {
  let input = document.createElement('input');
  console.log(item);
  let mpPrefix = type === 'map' ? '!mp map' : '!mp mods';
  let value = type === 'map' ? item.data.id : item.tag;
  if (type === 'mod') {
    let freeModList = ["DT", "FM", "TB"];
    let suffix = freeModList.includes(item.tag) ? "freemod" : "nf"
    value = item.tag.toLowerCase() + " " + suffix;
    if (freeModList.includes(item.tag) && item.tag !== "DT") {
      value = suffix;
    }
  }
  input.value = `${mpPrefix} ${value}`;
  console.log(input.value);
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.remove();
  item.getCommand = true;
  setTimeout(() => {
    item.getCommand = false;
  }, 1000);
}

</script>
<style lang="scss" scoped>
.map-panel {
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  width: 300px;
  overflow: hidden;

  .content-mask {
    backdrop-filter: brightness(0.4) blur(0.4px);
    -webkit-backdrop-filter: brightness(0.4) blur(0.4px);
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
      width: 65px;

      .tag {
        text-align: center;
        width: 60px;
        margin: 0 0 0 auto;
        clip-path: path('M0 0 Q6 2 6 8 Q6 20 20 20 L60 20 L60 0 Z');

        span {
          padding: 0 2px 0 10px;
        }
      }

      .tag.HD {
        background-color: #f9b552;
      }

      .tag.NM {
        background-color: #21ad38;
      }

      .tag.DT {
        background-color: #009fe8;
      }

      .tag.FM {
        background-color: #9922ee;
      }

      .tag.TB {
        background-color: #000000;
      }

      .tag.EX {
        background-color: #ff9700;
      }

      .star {
        margin: 0 5px 5px 10px;
        display: flex;
        justify-content: flex-end;

        span {
          font-size: 24px;

          span {
            font-size: 16px;
          }
        }
      }
    }
  }

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
