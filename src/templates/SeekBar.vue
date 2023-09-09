<script setup lang="ts">
const props = defineProps<{
  length: number
  current: number
}>()
</script>

<template>
  <div class="seek-bar">
    <div class="bar">
      <div class="point-pos" :style="{ left: (current * 100) / length + '%' }">
        <div class="point"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$height: 5px;

.seek-bar {
  width: 100px;
  height: $height;
}

.bar {
  // border: 2px solid gray;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: calc($height / 2);
  background-color: #ddd;
}

.point-pos {
  position: relative;
  top: (15px - $height) * -0.5;
  width: 0;
}

.point {
  position: relative;
  left: calc(15px / -2);
  margin-left: -50%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: gray;
}
</style>
