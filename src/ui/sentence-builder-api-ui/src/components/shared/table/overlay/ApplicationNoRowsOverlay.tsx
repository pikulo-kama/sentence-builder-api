import * as React from 'react'
import {IoMdList} from "react-icons/io"
import './overlay.css'
import {Translate} from "react-i18nify";


const ApplicationNoRowsOverlay = () => {
    return (
        <div className='overlay__container'>
            <IoMdList size='5rem' color='var(--color-burgundy)' />
            <h2 style={{color: 'var(--color-white)'}}>
                <Translate value='general.empty_table_placeholder' />
            </h2>
        </div>
    )
}

export default ApplicationNoRowsOverlay