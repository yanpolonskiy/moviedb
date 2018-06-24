import React, { Component } from "react";
import "./Favorites.less";

import { FavoriteItem } from "../FavoriteItem/FavoriteItem";

export class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteMovies: []
        };
    }

    addFavorite = (data, index) => {
        this.setState({
            favoriteMovies: [].concat(this.state.favoriteMovies, data)
        });
    }

    stopPropagation = event => {
        event.stopPropagation();
    }

    render() {
        const { favorites, openDetail, changeDetailedMovieId, deleteFavoriteMovie } = this.props;
        
        return (
            <div className="favorites-container" onClick={this.stopPropagation}>
                <h2>Избранное</h2>
                <ul className="favorite-list">
                    {favorites.map(id => (
                        <FavoriteItem
                            key={id}
                            id={id}
                            openDetail={openDetail}
                            deleteFavoriteMovie={deleteFavoriteMovie}
                            changeDetailedMovieId={
                                changeDetailedMovieId
                            }
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
