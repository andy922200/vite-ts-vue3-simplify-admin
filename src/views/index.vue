<template>
    <div class="container index-page__wrapper">
        <div class="row">
            <div class="col-12">
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" class="logo" alt="Vite logo" />
                </a>
                <a href="https://vuejs.org/" target="_blank">
                    <img src="../assets/icons/vue.svg" class="logo vue" alt="Vue logo" />
                </a>

                <button @click="logOut">
                    Log Out
                </button>

                <HelloWorld msg="Vite + Vue" />
            </div>
        </div>  
    </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import useStore from '@/store'
import router from '@/router'

const { user: userModule } = useStore()
const logOut = () => {
    userModule.logout()
    router.push({ path: '/login' })
}
</script>

<style scoped lang="scss">
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

