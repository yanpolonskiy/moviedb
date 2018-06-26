import React, { Component } from "react";
import * as mvApi from "../../helpers/moviedbapi";

import "./FavoriteItem.less";

export class FavoriteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
    }

    componentDidMount() {
        const { id } = this.props;
        mvApi.get(4, 1, "", id).then(data => {
            this.setState({
                details: data
            });
        });
    }

    openInfo = () => {
        this.props.changeDetailedMovieId(this.state.details.id);
        this.props.openDetail();
    };

    deleteFavoriteMovie = event => {
        this.props.deleteFavoriteMovie(this.state.details.id);
        event.stopPropagation();
    };
    render() {
        let { details } = this.state;

        return (
            <li className="favorite-item" onClick={this.openInfo}>
                <img
                    src={`https://image.tmdb.org/t/p/w200/${
                        details.poster_path
                    }`}
                />
                <div className="background" />
                <a
                    className="delete-button"
                    onClick={this.deleteFavoriteMovie}
                />
            </li>
        );
    }
}
