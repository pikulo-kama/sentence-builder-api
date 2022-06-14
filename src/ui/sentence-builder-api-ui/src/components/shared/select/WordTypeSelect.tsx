import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"
import {WordTypeResponse} from "../../../types/word-type"
import React from "react"
import '../form/form-wrapper.css'
import {translate, Translate} from "react-i18nify";

interface WordTypeSelectProps {
    wordTypes: WordTypeResponse
    label: string
    value: any
    onChange: (e: SelectChangeEvent<any>) => void
}

const WordTypeSelect = ({ wordTypes, label, value, onChange }: WordTypeSelectProps) => {
    return (
        <FormControl
            className='form__controls'
            sx={{
                width: '100%'
            }}
        >
            <InputLabel id={`${label}-word-type-label`}>
                <Translate value='general.word_type_select_label' />
            </InputLabel>
            <Select
                labelId={`${label}-word-type-label`}
                label={translate('general.word_type_select_label')}
                value={value === -1 ? '' : value}
                onChange={onChange}
                sx={{
                    width: '100%'
                }}
            >
                {
                    wordTypes.map(type =>
                        <MenuItem
                            key={type.wordTypeId}
                            value={type.wordTypeId}
                        >
                            {type.wordTypeName}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

export default WordTypeSelect