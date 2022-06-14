
/**
*   Used to sent login credentials to server
* */
export type LoginForm = {
    username: string
    password: string
}

/**
 *   Response object that is being returned from
 *   the server after successful authorization
 * */
export type LoginResponse = {
    authorization: string
}