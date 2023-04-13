<template>
    <div class="app-wrapper">
        <div class="main-container">
            <AppMain />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import AppMain from './AppMain.vue'
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
