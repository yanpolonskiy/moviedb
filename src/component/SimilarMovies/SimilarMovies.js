import React, { Component } from "react";
import "./SimilarMovies.less";

import { SimilarMovieItem } from "../SimilarMovieItem/SimilarMovieItem";

export const SimilarMovies = props => {
    return (
        <div className="similar-movies-container">
            <h2>
                {props.movies.length > 1
                    ? "Похожие фильмы"
                    : "Похожих фильмов нет"}{" "}
            </h2>
            <ul className="similar-movies-list">
                {props.movies.map((movie, i) => (
                    <SimilarMovieItem
                        key={movie.id}
                        movie={movie}
                        openDetail={props.openDetail}
                        changeDetailedMovieId={props.changeDetailedMovieId}
                    />
                ))}
            </ul>
        </div>
    );
};
