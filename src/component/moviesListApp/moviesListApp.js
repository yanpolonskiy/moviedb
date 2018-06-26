import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./moviesListApp.less";

import * as actions from "../../store/actions";
import { MoviesList } from "../MoviesList/MoviesList";
import { Popup } from "../PopUp/PopUp";
import { FilterInput } from "../FilterInput/FilterInput";

import { isNeedToLoad, disableScrolling, enableScrolling } from "../../helpers/utils.js";
import { get as storageGet, set as storageSet } from "../../helpers/localStorage";

import * as mvApi from "../../helpers/moviedbapi";

class MoviesListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genreList: [],
            page: 1,
            total_pages: 1,
            isPopUpVisible: false,
            popUpId: -1,
            isLoadingData: false,
            detailedMovieId: null
        };

    }
    componentDidMount() {        
        window.addEventListener("scroll", this.scrollHandler);
        const { loadMovies, loadFavorites } = this.props;
       this.requestMovies(1, this.state.page);
       mvApi.get(5).then(
            data => {
                this.setState({
                    genreList: data.genres
                });
            },
            message => console.log(message)
        );
    }

    scrollHandler = () => {
        this.loadMovies();
        this.trackScroll();
    }

    trackScroll = () => {
        let goTopBtn = document.querySelector(".back-to-top");
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight - 850;
        if (scrolled > coords) {
            goTopBtn.classList.add("show");
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove("show");
        }
    }

    backToTop = () => {
        if (window.pageYOffset > 0) {
            window.scroll(0, 10);
        }
    }

    loadMovies = () => {
        if (
            !isNeedToLoad() ||
            this.state.total_pages <= this.state.page ||
            this.state.isLoadingData
        )
            return false;
        const { loadMovies } = this.props;
        if (!this.state.isLoadingData) {
            if (!this.props.searchWord) {
                this.requestMovies(1, this.state.page + 1);
            } else {
                this.requestMovies(3, this.state.page + 1);
            }
        }
    }

    changeDetailedMovieId = id => {
        this.setState({
            detailedMovieId: id
        });
    }

    closePopUp = () => {
        this.setState({
            isPopUpVisible: false
        });
       enableScrolling();
    }


    openPopUp = id => {
        this.setState({
            isPopUpVisible: true,
            popUpId: id
        });
       disableScrolling();
    }

    requestMovies = (type, page) => {
        const { loadMovies } = this.props;
        this.setState({
            isLoadingData: true
        });
        mvApi.get(type, page, this.props.searchWord).then(
            data => {
                if (data.results && data.results.length) {
                    loadMovies(data.results);
                    this.setState({
                        page: this.state.page + 1,
                        total_pages: data.total_pages
                    });
                }
                this.setState({
                    isLoadingData: false
                });
            },
            message => {
                console.log(message);
            }
        );
    }

    search = event => {
        const { cleanMovies } = this.props;
        if (event.which !== 13) return false;
        cleanMovies();
        if (!this.state.isLoadingData) {
            if (!this.props.searchWord) {
                this.requestMovies(1, 1);
            } else {
                this.requestMovies(3, 1);
            }
            this.setState({
                page: 1
            });
        }
    }

    render() {
        const { isPopUpVisible, genreList, popUpId, detailedMovieId } = this.state;
        const {changeSearchWord, favorites, movies, addFavoriteMovie, deleteFavoriteMovie} = this.props;

        return (
            <div id="movies-list-app">
            <Popup
                    id={popUpId}
                    dMovieId={detailedMovieId}
                    isVisible={isPopUpVisible}
                    closePopUp={this.closePopUp}
                    favorites={favorites}
                    openDetail={() => this.openPopUp(1)}
                    deleteFavoriteMovie={deleteFavoriteMovie}
                    changeDetailedMovieId={this.changeDetailedMovieId}
                    addFavoriteMovie={addFavoriteMovie}
                >
                    
                </Popup>
                <div className="menu">
                    <FilterInput
                        placeholder="Введите название фильма"
                        onInput={e =>
                            changeSearchWord(e.target.value)
                        }
                        startSearch={this.search}
                    />
                    <button onClick={() => this.openPopUp(0)}>
                        Избранное: {favorites.length}
                    </button>
                </div>
                <MoviesList
                    favorites={favorites}
                    genreList={genreList}
                    movies={movies}
                    addFavoriteMovie={addFavoriteMovie}
                    deleteFavoriteMovie={deleteFavoriteMovie}
                    openDetail={() => this.openPopUp(1)}
                    changeDetailedMovieId={this.changeDetailedMovieId}
                />
                
                <a
                    className="back-to-top"
                    title="Наверх"
                    onClick={this.backToTop}
                >
                    ↑
                </a>
            </div>
        );
    }
}

const putStateToProps = state => {
    return {
        movies: state.movies,
        favorites: state.favorites,
        searchWord: state.searchWord
    };
};

const putActionsToProps = dispatch => {
    return {
        loadMovies: bindActionCreators(actions.loadMovies, dispatch),
        addFavoriteMovie: bindActionCreators(
            actions.addFavoriteMovie,
            dispatch
        ),
        deleteFavoriteMovie: bindActionCreators(
            actions.deleteFavoriteMovie,
            dispatch
        ),
        changeSearchWord: bindActionCreators(
            actions.changeSearchWord,
            dispatch
        ),
        cleanMovies: bindActionCreators(actions.cleanMovies, dispatch),
        loadFavorites: bindActionCreators(actions.loadFavorites, dispatch)
    };
};

export default connect(
    putStateToProps,
    putActionsToProps
)(MoviesListApp);
