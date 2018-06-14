import React, { Component } from "react";
import "./DetailedMovie.less";
import { LoadAnimator } from "../LoadAnimator/LoadAnimator";

export const DetailedMovie = props => {
    if (props.isLoading) {
        return (
            <div className="detailed-movie">
            </div>
        );
    } else if (!props.isLoading) {
        const movie = props.movie;
        const release_date = new Date(movie.release_date).getFullYear();
        const genres = movie.genres.map(genre => genre.name).join(", ");
        let title = movie.title + " " + release_date;
        return (
            <div className="detailed-movie">
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
                <div className="detailed-info">
                    <h2 className="movie-title">{title}</h2>
                    <span className="genres">Жанры: {genres}</span>
                    <span className="description">{movie.overview || "Нет описания"}</span>
                </div>
            </div>
        );
    }
};
