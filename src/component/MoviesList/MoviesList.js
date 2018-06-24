import React, { Component } from "react";
import "./MoviesList.less";

import { MovieItem } from "../MovieItem/MovieItem";

export class MoviesList extends React.PureComponent {  
    render() {
    return (
        <ul className="movies-list">
            {this.props.movies.map((movie, i) => (
                <MovieItem
                    key={movie.id}
                    isInFavorite={this.props.favorites.includes(movie.id)}
                    movie={movie}
                    genreList={this.props.genreList}
                    openDetail={this.props.openDetail}
                    changeDetailedMovieId={this.props.changeDetailedMovieId}
                    addFavoriteMovie={this.props.addFavoriteMovie}
                    deleteFavoriteMovie={this.props.deleteFavoriteMovie}
                />
            ))}
        </ul>
    );   
} 
};
