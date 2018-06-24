import React, { Component } from "react";
import "./Detailed.less";

import { DetailedMovie } from "../DetailedMovie/DetailedMovie";
import { SimilarMovies } from "../SimilarMovies/SimilarMovies";

import * as mvApi from "../../helpers/moviedbapi";


export class Detailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            simMovies: [],
            isLoadingMovie: true
        };
    }

    componentDidMount() {
        mvApi.get(4, 1, '', this.props.id).then(movie => this.setNewMovie(movie));
        mvApi.get(2, 1, '', this.props.id).then(response =>
            this.setNewsimMovies(response.results)
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            isLoadingMovie: true
        });
        mvApi.get(4, 1, '', this.props.id).then(movie => this.setNewMovie(movie));
        mvApi.get(2, 1, '', this.props.id).then(response => {
            this.setNewsimMovies(response.results);
        });
    }
    

    setNewMovie = newMovie => {
        this.setState({
            movie: newMovie,
            isLoadingMovie: false
        });
    }

    setNewsimMovies = newSimMovies => {
        if (newSimMovies.length < 1) {
            this.setState({
                simMovies: []
            });
            return;
        }
        let updatedMovies = newSimMovies.splice(0, 4);
        this.setState({
            simMovies: updatedMovies
        });
    }

    stopPropagation = event => {
        event.stopPropagation();
    }

    render() {
        const { isLoadingMovie, movie, simMovies } = this.state;
        const { openDetail, changeDetailedMovieId, favorites, addFavoriteMovie, deleteFavoriteMovie} = this.props;

        return (
            <div className="detailed" onClick={this.stopPropagation}>
                <DetailedMovie
                    movie={movie}
                    isLoading={isLoadingMovie}
                    openDetail={openDetail}
                    changeDetailedMovieId={changeDetailedMovieId}
                    isInFavorite={favorites.includes(
                        movie.id
                    )}
                    addFavoriteMovie={addFavoriteMovie}
                    deleteFavoriteMovie={deleteFavoriteMovie}
                />
                <SimilarMovies
                    movies={simMovies}
                    openDetail={openDetail}
                    changeDetailedMovieId={changeDetailedMovieId}
                />
            </div>
        );
    }
}
