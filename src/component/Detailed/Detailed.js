import React, { Component } from "react";
import { DetailedMovie } from "../DetailedMovie/DetailedMovie";
import { SimilarMovies } from "../SimilarMovies/SimilarMovies";
import { getDetails, getSimilarMovies } from "../../helpers/moviedbapi";

import "./Detailed.less";

export class Detailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            favMovies: [],
            isLoadingMovie: true,
            isLoadingFavMovies: true
        };
    }

    componentDidMount() {
        getDetails(this.props.id).then(movie => this.setNewMovie(movie));
        getSimilarMovies(this.props.id).then(response =>
            this.setNewFavMovies(response.results)
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: true
        });
        getDetails(nextProps.id).then(movie => this.setNewMovie(movie));
        getSimilarMovies(nextProps.id).then(response =>
            this.setNewFavMovies(response.results)
        );
    }

    setNewMovie(newMovie) {
        this.setState({
            movie: newMovie,
            isLoadingMovie: false
        });
    }

    setNewFavMovies(newSimMovies) {
        let updatedMovies = newSimMovies;
        updatedMovies.length = 4;
        this.setState({
            favMovies: updatedMovies,
            isLoadingFavMovies: false
        });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div className="detailed" onClick={this.stopPropagation}>
                <DetailedMovie
                    movie={this.state.movie}
                    isLoading={this.state.isLoadingMovie}
                    openDetail={this.props.openDetail}
                    changeDetailedMovieId={this.props.changeDetailedMovieId}
                />
                <SimilarMovies
                    movies={this.state.favMovies}
                    openDetail={this.props.openDetail}
                    changeDetailedMovieId={this.props.changeDetailedMovieId}
                />
            </div>
        );
    }
}
