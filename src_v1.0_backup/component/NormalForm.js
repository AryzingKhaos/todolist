import React from 'react';

import './NormalForm.css';

const NormalForm = (props) => {
	return (
		<div className="NormalForm">
            {
                props.formArr.map((item, index) => {
                    return (
                        <div className="formOne" key={item.id}>
                            <label htmlFor={"title"+item.keyValue}>{item.title}</label>
                            <input id={"title"+item.keyValue} placeholder={item.placeHolder} value={props[item.stateName]} onChange={item.changeHandler}/>
                        </div>
                    )
                })
            }
        </div>
	);
}

export default NormalForm;



