import {FaTrashAlt} from "react-icons/fa"
import {IconButton, styled} from "@mui/material"
import './table-toolbar.css'


const StyledIconButton = styled(IconButton)({
    position: 'absolute',
    padding: '.5rem .5rem 0 0'
})

interface TableToolbarProps {
    rowsSelected: any[]
    tableName: string
    removeRecordsCallback: (records: any) => void
}

const TableToolbar = ({ rowsSelected, tableName, removeRecordsCallback }: TableToolbarProps) => {
    return (
        <div className="toolbar__container">
            <h2 style={{margin: '.3rem 0 0 .3rem'}}>{tableName}</h2>
            {
                rowsSelected.length < 1 ? null :
                    <StyledIconButton
                        className='toolbar__trash-icon'
                        onClick={() => removeRecordsCallback(rowsSelected)}
                    >
                        <FaTrashAlt/>
                    </StyledIconButton>
            }
        </div>
    )
}

export default TableToolbar