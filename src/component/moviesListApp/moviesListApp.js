import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./moviesListApp.less";
import InfiniteScroll from "react-infinite-scroller";

import { isNeedToLoad, filtration } from "../../helpers/utils.js";
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
            isLoadingData: false,
            detailedMovieId: null
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.loadMovies.bind(this));
        const { loadPopularMovies, loadSimilarMovies } = this.props;
        getPopular(this.state.page).then(
            data => {
                this.setState({
                    detailedMovieId: data.results[0].id,
                    total_pages: data.total_pages
                });
                loadPopularMovies(data.results);
            },
            message => console.log(message)
        );
    }

    loadMovies(isNotScroll = false) {
        if (!isNotScroll) {
        if (
            !isNeedToLoad() ||
            this.state.total_pages === this.state.page + 1 ||
            this.state.isLoadingData
        )
            return false;
    }
        let newPage = this.state.page + 1;
        const { loadPopularMovies } = this.props;
        this.setState({
            isLoadingData: true
        });
        getPopular(newPage).then(
            data => {
                if (data.results && data.results.length) {
                    loadPopularMovies(data.results);
                    this.setState({
                        page: newPage,
                        isLoadingData: false
                    });
                } else {
                    this.setState({
                        isLoadingData: false
                    });
                }
            },
            message => console.log(message)
        );
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

    filtration(e) {
        this.props.changeFilterWord(e.target.value);
        if(e.target.value === '') return false;
        let B = document.body;
        let DE = document.documentElement;
        let S = Math.max(B.scrollTop, DE.scrollTop, window.pageYOffset);
        if (S === 0) {
            this.loadMovies(true);
        }        
    }

    render() {
        return (
            <div id="movies-list-app" onScroll={this.loadMovies.bind(window)}>
                <div className="menu">
                    <FilterInput
                        placeholder="Введите название фильма"
                        onInput={this.filtration.bind(this)}
                    />
                    <button onClick={this.openFavorites.bind(this)}>
                        Избранное
                    </button>
                </div>
                <PopularMoviesList
                    isPopUpVisible={this.state.isPopUpVisible}
                    favorites={this.props.favorites}
                    popularMovies={this.props.popularMovies}
                    addFavoriteMovie={this.props.addFavoriteMovie}
                    deleteFavoriteMovie={this.props.deleteFavoriteMovie}
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
        popularMovies: filtration(
            state.popularMovies,
            ["title"],
            state.filterWord
        ),
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
        ),
        changeFilterWord: bindActionCreators(actions.changeFilterWord, dispatch)
    };
};

export default connect(
    putStateToProps,
    putActionsToProps
)(MoviesListApp);
