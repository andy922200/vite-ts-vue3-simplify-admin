import { defineStore } from 'pinia'
import { localStorage } from '@/utils/storage'
import { resetRouter } from '@/router'

const useUserStore = defineStore({
    id: 'user',
    state: ():Record<string, any> => ({
        token: localStorage.get('token') || '',
        nickname: '',
        avatar: '',
        roles: [],
        permissions: [],
        isAdmin: false
    }),
    actions: {
        async RESET_STATE() {
            this.$reset()
        },
        /* Login */
        login() {
            const token = 'This is a token for testing.'
            this.token = token
            localStorage.set('token', token)
            return true
        },
        getUserInfo() {
            return 1
        },
        async logout() {
            try {
                await this.resetToken()
                resetRouter()
                return
            } catch (err) {
                console.log(err)
            }
        },
        resetToken() {
            return new Promise((resolve) => {
                localStorage.remove('token')
                localStorage.remove('user')
                localStorage.remove('roles')
                localStorage.remove('permissions')
                localStorage.remove('isAdmin')
                this.RESET_STATE()
                resolve(true)
            })
        }
    }
})

export default useUserStore
