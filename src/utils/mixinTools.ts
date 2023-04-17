/**
 * Normalize different browsers language format,
 * and return country code from lowercase.
 * Note. in Safari on iOS prior to 10.2, the country code returned is lowercase: "en-us", "fr-fr" etc.
 */

export const normalizeLanguage = (lang?: string, simple = false): string => {
    const result = lang || navigator.language || navigator['userLanguage'] || ''
    return simple
        ? result.toLowerCase().replace(/([a-zA-Z]+)([-_])([a-zA-Z]+)/g, '$3')
        : result.toLowerCase()
}

/**
 *  check API Permissions
*/

export const checkAPIPermissions = function(userOwned:string[] = [], currentAPIRequested:string[] = []) {
    const filteredCheck = currentAPIRequested
        .map(item => userOwned.map(str=>str.toLowerCase()).includes(item.toLowerCase()))
        .filter(status => status === true)
  
    return filteredCheck.length === currentAPIRequested.length
}