<template>
  <Suspense>
    <template #default>
      <div>
        <PhaserContainer />
      </div>
    </template>
    <template #fallback>
      <div class="placeholder">Chargement en cours...</div>
    </template>
  </Suspense>
</template>

<script setup>
import PhaserContainer from './PhaserContainer.vue'
</script>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
