import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { stringify as qsStringify } from 'qs'
import { localStorage } from '@/utils/storage'
import { checkAPIPermissions } from '@/utils/mixinTools'
import useStore from '@/store'

const paramsSerializer = (params:unknown, index: 'noIndices' | 'indices' | 'brackets' | 'repeat' | undefined)=>{
    const mode = {
        noIndices: { indices: false },
        indices: { arrayFormat: 'indices' } as { arrayFormat: 'indices' },
        brackets: { arrayFormat: 'brackets' } as { arrayFormat: 'brackets' },
        repeat: { arrayFormat: 'repeat' } as { arrayFormat: 'repeat' }
    }
    return qsStringify(params, mode[index || 'brackets'])
}

const requestInterceptor = {
    callback: (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
            throw new Error(
                'Expected \'config\' and \'config.headers\' not to be undefined'
            )
        }
        const { user } = useStore()

        if (user.token) {
            config.headers['Authorization'] = user.token ? `Bearer ${user.token}` : `Bearer ${localStorage.get('token')}`
        }

        if (!user.isAdmin) {
            if (Array.isArray(config.permissions) && config.permissions.length > 0) {
                if (!checkAPIPermissions(user.permissions, config.permissions)) {
                    return Promise.reject(new Error('No Permission'))
                }
            }
        }

        // decide paramsSerializer mode
        if (config.needParamsSerializer) {
            config.paramsSerializer = ()=>{
                return paramsSerializer(config.params, config.needParamsSerializer?.mode)
            }
        }

        return config
    },
    errorCallback: (error: Error) => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
}

const responseInterceptor = {
    callback: (response: AxiosResponse) => {
        const finalResponse = {
            ...response,
            target: response?.data?.data || {
            }
        }

        return finalResponse
    },
    errorCallback: (error: Error & AxiosError) => {
        const { user: userModule } = useStore()
        let fullErrorMessage = {
            stack: error.stack,
            name: error.name,
            message: error.message
        }

        if (error.isAxiosError) {
            fullErrorMessage = {
                ...fullErrorMessage,
                ...error.toJSON()
            }
        }
        console.log('api return Error:', fullErrorMessage)
        if (error.response?.status === 401) {
            // remove token and go to login page to re-login
            userModule.resetToken()
            return
        }
        return Promise.reject({
            ...fullErrorMessage
        })
    }
}

// axios instance factory
const createAxiosInstance = (baseURL: string) => {
    const axiosInstance = axios.create({
        baseURL,
        timeout: 20000,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    })

    axiosInstance.interceptors.request.use(requestInterceptor.callback, requestInterceptor.errorCallback)
    axiosInstance.interceptors.response.use(responseInterceptor.callback, responseInterceptor.errorCallback)

    return axiosInstance
}

// create an axios instance
const testService = createAxiosInstance('https://jsonplaceholder.typicode.com')

export default testService
