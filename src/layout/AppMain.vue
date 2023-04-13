<template>
    <section class="app-main">
        <router-view v-slot="{ Component, route }">
            <transition name="router-fade" mode="out-in">
                <Suspense>
                    <template #default>
                        <keep-alive>
                            <component :is="Component" :key="route.fullPath" />
                        </keep-alive>
                    </template>
                    <template #fallback>Loading ... </template>
                </Suspense>
            </transition>
        </router-view>
    </section>
</template>

<style scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
