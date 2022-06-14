import PrimaryButton from "../button/PrimaryButton"
import './form-wrapper.css'
import {Translate} from "react-i18nify";

interface FormWrapperProps {
    closeFormCallback?: () => void
    form: any
    formProps: any
}

const FormWrapper = (props: FormWrapperProps) => {

    const {
        closeFormCallback = () => {},
        form,
        formProps
    } = props

    const Form = form

    return (
        <div className='container form-wrapper__container'>
            <PrimaryButton
                onClick={closeFormCallback}
                sx={{
                    margin: '.3rem 0 0 .3rem'
                }}
            >
                <Translate value='general.close_form_button' />
            </PrimaryButton>
            <Form {...formProps} />
        </div>
    )
}

export default FormWrapper