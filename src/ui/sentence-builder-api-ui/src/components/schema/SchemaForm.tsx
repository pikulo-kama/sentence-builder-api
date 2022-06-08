import {Button} from "@mui/material";
import '../shared/form/form-wrapper.css'
import './schema-form.css'
import {defaultWordType, WordType, WordTypeResponse} from "../../types/word-type";
import WordTypeSelect from "../shared/select/WordTypeSelect";
import {useState} from "react";
import PrimaryButton from "../shared/button/PrimaryButton";
import {useCreateSchemaMutation} from "../../api/schema-api-slice";

interface SchemaFormProps {
    wordTypes: WordTypeResponse
}

const SchemaForm = ({wordTypes}: SchemaFormProps) => {

    const [selectedWordType, setSelectedWordType] = useState<WordType>(defaultWordType)
    const [schemaWordTypes, setSchemaWordTypes] = useState<WordType[]>([])
    const [createSchema] = useCreateSchemaMutation()

    const buildSchemaString = () => {
        let schemaString = schemaWordTypes.map(type => type.wordTypeName)
            .join(' ').trim()
        return schemaString.length > 0 ? schemaString : null
    }

    const handleAddWordType = () => {
        if (selectedWordType === defaultWordType) {
            return
        }
        setSchemaWordTypes(schemaWordTypes.concat(selectedWordType))
        setSelectedWordType(defaultWordType)
    }

    const handleSaveSchema = () => {

        let schemaWordFormList = schemaWordTypes.map((type, idx) =>
            ({wordTypeId: type.wordTypeId, wordOrder: idx}));

        createSchema({words: schemaWordFormList})

        setSelectedWordType(defaultWordType)
        setSchemaWordTypes([])
    }

    return (
        <div className='form__container'>
            <WordTypeSelect
                wordTypes={wordTypes}
                label='schema-form'
                value={selectedWordType.wordTypeId}
                onChange={e =>
                    setSelectedWordType(
                        wordTypes.filter(wt =>
                            wt.wordTypeId === e.target.value)[0]
                    )
                }
            />
            <Button
                variant='contained'
                color='warning'
                size='small'
                disabled={selectedWordType === defaultWordType}
                sx={{
                    width: '100%'
                }}
                onClick={handleAddWordType}
            >
                Add Word Type to Schema
            </Button>
            <p className='schema-form__generated-sentence'>
                {buildSchemaString() ?? 'Your schema string would be here'}
            </p>
            <PrimaryButton
                disabled={schemaWordTypes.length === 0}
                onClick={handleSaveSchema}
            >
                Save Schema
            </PrimaryButton>
        </div>
    )
}

export default SchemaForm