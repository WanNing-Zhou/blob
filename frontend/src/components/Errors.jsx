import React, {Component} from 'react';

const Errors = (({ errors })=>{
    if(!errors){
        return null
    }

    return (
        <ul className='error-messages'>
            <li>{errors}</li>
        </ul>
    )

})

export default Errors;