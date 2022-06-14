import {WordType} from "./word-type"

/**
 * Alias for list of schemas.
 * It is format of standard response from the server, for this endpoint
* */
export type SchemaResponse = Schema[]

/**
 * Object used to send data in order to create new sentence schema
* */
export type SchemaForm = {
    words: SchemaWordForm[]
}

/**
 * Object that represents placeholder of word that should be in schema.
 * Contains type and its order in sentence. Used during creation of new schema
* */
type SchemaWordForm = {
    wordTypeId: number
    wordOrder: number
}

/**
 * Object being returned by server. Represents single schema
* */
export type Schema = {
    sentenceSchemaId: number
    words: WordType[]
}