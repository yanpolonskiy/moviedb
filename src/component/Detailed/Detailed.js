import React from "react";
import "./Detailed.less";

import { DetailedMovie } from "../DetailedMovie/DetailedMovie";
import { SimilarMovies } from "../SimilarMovies/SimilarMovies";
import Spinner from "../Spinner/Spinner.js";

import * as mvApi from "../../helpers/moviedbapi";

export class Detailed extends React.Component {
    state = {
        movie: {},
        simMovies: [],
        isLoadingMovie: true,
        isLoadingSimMovies: true
    };

    componentDidMount() {
        mvApi
            .get(4, 1, "", this.props.id)
            .then(movie => this.setNewMovie(movie));
        mvApi
            .get(2, 1, "", this.props.id)
            .then(response => this.setNewsimMovies(response.results));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoadingMovie: true,
            isLoadingSimMovies: true
        });
        mvApi
            .get(4, 1, "", nextProps.id)
            .then(movie => this.setNewMovie(movie));
        mvApi.get(2, 1, "", nextProps.id).then(response => {
            this.setNewsimMovies(response.results);
        });
    }

    setNewMovie = newMovie => {
        this.setState({
            movie: newMovie,
            isLoadingMovie: false
        });
    };

    setNewsimMovies = newSimMovies => {
        let updatedMovies = []
        if (newSimMovies.length > 1) {
          updatedMovies = newSimMovies.splice(0, 4);
        }
        this.setState({
            simMovies: updatedMovies,
            isLoadingSimMovies: false
        });
    };

    stopPropagation = event => {
        event.stopPropagation();
    };

    render() {
        const { isLoadingMovie, movie, simMovies, isLoadingSimMovies } = this.state;
        const {
            openDetail,
            changeDetailedMovieId,
            favorites,
            addFavoriteMovie,
            deleteFavoriteMovie
        } = this.props;

        if (isLoadingMovie || isLoadingSimMovies) {
            return (
            <div className="detailed">
            <Spinner />
            </div>
            )
        }
        return (
            <div className="detailed" onClick={this.stopPropagation}>
                <DetailedMovie
                    movie={movie}
                    isLoading={isLoadingMovie}
                    openDetail={openDetail}
                    changeDetailedMovieId={changeDetailedMovieId}
                    isInFavorite={favorites.includes(movie.id)}
                    addFavoriteMovie={addFavoriteMovie}
                    deleteFavoriteMovie={deleteFavoriteMovie}
                />
                <SimilarMovies
                    movies={simMovies}
                    isLoading={isLoadingSimMovies}
                    openDetail={openDetail}
                    changeDetailedMovieId={changeDetailedMovieId}
                />
            </div>
        );
    }
}
