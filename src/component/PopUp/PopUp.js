import React, { Component } from "react";
import "./PopUp.less";

import { Detailed } from "../Detailed/Detailed";
import { Favorites } from "../Favorites/Favorites";

export const Popup = props => {
    let classNameContainer = props.isVisible
        ? "pop-up-wrapper visible"
        : "pop-up-wrapper";

    let getPopupById = id => {
        switch (id) {
            case 0:
                return (
                    <Favorites
                        favorites={props.favorites}
                        openDetail={props.openDetail}
                        deleteFavoriteMovie={props.deleteFavoriteMovie}
                        changeDetailedMovieId={props.changeDetailedMovieId}
                    />
                );
            case 1:
                return (
                    <Detailed
                        id={props.dMovieId}
                        openDetail={props.openDetail}
                        changeDetailedMovieId={props.changeDetailedMovieId}
                        favorites={props.favorites}
                        addFavoriteMovie={props.addFavoriteMovie}
                        deleteFavoriteMovie={props.deleteFavoriteMovie}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={classNameContainer} onClick={props.closePopUp}>
            {getPopupById(props.id)}
        </div>
    );
};
