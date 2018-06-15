import React, { Component } from "react";
import "./MoviesList.less";

import { MovieItem } from "../MovieItem/MovieItem";

export const MoviesList = props => {      
    return (
        <ul className="movies-list">
            {props.movies.map((movie, i) => (
                <MovieItem
                    key={movie.id}
                    isInFavorite={props.favorites.includes(movie.id)}
                    movie={movie}
                    genreList={props.genreList}
                    openDetail={props.openDetail}
                    changeDetailedMovieId={props.changeDetailedMovieId}
                    addFavoriteMovie={props.addFavoriteMovie}
                    deleteFavoriteMovie={props.deleteFavoriteMovie}
                />
            ))}
        </ul>
    );    
};
