
export type WordTypeResponse = WordType[]

export type WordType = {
    wordTypeId: number
    wordTypeName: string
}

export type NewWordType = {
    wordTypeName: string
}

export const defaultNewWordType: NewWordType = {
    wordTypeName: ''
}

export const defaultWordType: WordType = {
    wordTypeId: -1,
    wordTypeName: ''
}