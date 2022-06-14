
/**
 * Response format of word types from the server.
* */
export type WordTypeResponse = WordType[]

/**
 * Single object that represents word type
 * */
export type WordType = {
    wordTypeId: number
    wordTypeName: string
}

/**
 * Object used during creation of new word type
* */
export type NewWordTypeForm = {
    wordTypeName: string
}

// Default objects, used as default value in useState hook
export const defaultWordTypeForm: NewWordTypeForm = {
    wordTypeName: ''
}

export const defaultWordType: WordType = {
    wordTypeId: -1,
    wordTypeName: ''
}