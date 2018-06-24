import React, { Component } from "react";
import "./SimilarMovieItem.less";

export class SimilarMovieItem extends Component {  

    openInfo = () => {
        this.props.changeDetailedMovieId(this.props.movie.id);
        this.props.openDetail();        
    }

    render() { 
        const { movie } = this.props;   
        
    return (
        <li className="similar-movie-item" onClick={this.openInfo}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
            <h2 className="movie-title">{movie.title || ''}</h2>
        </li>
    );
};
}