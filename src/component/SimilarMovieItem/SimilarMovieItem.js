import React, { Component } from "react";
import "./SimilarMovieItem.less";

export class SimilarMovieItem extends Component {  

    openInfo() {
        this.props.changeDetailedMovieId(this.props.movie.id);
        this.props.openDetail();        
    }

    render() {    
    return (
        <li className="similar-movie-item" onClick={this.openInfo.bind(this)}>
            <img src={`https://image.tmdb.org/t/p/w200/${this.props.movie.poster_path}`} />
            <h2 className="movie-title">{this.props.movie.title || ''}</h2>
        </li>
    );
};
}