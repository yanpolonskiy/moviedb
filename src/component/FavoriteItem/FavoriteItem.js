import React, { Component } from "react";
import { getDetails } from "../../helpers/moviedbapi";

import "./FavoriteItem.less";

export class FavoriteItem extends Component {
    openInfo() {
        this.props.changeDetailedMovieId(this.props.movie.id);
        this.props.openDetail();        
    }

    deleteFavoriteMovie(event) {
        this.props.deleteFavoriteMovie(this.props.movie.id);        
        event.stopPropagation();
    }
    render() {
    const { movie } = this.props;
    return (
        <li className="movie-item" onClick={this.openInfo.bind(this)}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />            
            <div className="background" />
            <a className="delete-button" onClick={this.deleteFavoriteMovie.bind(this)}></a>
        </li>
    );
}
};
