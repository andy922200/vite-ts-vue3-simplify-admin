<template>
    <div class="login-page__wrapper">
        <h3>This is Login page.</h3>
        <button @click="logIn">
            Log In
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LoginPage'
}
</script>

<script setup lang="ts">
import useStore from '@/store'
import router from '@/router'

const { user: userModule } = useStore()
const logIn = () => {
    userModule.login()
    router.push({ path: '/' })
}
</script>