
/**
 *   Generic response data wrapper.
 *   This object is being returned by the server
 *
 *   @param message Result message
 *   @param responseType Type of response, could be error or success
 *   @param responseData Object of any type that contains structure of expected
 *   data that should be returned from the server
 * */
export type Response<T> = {
    message: string
    responseType: ResponseType
    responseData: T
}

export type ResponseType = 'ERROR' | 'SUCCESS'