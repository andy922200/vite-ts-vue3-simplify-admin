<template>
    <div class="app-wrapper">
        <AppMain />
    </div>
</template>
  
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { AppMain } from './components/index'
import { useWindowSize } from '@vueuse/core'
  
import useStore from '@/store'
  
const { width } = useWindowSize()
const WIDTH = 992
  
const { app } = useStore()
const device = computed(() => app.device)
console.log('device', device)
  
watchEffect(() => {
    if (width.value < WIDTH) {
        app.toggleDevice('mobile')
    } else {
        app.toggleDevice('desktop')
    }
})
</script>

<style lang="scss">
.app-wrapper{
    min-height: 100vh;
    height: 100%;
}
</style>
