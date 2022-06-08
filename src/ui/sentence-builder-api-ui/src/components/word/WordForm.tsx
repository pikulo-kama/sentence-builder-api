import {Button, TextField} from "@mui/material";
import '../shared/form/form-wrapper.css'
import React, {useState} from "react";
import {defaultWordType, WordType, WordTypeResponse} from "../../types/word-type";
import WordTypeSelect from "../shared/select/WordTypeSelect";
import {useCreateWordMutation} from "../../api/word-api-slice";


interface WordFormProps {
    wordTypes: WordTypeResponse
}

const WordForm = ({wordTypes}: WordFormProps) => {

    const [content, setContent] = useState<string>('')
    const [selectedWordType, setSelectedWordType] = useState<WordType>(defaultWordType)
    const [createWord] = useCreateWordMutation()

    const handleNewWordCreation = (event: React.MouseEvent<any, any>) => {
        event.preventDefault()

        if (selectedWordType === defaultWordType) {
            return
        }

        createWord({
            words: [
                {content: content, wordTypeId: selectedWordType.wordTypeId}
            ]
        })

        setContent('')
    }

    return (
        <div className='form__container'>
            <div className="form__controls">
                <TextField
                    label='Word Content'
                    variant='filled'
                    value={content}
                    autoComplete='off'
                    onChange={(e) => setContent(e.target.value)}
                    sx={{
                        width: '100%'
                    }}
                />
                <WordTypeSelect
                    wordTypes={wordTypes}
                    label='word-form'
                    value={selectedWordType.wordTypeId}
                    onChange={(e) =>
                        setSelectedWordType(
                            wordTypes.filter(wt =>
                                wt.wordTypeId === e.target.value)[0])
                    }
                />
                <Button
                    variant='contained'
                    disabled={selectedWordType === defaultWordType || !content}
                    color='warning'
                    size='small'
                    sx={{
                        width: '100%'
                    }}
                    onClick={handleNewWordCreation}
                >
                    Add New Word
                </Button>
            </div>
        </div>
    )
}

export default WordForm