import {Button} from "@mui/material"
import '../shared/form/form-wrapper.css'
import './schema-form.css'
import {defaultWordType, WordType, WordTypeResponse} from "../../types/word-type"
import WordTypeSelect from "../shared/select/WordTypeSelect"
import {useState} from "react"
import PrimaryButton from "../shared/button/PrimaryButton"
import {useCreateSchemaMutation} from "../../api/schema-api-slice"
import {Translate} from "react-i18nify";
import ApplicationModal from "../shared/modal/ApplicationModal";
import {Response} from "../../types/response";

interface SchemaFormProps {
    wordTypes: WordTypeResponse
}

const SchemaForm = ({wordTypes}: SchemaFormProps) => {

    const [selectedWordType, setSelectedWordType] = useState<WordType>(defaultWordType)
    const [schemaWordTypes, setSchemaWordTypes] = useState<WordType[]>([])
    const [open, setOpen] = useState(false)
    const [response, setResponse] = useState<Response<void>>()

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

    const handleSaveSchema = async () => {

        let schemaWordFormList = schemaWordTypes.map((type, idx) =>
            ({wordTypeId: type.wordTypeId, wordOrder: idx}))

        setResponse(await createSchema({words: schemaWordFormList}).unwrap())

        setOpen(true)
        setSelectedWordType(defaultWordType)
        setSchemaWordTypes([])
    }

    return (
        <>
            <ApplicationModal
                response={response}
                open={open}
                setOpen={setOpen}
            />
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
                    <Translate value='schema.form_add_word_type_button'/>
                </Button>
                <p className='schema-form__generated-sentence'>
                    {buildSchemaString() ?? <Translate value='schema.form_empty_schema_text'/>}
                </p>
                <PrimaryButton
                    disabled={schemaWordTypes.length === 0}
                    onClick={handleSaveSchema}
                >
                    <Translate value='schema.form_save_schema_button'/>
                </PrimaryButton>
            </div>
        </>
    )
}

export default SchemaForm