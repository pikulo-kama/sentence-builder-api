import {Button, TextField} from "@mui/material"
import '../shared/form/form-wrapper.css'
import React, {useState} from "react"
import {useCreateWordTypeMutation} from "../../api/word-type-api-slice"
import {defaultWordTypeForm, NewWordTypeForm} from "../../types/word-type"
import {I18n, Translate, translate} from "react-i18nify";
import {Response} from "../../types/response";
import ApplicationModal from "../shared/modal/ApplicationModal";


const WordTypeForm = () => {

    const [newWordType, setNewWordType] = useState<NewWordTypeForm>(defaultWordTypeForm)
    const [createWordType] = useCreateWordTypeMutation()
    const [open, setOpen] = useState(false)
    const [response, setResponse] = useState<Response<any>>()

    const handleSaveWordType = async (e: React.MouseEvent<any, any>) => {
        e.preventDefault()

        if (newWordType === defaultWordTypeForm) {
            return
        }

        setResponse(await createWordType(newWordType).unwrap())

        setOpen(true)
        setNewWordType(defaultWordTypeForm)
    }

    return (
        // @ts-ignore
        <I18n render={() =>
            <>
                <ApplicationModal
                    response={response}
                    open={open}
                    setOpen={setOpen}
                />
                <div className='form__container'>
                    <div className="form__controls">
                        <TextField
                            label={translate('word_type.form_word_type_name_field')}
                            autoComplete='off'
                            variant='filled'
                            sx={{
                                width: '100%'
                            }}
                            value={newWordType.wordTypeName}
                            onChange={(e) => setNewWordType({wordTypeName: e.target.value})}
                        />
                        <Button
                            variant='contained'
                            disabled={!newWordType.wordTypeName}
                            color='warning'
                            size='small'
                            onClick={handleSaveWordType}
                            sx={{
                                width: '100%'
                            }}
                        >
                            <Translate value='word_type.form_add_new_word_type_button'/>
                        </Button>
                    </div>
                </div>
            </>
        }/>
    )
}

export default WordTypeForm