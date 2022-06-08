import './table-footer.css'
import {GridPagination} from "@mui/x-data-grid";
import PrimaryButton from "../../button/PrimaryButton";

interface TableFooterProps {
    addBtnLabel: string,
    addBtnCallback: () => void
}

const TableFooter = ({ addBtnLabel, addBtnCallback }: TableFooterProps) => {
    return (
        <div className='table-footer__container'>
            <PrimaryButton
                size='small'
                className="table-footer__add-btn"
                onClick={addBtnCallback}
            >
                {addBtnLabel}
            </PrimaryButton>
            <GridPagination />
        </div>
    )
}

export default TableFooter