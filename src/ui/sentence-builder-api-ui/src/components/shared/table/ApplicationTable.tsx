import {
    DataGrid,
    DataGridProps,
    GridCallbackDetails,
    GridColumnHeaderParams,
    GridSelectionModel
} from "@mui/x-data-grid";
import {useState} from "react";
import TableToolbar from "./toolbar/TableToolbar";
import TableFooter from "./footer/TableFooter";
import ApplicationNoRowsOverlay from "./overlay/ApplicationNoRowsOverlay";

const renderHeader =  (params: GridColumnHeaderParams) => {
    return <strong>{params.colDef.headerName}</strong>
}

export interface ApplicationTableProps extends DataGridProps {
    tableName?: string
    addBtnLabel?: string
    addBtnCallback?: () => void
    removeRecordsCallback: (records: any[]) => void
    uniqueFieldName: string
}

const ApplicationTable = (props: ApplicationTableProps) => {

    const [selectedRecords, setSelectedRecords] = useState<typeof props.rows>([]);

    const onSelectionModelChange = (selectionModel: GridSelectionModel,
                                    details: GridCallbackDetails) => {
        setSelectedRecords(props.rows
            .filter(record =>
                selectionModel.includes(record[props.uniqueFieldName])))
    }

    const {
        pageSize = 5,
        tableName = 'Table',
        addBtnLabel = 'Add',
        addBtnCallback = () => {}
    } = props

    props.columns.forEach(column => column.renderHeader = renderHeader)

    return (
        <>
            <DataGrid
                {...props}
                rows={props.rows}
                components={{
                    NoRowsOverlay: ApplicationNoRowsOverlay,
                    Toolbar: TableToolbar,
                    Footer: TableFooter
                }}
                componentsProps={{
                    toolbar: {
                        rowsSelected: selectedRecords,
                        tableName: tableName,
                        removeRecordsCallback: props.removeRecordsCallback
                    },
                    footer: {
                        addBtnLabel: addBtnLabel,
                        addBtnCallback: addBtnCallback
                    }
                }}
                checkboxSelection={true}
                density='compact'
                pageSize={pageSize}
                rowsPerPageOptions={[pageSize]}
                autoPageSize={false}
                onSelectionModelChange={onSelectionModelChange}
                sx={{...props.sx, background: 'rgba(255, 255, 255, .2)'}}
            />
        </>

    )
}

export default ApplicationTable