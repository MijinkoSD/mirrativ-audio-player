<script setup lang="ts">
import { computed, ref } from 'vue'
import SeekWithLabel from '@/templates/SeekWithLabel.vue'
import { getPlayer } from '@/connect/audio'
import endpoint from '@/connect/endpoint'
import type { MovieInfo } from '@/types/m3u8'
import { getMovieFullLength, getMovieIndex } from '@/functions/m3u8'

const _current = ref<number>(24)
const current = computed({
  get: () => {
    return _current.value
  },
  set: (value) => {
    _current.value = Math.round(value)
  }
})

const liveId = ref<string>('')
const liveIdDom = ref<HTMLInputElement>()
const maxSeconds = ref<number>(0)
const playlist = ref<MovieInfo[]>([])
const isPause = ref<boolean>(true)
let player: Howl

const setLiveId = async () => {
  if (liveIdDom.value === undefined) return
  let responce
  try {
    responce = await endpoint.getM3u8Json(liveIdDom.value.value)
  } catch (err) {
    // FIXME: 例外は握り潰すに限るぜ
    console.debug(err)
    return
  }
  liveId.value = liveIdDom.value.value

  playlist.value = responce.data
  updateMaxSeconds(playlist.value)
}

const updateMaxSeconds = (playlist: MovieInfo[]) => {
  maxSeconds.value = getMovieFullLength(playlist)
}

const playAudio = () => {
  const index = getMovieIndex(current.value, playlist.value)
  player = getPlayer(liveId.value, playlist.value[index.index].filename)
  player.play()
}

const onClickPlay = () => {
  isPause.value = false
  if (player === undefined) {
    playAudio()
  } else {
    player.play()
  }
}
const onClickPause = () => {
  isPause.value = true
  player.pause()
}
</script>

<template>
  <p>Home View.</p>
  <input :value="liveId" placeholder="ライブID" ref="liveIdDom" />
  <input type="button" @click="setLiveId" value="設定" />
  <SeekWithLabel class="seek-bar" :length="180" v-model:current="current" />
  <input type="button" v-if="isPause" value="再生" @click="onClickPlay" />
  <input type="button" v-else value="一時停止" @click="onClickPause" />
</template>

<style scoped lang="scss">
.seek-bar {
  max-width: 200px;
}
</style>
