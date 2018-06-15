import React, { Component } from "react";
import { getDetails } from "../../helpers/moviedbapi";

import "./MovieItem.less";

export class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: "",
            budget: "",
            isShow: false
        };
    }

    componentDidMount() {
        this.getMovieDetails();
    }

    getMovieDetails() {
        if (this.props.isLoadingList) {
            setTimeout( () => { 
                this.getMovieDetails();
            }
                , 2000);
            return false;
        }
        getDetails(this.props.movie.id).then(details =>
            this.setDetails(details),
            error => {
                console.log(error);
                this.getMovieDetails();
            }
        );
    }

    setDetails(details) {
        let newGenres = details.genres.map(genre => genre.name);
        this.setState({
            genres: newGenres.join(", "),
            budget: details.budget + "$"
        });
    }

    openDetailInfo() {
        this.props.changeDetailedMovieId(this.props.movie.id);
        this.props.openDetail();
    }

    showInfo() {
        this.setState({
            isShow: true
        });
    }

    hideInfo() {
        this.setState({
            isShow: false
        });
    }

    addFavoriteMovie(event) {
        event.stopPropagation();
        this.props.addFavoriteMovie(this.props.movie.id);
    }

    deleteFavoriteMovie(event) {        
        event.stopPropagation();
        this.props.deleteFavoriteMovie(this.props.movie.id);
    }

    render() {
        const { movie } = this.props;
        const release_date = new Date(movie.release_date).getFullYear();
        return (
            <li
                className="movie-item"
                onMouseOver={this.showInfo.bind(this)}
                onMouseOut={this.hideInfo.bind(this)}
                onClick={this.openDetailInfo.bind(this)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                />
                <div
                    className="info"
                    style={{
                        visibility: this.state.isShow ? "visible" : "hidden"
                    }}
                    onClick={this.stopPropagation}
                >
                    <h2 className="movie-title">
                        {movie.title} ({release_date})
                    </h2>
                    <span className="short-info">
                        Рейтинг: {movie.vote_average} <br />
                        Жанры: {this.state.genres} <br />
                        Бюджет: {this.state.budget}
                    </span>
                    <button
                        onClick={this.props.isInFavorite ? this.deleteFavoriteMovie.bind(this) : this.addFavoriteMovie.bind(this)}
                        className={this.props.isInFavorite ? "in-favorite" : ""}
                    >
                    {this.props.isInFavorite ? "В избранном" : "В избранное"}                        
                    </button>
                </div>
                <div className="background" />
            </li>
        );
    }
}

// {genres} <br />
