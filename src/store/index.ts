import useUserStore from './modules/user'
import useAppStore from './modules/app'
import usePermissionStore from './modules/permission'

const useStore = () => ({
    app: useAppStore(),
    user: useUserStore(),
    permission: usePermissionStore()
})

export default useStore