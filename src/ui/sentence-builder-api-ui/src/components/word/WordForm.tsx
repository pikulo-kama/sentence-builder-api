import {Button, TextField} from "@mui/material"
import '../shared/form/form-wrapper.css'
import React, {useState} from "react"
import {defaultWordType, WordType, WordTypeResponse} from "../../types/word-type"
import WordTypeSelect from "../shared/select/WordTypeSelect"
import {useCreateWordMutation} from "../../api/word-api-slice"
import {I18n, Translate, translate} from "react-i18nify";
import ApplicationModal from "../shared/modal/ApplicationModal";
import {Response, ResponseType} from "../../types/response";


interface WordFormProps {
    wordTypes: WordTypeResponse
}

const WordForm = ({wordTypes}: WordFormProps) => {

    const [content, setContent] = useState<string>('')
    const [selectedWordType, setSelectedWordType] = useState<WordType>(defaultWordType)
    const [open, setOpen] = useState<boolean>(false)
    const [response, setResponse] = useState<Response<void>>()

    const [createWord] = useCreateWordMutation()

    const handleNewWordCreation = async (event: React.MouseEvent<any, any>) => {
        event.preventDefault()

        if (selectedWordType === defaultWordType) {
            return
        }

        setResponse(await createWord({
            words: [
                {content: content, wordTypeId: selectedWordType.wordTypeId}
            ]
        }).unwrap())

        setOpen(true)
        setContent('')
    }

    return (
        // @ts-ignore
        <I18n render={() =>
            <>
                <ApplicationModal
                    open={open}
                    setOpen={setOpen}
                    response={response}
                />
                <div className='form__container'>
                    <div className="form__controls">
                        <TextField
                            label={translate('word.form_word_content_field')}
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
                            <Translate value='word.form_add_new_word_button'/>
                        </Button>
                    </div>
                </div>
            </>
        }/>
    )
}

export default WordForm