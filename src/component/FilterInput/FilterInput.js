import React, { Component } from "react";
import "./FilterInput.less";

export const FilterInput = props => {
    return (
        <input
            type="text"
            className="filter-input"
            onChange={props.onInput}
            placeholder={props.placeholder}
            onKeyPress={props.startSearch}
        />
    );
};
