<script setup lang="ts">
import SeekBar from '@/templates/SeekBar.vue'
</script>

<template>
  <p>Home View.</p>
  <SeekBar :length="180" :current="24" />
</template>
