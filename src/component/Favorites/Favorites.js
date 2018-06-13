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
            isLoading: true
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
        this.setState({
            isLoading: true,
            favoriteMovies: []
        })
        const { favorites } = nextProps;
        if(favorites.length === 0) {
            this.setState({
                isLoading: false
            })
        }
        for (let i = 0; i < favorites.length; i++) {
            getDetails(favorites[i]).then(data => {
                this.addFavorite(data, i);
            });
        }
    }


    addFavorite(data, index) {
        let updatedFavorites = [].concat(this.state.favoriteMovies, data);
        this.setState({
            favoriteMovies: updatedFavorites
        });
        if (index === this.props.favorites.length - 1) {
            this.setState({
                isLoading: false
            });
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="favorites-container" onClick={this.stopPropagation}>
                <LoadAnimator isLoading={this.state.isLoading}                
                    height='100%'
             />
                <h2>Избранное</h2>
                <ul className="favorite-list">
                    {this.state.favoriteMovies.map(movie => (
                        <FavoriteItem
                            key={movie.id}
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
