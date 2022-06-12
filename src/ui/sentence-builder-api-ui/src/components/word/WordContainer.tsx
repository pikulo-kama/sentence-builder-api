import {useDeleteWordMutation, useGetAllWordsQuery} from "../../api/word-api-slice";
import {GridColDef} from "@mui/x-data-grid";
import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper";
import WordForm from "./WordForm";
import {Word} from "../../types/word";
import {WordTypeProps} from "../word-type/types";


const columns: GridColDef[] = [
    {
        field: 'content',
        editable: true,
        headerName: 'Слово',
    },
    {
        field: 'wordTypeName',
        headerName: 'Відповідає на..',
        minWidth: 140
    }
];

interface WordContainerProps extends WordTypeProps {
}

const WordContainer = ({ wordTypes, isLoading }: WordContainerProps) => {

    const {data: words, isLoading: wordIsLoading} = useGetAllWordsQuery()
    const [deleteWord] = useDeleteWordMutation()

    const removeRecordsCallback = (records: Word[]) => {
        records.forEach(record => deleteWord({wordContent: record.content}))
    }

    return (
        <section>
            {
                <ApplicationTableWrapper
                    columns={columns}
                    rows={words?.responseData?.wordResponseList || []}
                    getRowId={(row: any) => row.content}
                    pageSize={10}
                    tableName='Words'
                    addBtnLabel='Create New Word'
                    uniqueFieldName='content'
                    isLoading={wordIsLoading}
                    form={WordForm}
                    removeRecordsCallback={removeRecordsCallback}
                    formProps={{
                        wordTypes: wordTypes,
                        isLoading: isLoading
                    }}
                />
            }
        </section>
    )
}

export default WordContainer