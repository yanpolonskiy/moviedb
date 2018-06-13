import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./moviesListApp.less";
import InfiniteScroll from "react-infinite-scroller";

import { guid } from "../../helpers/utils.js";
import * as actions from "../../store/actions";
import { PopularMoviesList } from "../PopularMoviesList/PopularMoviesList";
import { Favorites } from "../Favorites/Favorites";
import { Popup } from "../PopUp/PopUp";
import { Detailed } from "../Detailed/Detailed";

import { FilterInput } from "../FilterInput/FilterInput";
import { getPopular, getSimilarMovies } from "../../helpers/moviedbapi";

class MoviesListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            total_pages: 1,
            isPopUpVisible: false,
            popUpId: -1,
            detailedMovieId: null
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.loadMovies.bind(this));
        const { loadPopularMovies, loadSimilarMovies } = this.props;
        getPopular(this.state.page).then(data => {
            this.setState({
                detailedMovieId: data.results[0].id,
                total_pages: data.total_pages
            });
            loadPopularMovies(data.results);
        });
    }

    loadMovies() {
        if (
            window.innerHeight + window.scrollY <
            document.body.offsetHeight - 2
        )
            return false;
        let newPage = this.state.page + 1;
        const { loadPopularMovies } = this.props;
        getPopular(newPage).then(data => {
            loadPopularMovies(data.results);
            this.setState({
                page: newPage
            });
        });
    }

    changeDetailedMovieId(id) {
        this.setState({
            detailedMovieId: id
        });
    }

    closePopUp() {
        this.setState({
            isPopUpVisible: false
        });
        document.querySelector("body").style.overflowY = "scroll";
    }

    openFavorites() {
        this.setState({
            isPopUpVisible: true,
            popUpId: 0
        });
        document.querySelector("body").style.overflowY = "hidden";
    }

    openDetail() {
        this.setState({
            isPopUpVisible: true,
            popUpId: 1
        });
        document.querySelector("body").style.overflowY = "hidden";
    }

    render() {
        return (
            <div id="movies-list-app" onScroll={this.loadMovies.bind(window)}>
                <div className="menu">
                    <FilterInput placeholder="Введите название фильма" />
                    <button onClick={this.openFavorites.bind(this)}>
                        {" "}
                        Избранное{" "}
                    </button>
                </div>
                <PopularMoviesList
                    isPopUpVisible={this.state.isPopUpVisible}
                    popularMovies={this.props.popuparMovies}
                    addFavoriteMovie={this.props.addFavoriteMovie}
                    openDetail={this.openDetail.bind(this)}
                    changeDetailedMovieId={this.changeDetailedMovieId.bind(
                        this
                    )}
                />
                <Popup
                    id={this.state.popUpId}
                    isVisible={this.state.isPopUpVisible}
                    closePopUp={this.closePopUp.bind(this)}
                >
                    <Favorites
                        favorites={this.props.favorites}
                        openDetail={this.openDetail.bind(this)}
                        deleteFavoriteMovie={this.props.deleteFavoriteMovie}
                        changeDetailedMovieId={this.changeDetailedMovieId.bind(
                            this
                        )}
                    />
                    <Detailed
                        id={this.state.detailedMovieId}
                        openDetail={this.openDetail.bind(this)}
                        changeDetailedMovieId={this.changeDetailedMovieId.bind(
                            this
                        )}
                    />
                </Popup>
            </div>
        );
    }
}

const putStateToProps = state => {
    return {
        popuparMovies: state.popuparMovies,
        favorites: state.favorites
    };
};

const putActionsToProps = dispatch => {
    return {
        loadPopularMovies: bindActionCreators(
            actions.loadPopularMovies,
            dispatch
        ),
        addFavoriteMovie: bindActionCreators(
            actions.addFavoriteMovie,
            dispatch
        ),
        deleteFavoriteMovie: bindActionCreators(
            actions.deleteFavoriteMovie,
            dispatch
        )
    };
};

export default connect(
    putStateToProps,
    putActionsToProps
)(MoviesListApp);
