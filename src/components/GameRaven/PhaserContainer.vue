<script setup>
import { onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const game = await import(/* webpackChunkName: "game" */ '@/gameRaven/game')

onMounted(() => {
  gameInstance = game.launch(containerId)
})

onUnmounted(() => {
  if (gameInstance) {
    gameInstance.destroy(true)
    gameInstance = null
  }
})
</script>

<template>
  <div :id="containerId" />
</template>
