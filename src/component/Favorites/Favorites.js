import React, { Component } from "react";
import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import { guid } from "../../helpers/utils.js";
import { getDetails } from "../../helpers/moviedbapi";
import { LoadAnimator } from "../LoadAnimator/LoadAnimator";

import "./Favorites.less";

export class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteMovies: [],
        };
    }

    componentDidMount() {
        const { favorites } = this.props;
     
        for (let i = 0; i < favorites.length; i++) {
            getDetails(favorites[i]).then(data => {
                this.addFavorite(data, i);
            });
        }
    }

    
    componentWillReceiveProps(nextProps) {
        const { favorites } = nextProps;
        this.setState({
            favoriteMovies: []
        })
        for (let i = 0; i < favorites.length; i++) {
            getDetails(favorites[i]).then(data => {
                this.addFavorite(data, i);
            });
        }
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
                    {this.state.favoriteMovies.map(movie => (
                        <FavoriteItem
                            key={guid()}
                            movie={movie}
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

/*
{this.props.favorites.map((item) => 
            <FavoriteItem key={guid()} id={item}/>
            )}
*/
