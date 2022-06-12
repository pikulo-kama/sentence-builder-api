import PrimaryButton from "../button/PrimaryButton"
import './form-wrapper.css'

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
                Back
            </PrimaryButton>
            <Form {...formProps} />
        </div>
    )
}

export default FormWrapper