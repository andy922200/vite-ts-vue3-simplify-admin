import router from '@/router'
import useStore from '@/store'

// 路由白名單
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    const { user: userModule, permission: permissionModule } = useStore()
    const hasToken = userModule.token

    if(!hasToken) {
        console.log('Your login process should be executed here.')
    }

    if (hasToken) {
        // if user has logged in, redirect to the home page when user visits the login page.
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // determine whether the user has obtained his permission roles
            const hasPermissions = userModule.permissions.length > 0

            if (hasPermissions) {
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name }) : next('/401')
                } else {
                    /* Page will enter here */
                    next()
                }
            } else {
                console.log('User has logged in, but has no permissions. Fetching permissions from server...')
                try {
                    let permissions = []
                    let roles = [] as string[]
                    let isAdmin = false

                    if (localStorage.getItem('permissions')) {
                        permissions = JSON.parse(localStorage.getItem('permissions') || '') as string[]
                        isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false') as boolean
                        roles = JSON.parse(localStorage.getItem('roles') || '') as string[]
                    } else {
                        // note: permissions must be a object array!
                        // get roles and permissions via api

                        permissions = ['ADMIN']
                        roles = ['ADMIN']
                        isAdmin = true
                        permissions.push(isAdmin ? 'admin-default' : 'normal-default')

                        localStorage.setItem('isAdmin', JSON.stringify(isAdmin))
                        localStorage.setItem('roles', JSON.stringify(roles))
                        localStorage.setItem('permissions', JSON.stringify(permissions))
                    }

                    userModule.isAdmin = isAdmin
                    userModule.permissions = permissions
                    userModule.roles = roles

                    // Update the routes based on the permissions
                    const accessRoutes: any = await permissionModule.generateRoutes(permissions)
                    accessRoutes.forEach((route: any) => {
                        router.addRoute(route)
                    })

                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    const { user: userModule } = useStore()
                    await userModule.resetToken()
                    next({path: '/login'})
                    return
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            next({path: '/login'})
        }
    }
})
