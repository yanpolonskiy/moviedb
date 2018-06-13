import React, { Component } from "react";
import "./PopularMoviesList.less";

import { PopularMovieItem } from "../PopularMovieItem/PopularMovieItem";
import { guid } from "../../helpers/utils.js";

export const PopularMoviesList = props => {
    console.log(props);
    return (
        <ul className="movies-list">
            {props.popularMovies.map((movie, i) => (
                <PopularMovieItem
                    key={movie.id}
                    isInFavorite={props.favorites.includes(movie.id)}
                    movie={movie}
                    openDetail={props.openDetail}
                    changeDetailedMovieId={props.changeDetailedMovieId}
                    addFavoriteMovie={props.addFavoriteMovie}
                />
            ))}
        </ul>
    );
};
