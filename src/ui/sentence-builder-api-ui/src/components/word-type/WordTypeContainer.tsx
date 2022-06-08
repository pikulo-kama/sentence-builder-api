import {GridColDef} from "@mui/x-data-grid";
import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper";
import WordTypeForm from "./WordTypeForm";
import {WordTypeProps} from "./types";
import {useDeleteWordTypeMutation} from "../../api/word-type-api-slice";
import {Word} from "../../types/word";
import {WordTypeResponse} from "../../types/word-type";


const columns: GridColDef[] = [
    {
        field: 'wordTypeName',
        headerName: 'Відповідає на..',
        width: 150
    }
];

interface WordTypeContainerProps extends WordTypeProps {}


const WordTypeContainer = ({ wordTypes, isLoading }: WordTypeContainerProps) => {

    const [deleteWordType] = useDeleteWordTypeMutation()

    const removeRecordsCallback = (records: WordTypeResponse) => {
        console.log(records)
        records.forEach(record => deleteWordType(record.wordTypeId))
    }

    return (
        <div className="word-type__container">
            <ApplicationTableWrapper
                columns={columns}
                rows={wordTypes}
                pageSize={3}
                getRowId={(row: any) => row.wordTypeId}
                tableName='Word Types'
                addBtnLabel='Add New Word Type'
                uniqueFieldName='wordTypeId'
                isLoading={isLoading}
                removeRecordsCallback={removeRecordsCallback}
                form={WordTypeForm}
            />
        </div>
    )
}

export default WordTypeContainer