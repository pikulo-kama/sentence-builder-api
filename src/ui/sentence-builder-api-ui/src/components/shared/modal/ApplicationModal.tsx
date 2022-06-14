import {Response} from "../../../types/response"
import './modal.css'
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {REACT_APP_MODAL_SHOW_TIME} from "../../../constants";


interface ApplicationModalProps {
    response?: Response<any>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ApplicationModal = (props: ApplicationModalProps) => {
    const {
        response,
        open,
        setOpen
    } = props

    useEffect(() => {
        if (open) {
            let timer = setTimeout(() => {
                setOpen(false)
            }, REACT_APP_MODAL_SHOW_TIME);
            return () => clearTimeout(timer)
        }
    }, [open])

    if (!response) {
        return null
    }

    return (
        <>
            {
                !open ? null :
                    <div className='modal__container'>
                        <h2 style={{color: response.responseType === 'ERROR' ? 'red' : 'green'}}
                        >
                            {response.responseType}
                        </h2>
                        <small>{response.message}</small>
                    </div>
            }
        </>
    )
}

export default ApplicationModal