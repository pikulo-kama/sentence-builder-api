
/**
 * Object used to match response format from the server. Represents list of words.
* */
export type WordList = {
    wordResponseList?: Word[]
}

/**
 * Single entity object. Being return by the server, and represents single word
 * */
export type Word = {
    content: string
    wordTypeId: number
    wordTypeName: string
}

/**
 * Object that is being sent during creation of new words.
 * Allows to save multiple words at the same time.
* */
export type WordFormCollection = {
    words: WordForm[]
}

/**
 * Object used to create new word
 * */
type WordForm = {
    content: string
    wordTypeId: number
}

/**
 * Object used to delete existing word
 * */
export type WordDeleteForm = {
    wordContent: string
}
