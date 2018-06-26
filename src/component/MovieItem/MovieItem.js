import React, { Component } from "react";
import "./MovieItem.less";

export class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: "",
            budget: "",
        };
    }

    openDetailInfo = () => {
        this.props.changeDetailedMovieId(this.props.movie.id);
        this.props.openDetail();
    }

    addFavoriteMovie = event => {
        event.stopPropagation();
        this.props.addFavoriteMovie(this.props.movie.id);
    }

    deleteFavoriteMovie = event => {        
        event.stopPropagation();
        this.props.deleteFavoriteMovie(this.props.movie.id);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.isInFavorite === !this.props.isInFavorite) return true;
        if (this.props.genreList !== nextProps.genreList) return true;
        return false;
    }

    render() {
        const { movie, genreList, isInFavorite } = this.props;     
        const release_date = new Date(movie.release_date).getFullYear();
        let genres = (genreList && genreList.length) ? genreList.reduce((genres, current) => {            
            if (movie.genre_ids.includes(current.id)) {
                genres.push(current.name);
                return genres;
            }
            return genres;
        }, []).join(', ') : "loading";
        
        return (
            <li
                className="movie-item"
                onClick={this.openDetailInfo}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
                <div
                    className="info"
                >
                    <h2 className="movie-title">
                        {movie.title} ({release_date})
                    </h2>
                    <span className="short-info">
                        Рейтинг: {movie.vote_average} <br />
                        Жанры: {genres} <br />
                    </span>
                    <button
                        onClick={isInFavorite ? this.deleteFavoriteMovie : this.addFavoriteMovie}
                        className={isInFavorite ? "in-favorite" : ""}
                    >
                    {isInFavorite ? "В избранном" : "В избранное"}                        
                    </button>
                </div>
                <div className="background" />
            </li>
        );
    }
}

// {genres} <br />
