import { localStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { normalizeLanguage as getLanguage } from '@/utils/mixinTools'

const useAppStore = defineStore({
    id: 'app',
    state: (): Record<string, any> => ({
        device: 'desktop',
        language: getLanguage()
    }),
    actions: {
        toggleDevice(device: string) {
            this.device = device
        },
        setLanguage(language: string) {
            this.language = language
            localStorage.set('language', language)
        }
    }
})
  
export default useAppStore