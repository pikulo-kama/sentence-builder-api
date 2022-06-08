
export type WordList = {
    wordResponseList: Word[]
}

export type Word = {
    content: string
    wordTypeId: number
    wordTypeName: string
}

type WordForm = {
    content: string
    wordTypeId: number
}

export type WordDeleteForm = {
    wordContent: string
}

export type WordFormCollection = {
    words: WordForm[]
}