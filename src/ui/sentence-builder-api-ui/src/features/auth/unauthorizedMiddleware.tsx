import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit"
import {logout} from "./auth-slice"

const UNAUTHORIZED = 401

export const unauthorizedMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action) && isUnauthorized(action)) {
            // @ts-ignore
            api.dispatch(logout())
        }

        return next(action)
    }

const isUnauthorized = (action: any): boolean => {
    return action.payload.status === UNAUTHORIZED
}