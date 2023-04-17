<template>
    <h1>{{ msg }}</h1>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <p> {{ t('glossary.helloWorld') }}</p>
    <SvgIcon name="brand-apple"></SvgIcon>
</template>

<script setup lang="ts">
import i18n from '@/lang'
import SvgIcon from '@/components/SvgIcon/index.vue'
defineProps<{ msg: string }>()
const { t } = i18n.global
</script>

<style scoped lang="scss">
.read-the-docs {
    color: #888;
}
</style>
