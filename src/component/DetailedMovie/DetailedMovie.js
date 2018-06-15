import React, { Component } from "react";
import "./DetailedMovie.less";

import { formatNum } from "../../helpers/utils";

export class DetailedMovie extends Component {
    addFavoriteMovie(event) {
        event.stopPropagation();
        this.props.addFavoriteMovie(this.props.movie.id);
    }

    deleteFavoriteMovie(event) {        
        event.stopPropagation();
        this.props.deleteFavoriteMovie(this.props.movie.id);
    }
    render() {
    if (this.props.isLoading) {
        return (
            <div className="detailed-movie">
            </div>
        );
    } else if (!this.props.isLoading) {
        const movie = this.props.movie;
        const release_date = new Date(movie.release_date).getFullYear();
        const genres = movie.genres.map(genre => genre.name).join(", ");
        const budget = formatNum('' + movie.budget);
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
                    <span className="description">{movie.overview || "Нет описания"}</span>
                </div>
                <button
                        onClick={this.props.isInFavorite ? this.deleteFavoriteMovie.bind(this) : this.addFavoriteMovie.bind(this)}
                        className={this.props.isInFavorite ? "in-favorite" : ""}
                    >                     
                 </button>
            </div>
        );
    }
}
};
