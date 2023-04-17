import { createI18n } from 'vue-i18n'
import { localStorage } from '@/utils/storage'
import { normalizeLanguage } from '@/utils/mixinTools'

import enUsLocale from './en-us'
import zhCnLocale from './zh-cn'
import zhTwLocale from './zh-tw'

const messages = {
    'zh-cn': {
        ...zhCnLocale
    },
    'zh-tw': {
        ...zhTwLocale
    },
    'en-us': {
        ...enUsLocale
    }
}

export enum LangCode{
    'zh-cn' = 'zh-cn',
    'zh-tw' = 'zh-tw',
    'en' = 'en'
}

/**
 * 取得當前語言設定
 *
 * @returns zh-tw|en-us
 */
export const getLanguage = () => {
    let language = localStorage.get('language')
    if (language) {
        return language
    }
    language = normalizeLanguage()
    return language
}

const i18n = createI18n({
    locale: getLanguage(),
    fallbackLocale: 'en-us',
    globalInjection: true,
    legacy: false,
    messages: messages
})

export default i18n