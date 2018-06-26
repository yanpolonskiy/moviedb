import React, { Component } from "react";
import "./Spinner.less";

export default props => {
    return (
        <div className="cssload-tetrominos">
            <div className="cssload-tetromino cssload-box1" />
            <div className="cssload-tetromino cssload-box2" />
            <div className="cssload-tetromino cssload-box3" />
            <div className="cssload-tetromino cssload-box4" />
        </div>
    );
};
