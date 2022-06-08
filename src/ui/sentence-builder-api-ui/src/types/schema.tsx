import {WordType} from "./word-type";

export type SchemaResponse = Schema[]

export type SchemaForm = {
    words: SchemaWordForm[]
}

type SchemaWordForm = {
    wordTypeId: number
    wordOrder: number
}

export type Schema = {
    sentenceSchemaId: number
    words: WordType[]
}