import React, { Component } from "react";
import "./LoadAnimator.less";

export const LoadAnimator = props => {
    return (
        <div
            id="fountainG"
            style={{
                visibility: props.isLoading ? "visible" : "hidden",
                height: props.height ? props.height : '200%'
            }}
        >
            <div id="fountainG_1" className="fountainG" />
            <div id="fountainG_2" className="fountainG" />
            <div id="fountainG_3" className="fountainG" />
            <div id="fountainG_4" className="fountainG" />
            <div id="fountainG_5" className="fountainG" />
            <div id="fountainG_6" className="fountainG" />
            <div id="fountainG_7" className="fountainG" />
            <div id="fountainG_8" className="fountainG" />
        </div>
    );
};
