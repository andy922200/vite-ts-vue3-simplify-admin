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

<style scoped lang="scss">
.app-main {
    min-height: calc(100vh - $navbar-height);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: $navbar-height;
}
</style>
