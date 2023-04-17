import 'axios'
declare module 'axios' {
    export interface AxiosRequestConfig {
        permissions?: string[];
        needParamsSerializer?: { mode: 'noIndices' | 'indices' | 'brackets' | 'repeat' | undefined }
    }

    export interface AxiosResponse{
        target?: any;
    }
}