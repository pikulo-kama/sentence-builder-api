import Cookies from "universal-cookie";


const TOKEN_COOKIE_NAME = 'token'

export const loadTokenFromCookies = () => {
    return new Cookies().get(TOKEN_COOKIE_NAME)
}

export const saveTokenToCookies = (token: string) => {
    new Cookies().set(TOKEN_COOKIE_NAME, token, {path: '/'})
}

export const deleteTokenFromCookies = () => {
    new Cookies().remove(TOKEN_COOKIE_NAME, {path: '/'})
}