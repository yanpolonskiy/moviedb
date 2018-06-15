import React, { Component } from "react";
import "./Favorites.less";

import { FavoriteItem } from "../FavoriteItem/FavoriteItem";

import { getDetails } from "../../helpers/moviedbapi";

export class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteMovies: [],
        };
    }

    addFavorite(data, index) {
        this.setState({
            favoriteMovies: [].concat(this.state.favoriteMovies, data)
        });
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="favorites-container" onClick={this.stopPropagation}>               
                <h2>Избранное</h2>
                <ul className="favorite-list">
                    {this.props.favorites.map(id => (
                        <FavoriteItem
                            key={id}
                            id={id}
                            openDetail={this.props.openDetail}
                            deleteFavoriteMovie={this.props.deleteFavoriteMovie}
                            changeDetailedMovieId={
                                this.props.changeDetailedMovieId
                            }
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
