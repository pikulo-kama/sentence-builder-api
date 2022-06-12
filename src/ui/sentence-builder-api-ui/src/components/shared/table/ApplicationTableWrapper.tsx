import ApplicationTable, {ApplicationTableProps} from "./ApplicationTable"
import {useState} from "react"
import Loading from "../loading/Loading"
import FormWrapper from "../form/FormWrapper"

interface ApplicationTableWrapperProps extends ApplicationTableProps {
    isLoading: boolean
    form: any
    formProps?: any
    rowsFormatter?: (rows: any) => any
}

const ApplicationTableWrapper = (props: ApplicationTableWrapperProps) => {

    const {
        isLoading,
        form,
        rows,
        rowsFormatter = (row: any) => row,
        formProps = {}
    } = props

    const [isCreateFormActive, setCreateFormActive] = useState(false)

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {isCreateFormActive ?
                <FormWrapper
                    closeFormCallback={() => setCreateFormActive(false)}
                    form={form}
                    formProps={formProps}
                /> :
                <ApplicationTable
                    {...props}
                    rows={rowsFormatter(rows)}
                    addBtnCallback={() => setCreateFormActive(true)}
                />}
        </>
    )
}

export default ApplicationTableWrapper