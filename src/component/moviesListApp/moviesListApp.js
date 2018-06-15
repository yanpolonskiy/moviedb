import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./moviesListApp.less";
import InfiniteScroll from "react-infinite-scroller";

import { isNeedToLoad, filtration } from "../../helpers/utils.js";
import * as actions from "../../store/actions";
import { MoviesList } from "../MoviesList/MoviesList";
import { Favorites } from "../Favorites/Favorites";
import { Popup } from "../PopUp/PopUp";
import { Detailed } from "../Detailed/Detailed";

import { FilterInput } from "../FilterInput/FilterInput";
import {
    getPopular,
    getSimilarMovies,
    searchMovies
} from "../../helpers/moviedbapi";

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
        const { loadMovies } = this.props;
        getPopular(this.state.page).then(
            data => {
                this.setState({
                    detailedMovieId: data.results[0].id,
                    total_pages: data.total_pages
                });
                loadMovies(data.results);
            },
            message => console.log(message)
        );
    }

    loadMovies() {
        if (
            !isNeedToLoad() ||
            this.state.total_pages === this.state.page + 1 ||
            this.state.isLoadingData
        )
            return false;
        let newPage = this.state.page + 1;
        const { loadMovies } = this.props;
        this.setState({
            isLoadingData: true
        });
        if (!this.props.searchWord) {
            getPopular(newPage).then(
                data => {
                    if (data.results && data.results.length) {
                        loadMovies(data.results);
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
                message => {
                    console.log(message);
                    this.setState({
                        isLoadingData: false
                    });
                }
            );
        } else {
            searchMovies(newPage, this.props.searchWord).then(
                data => {
                    if (data.results && data.results.length) {
                        loadMovies(data.results);
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
                message => {
                    console.log(message);
                    this.setState({
                        isLoadingData: false
                    });
                }
            );
        }
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

    search(event) {
        if (event.which !== 13) return false;
        const { loadMovies, cleanMovies } = this.props;
        cleanMovies();
        if (!this.props.searchWord) {
            this.setState({
                isLoadingData: true
            });
            getPopular(1).then(
                data => {
                    if (data.results && data.results.length) {
                        loadMovies(data.results);
                        this.setState({
                            total_pages: data.total_pages,
                            isLoadingData: false
                        });
                    } else {
                        this.setState({
                            isLoadingData: false
                        });
                    }
                },
                message => {
                    console.log(message);
                    this.setState({
                        isLoadingData: false
                    });
                }
            );
        } else {
            this.setState({
                isLoadingData: true
            });
            searchMovies(1, this.props.searchWord).then(
                data => {
                    if (data.results && data.results.length) {
                        loadMovies(data.results);
                        this.setState({
                            total_pages: data.total_pages,
                            isLoadingData: false
                        });
                    } else {
                        this.setState({
                            isLoadingData: false
                        });
                    }
                },
                message => {
                    console.log(message);
                    this.setState({
                        isLoadingData: false
                    });
                }
            );
        }
    }

    loadPopular(page) {
        
    }

    render() {
        return (
            <div id="movies-list-app">
                <div className="menu">
                    <FilterInput
                        placeholder="Введите название фильма"
                        onInput={e =>
                            this.props.changeSearchWord(e.target.value)
                        }
                        startSearch={this.search.bind(this)}
                    />
                    <button onClick={this.openFavorites.bind(this)}>
                        Избранное
                    </button>
                </div>
                <MoviesList
                    isPopUpVisible={this.state.isPopUpVisible}
                    favorites={this.props.favorites}
                    movies={this.props.movies}
                    isLoadingList={this.state.isLoadingData}
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
        cleanMovies: bindActionCreators(actions.cleanMovies, dispatch)
    };
};

export default connect(
    putStateToProps,
    putActionsToProps
)(MoviesListApp);
