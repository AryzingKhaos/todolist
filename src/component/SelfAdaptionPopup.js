import React from 'react';
import NormalForm from './NormalForm.js';

import './SelfAdaptionPopup.css';

const SelfAdaptionPopup = (props) => {
	return (
		<div className="popup SelfAdaptionPopup">
            <div className="mask"></div>
            <div className="wrap">
                <div className="close">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2469">
						<path d="M886.592 841.344L557.248 512l329.36-329.36a32 32 0 1 0-45.264-45.232L512 466.752 182.656 137.408a32 32 0 1 0-45.264 45.232L466.752 512 137.408 841.344a32 32 0 1 0 45.232 45.264L512 557.248l329.36 329.36a32 32 0 1 0 45.232-45.264z" p-id="2470" data-spm-anchor-id="a313x.7781069.1998910418.i0"></path>
					</svg>
                </div>
                <div className="title"></div>
                
                <div className="content">
                    <NormalForm formArr={props.formArr} />
                </div>
                
            </div>
            <div className="mask"></div>
        </div>
	);
}

export default SelfAdaptionPopup;