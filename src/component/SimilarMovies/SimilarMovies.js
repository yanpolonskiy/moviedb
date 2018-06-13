import React, { Component } from "react";
import "./SimilarMovies.less";
import { SimilarMovieItem } from "../SimilarMovieItem/SimilarMovieItem";
import { LoadAnimator } from "../LoadAnimator/LoadAnimator";

import { guid } from "../../helpers/utils.js";

export const SimilarMovies = props => {
    return (
        <div className="similar-movies-container">
            <LoadAnimator isLoading={props.isLoading} />
            <h2> Похожие фильмы </h2>
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
