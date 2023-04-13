/**
 * 獲得路由列表
 */
import helloRouter from '@/router/modules/hello'

export async function listRoutes():Promise<Record<'data', Record<string, any>[]>> {
    const asyncRoutes = [
        helloRouter
    ]

    return {
        data: asyncRoutes
    }
}