import React, { Component } from "react";
import "./DetailedMovie.less";

import { formatNum } from "../../helpers/utils";

export class DetailedMovie extends Component {
    addFavoriteMovie = event => {
        event.stopPropagation();
        this.props.addFavoriteMovie(this.props.movie.id);
    };

    deleteFavoriteMovie = event => {
        event.stopPropagation();
        this.props.deleteFavoriteMovie(this.props.movie.id);
    };

    render() {
        const { isLoading, movie, isInFavorite } = this.props;

        if (isLoading) {
            return <div className="detailed-movie" />;
        }
        const release_date = new Date(movie.release_date).getFullYear();
        const genres = movie.genres.map(genre => genre.name).join(", ");
        const budget = formatNum(movie.budget);
        let title = movie.title + " " + release_date;

        return (
            <div className="detailed-movie">
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
                <div className="detailed-info">
                    <h2 className="movie-title">{title}</h2>
                    <span className="budget">Бюджет: {budget}$</span>
                    <span className="genres">Жанры: {genres}</span>
                    <span className="description">
                        {movie.overview || "Нет описания"}
                    </span>
                </div>
                <button
                    onClick={
                        isInFavorite
                            ? this.deleteFavoriteMovie
                            : this.addFavoriteMovie
                    }
                    className={isInFavorite ? "in-favorite" : ""}
                />
            </div>
        );
    }
}
