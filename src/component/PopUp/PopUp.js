import React, { Component } from 'react';
import './PopUp.less';

export const Popup = (props) => {
    let classNameContainer = props.isVisible ? "pop-up-wrapper visible" : "pop-up-wrapper";
    return (
        <div className={classNameContainer} onClick={props.closePopUp}>
                {props.children[props.id]}
        </div>
    );
}        
