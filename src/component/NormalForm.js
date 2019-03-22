import React from 'react';

import './NormalForm.css';

const NormalForm = (props) => {
	return (
		<div className="NormalForm">
            {
                props.formArr.map((item, index) => {
                    return (
                        <div className="formOne">
                            <label for={"title"+item.keyValue}></label>
                            <input />
                        </div>
                    )
                })
            }
        </div>
	);
}

export default NormalForm;



