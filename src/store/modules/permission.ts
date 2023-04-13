import { PermissionState } from '@/types/store/permission'
import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { listRoutes } from '@/api/system/route'

const modules = import.meta.glob('../../views/**/**.vue')
export const Layout = () => import('@/layout/index.vue')

const hasPermission = (permissions: string[], route: RouteRecordRaw) => {
    if (route.meta && route.meta.permissions) {
        return permissions.some((permission) => {
            if (route.meta?.permissions !== undefined) {
                return (route.meta.permissions as string[]).map(str=>str.toLowerCase()).includes(permission)
            }
        })
    } else {
        return true
    }
}

export const filterAsyncRoutes = (
    routes: Record<string, any>[],
    permissions: string[]
) => {
    const res: RouteRecordRaw[] = []
    routes.forEach((route) => {
        const tmp = { ...route } as any
        if (hasPermission(permissions, tmp)) {
            if (tmp.component === 'Layout') {
                tmp.component = Layout
            } else {
                const component = modules[`../../views/${tmp.component}.vue`] as any
                if (component) {
                    tmp.component = modules[`../../views/${tmp.component}.vue`]
                } else {
                    tmp.component = modules['../../views/error-page/404.vue']
                }
            }
            res.push(tmp)

            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions)
            }
        }
    })
    return res
}

const usePermissionStore = defineStore({
    id: 'permission',
    state: (): PermissionState => ({
        routes: [],
        addRoutes: [],
    }),
    actions: {
        setRoutes(routes: RouteRecordRaw[]) {
            this.addRoutes = routes
            this.routes = constantRoutes.concat(routes)
        },
        async generateRoutes(permissions: string[]) {
            try {
                const res = await listRoutes()
                const asyncRoutes = res.data
                const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
                this.setRoutes(accessedRoutes)
                return accessedRoutes
            } catch (err) {
                console.log(err)
            }
        }
    }
})

export default usePermissionStore
