import * as React from 'react';
import {IoMdList} from "react-icons/io";
import './overlay.css'


const ApplicationNoRowsOverlay = () => {
    return (
        <div className='overlay__container'>
            <IoMdList size='5rem' color='var(--color-burgundy)' />
            <h2 style={{color: 'var(--color-white)'}}>No Rows</h2>
        </div>
    );
}

export default ApplicationNoRowsOverlay