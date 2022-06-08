import {Button, TextField} from "@mui/material";
import '../shared/form/form-wrapper.css'
import React, {useState} from "react";
import {useCreateWordTypeMutation} from "../../api/word-type-api-slice";
import {defaultNewWordType, NewWordType} from "../../types/word-type";


const WordTypeForm = () => {

    const [newWordType, setNewWordType] = useState<NewWordType>(defaultNewWordType)
    const [createWordType] = useCreateWordTypeMutation()

    const handleSaveWordType = async (e: React.MouseEvent<any, any>) => {
        e.preventDefault()

        if (newWordType === defaultNewWordType) {
            return
        }

        const response = await createWordType(newWordType).unwrap()
        setNewWordType(defaultNewWordType)
    }

    return (
        <div className='form__container'>
            <div className="form__controls">
                <TextField
                    label='Word Type Name'
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
                    Add New Type
                </Button>
            </div>
        </div>
    )
}

export default WordTypeForm