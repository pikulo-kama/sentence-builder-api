import {useEffect, useState} from "react"
import {setLocale, setTranslations} from "react-i18nify";
import {getFromLocalStorage, setToLocalStorage} from "../util/local-storage";
import {translations, fallbackLocale} from "../locales/translations";

const lang = 'lang'

export const useLocalization = () => {
    const locales = Object.keys(translations)
    const [activeLocale, setActiveLocale] = useState<string>(getFromLocalStorage(lang) ?? fallbackLocale)

    useEffect(() => {
        setTranslations(translations)
    }, [])

    useEffect(() => {
        setLocale(activeLocale)
        setToLocalStorage(lang, activeLocale)

    }, [activeLocale])

    function setNextLocale(): void {
        const { idx: currentLocaleIndex } = locales
            .map((key, idx) => ({key, idx}))
            .filter(obj => obj.key === activeLocale)[0]

        const nextLocaleIndex = currentLocaleIndex + 1 < locales.length ?
            currentLocaleIndex + 1 : 0

        setActiveLocale(locales[nextLocaleIndex])
    }

    return {
        setActiveLocale,
        activeLocale,
        setNextLocale
    }
}