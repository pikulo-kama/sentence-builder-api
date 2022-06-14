const getTranslations = (localeStrings: string[]) => {
    let locales: any = {}
    localeStrings.forEach(locale => import(`./langs/${locale}`)
        .then(res => locales[locale] = res.default))

    return locales
}

export const fallbackLocale = 'en'
export const translations = getTranslations(['en', 'uk'])