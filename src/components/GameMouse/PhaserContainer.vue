<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as game from '@/gameMouse/game'

let gameInstance = null
const containerId = 'game-container'

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
  <div :id="containerId"></div>
</template>
