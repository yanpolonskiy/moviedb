import React, { Component } from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./moviesListApp.less";

import * as actions from "../../store/actions";
import { MoviesList } from "../MoviesList/MoviesList";
import { Favorites } from "../Favorites/Favorites";
import { Popup } from "../PopUp/PopUp";
import { Detailed } from "../Detailed/Detailed";
import { FilterInput } from "../FilterInput/FilterInput";

import { isNeedToLoad, filtration } from "../../helpers/utils.js";
import { get as storageGet } from "../../helpers/localStorage"; 
import {
    getPopular,
    getSimilarMovies,
    searchMovies,
    getGenreList
} from "../../helpers/moviedbapi";


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
        window.addEventListener("scroll", this.scrollHandler.bind(this));
        const { loadMovies, loadFavorites } = this.props;
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
        getGenreList(this.state.page).then(
            data => {
                this.setState({
                    genreList: data.genres,
                });
            },
            message => console.log(message)
        );
        loadFavorites(storageGet('favorites'));
    }

    scrollHandler() {
        this.loadMovies();
        this.trackScroll();
    }

   trackScroll() {       
    let goTopBtn = document.querySelector('.back-to-top');
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight-850;    
        if (scrolled > coords) {
          goTopBtn.classList.add('show');
        }
        if (scrolled < coords) {
          goTopBtn.classList.remove('show');
        }
      }

      backToTop() {
        if (window.pageYOffset > 0) {
            window.scroll(0, 10);
          }
      }

    loadMovies() {
        if (
            !isNeedToLoad() ||
            this.state.total_pages === this.state.page + 1 ||
            this.state.isLoadingData
        )
            return false;
        const { loadMovies } = this.props;        
        if (!this.state.isLoadingData) {
            this.setState({
                isLoadingData: true
            });
            if (!this.props.searchWord) {
                this.loadPopularMovies(this.state.page + 1);
            } else {
                this.loadSearchMovies(this.state.page + 1);
            }
        }
        this.setState({
            page: this.state.page + 1
        })
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
        const { cleanMovies } = this.props;
        if (event.which !== 13) return false;
        cleanMovies();
        this.setState({
            page: 1
        })
        if (!this.state.isLoadingData) {
            this.setState({
                isLoadingData: true
            });
            if (!this.props.searchWord) {
                this.loadPopularMovies(this.state.page);
            } else {
                this.loadSearchMovies(this.state.page);
            }
        }        
    }

    loadPopularMovies(page) {        
        const { loadMovies } = this.props;
        this.setState({
            isLoadingData: true
        });
        getPopular(page).then(
            data => {
                if (data.results && data.results.length) {
                    loadMovies(data.results);
                    this.setState({
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

    loadSearchMovies(page) {        
        const { loadMovies } = this.props;
        this.setState({
            isLoadingData: true
        });
        searchMovies(page, this.props.searchWord).then(
            data => {
                if (data.results && data.results.length) {
                    loadMovies(data.results);
                    this.setState({
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
                    genreList={this.state.genreList}
                    movies={this.props.movies}
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
                {   this.state.isPopUpVisible &&
                    <Favorites
                        favorites={this.props.favorites}
                        openDetail={this.openDetail.bind(this)}
                        deleteFavoriteMovie={this.props.deleteFavoriteMovie}
                        changeDetailedMovieId={this.changeDetailedMovieId.bind(
                            this
                        )}
                    />
                }
                { this.state.isPopUpVisible &&
                    <Detailed
                        id={this.state.detailedMovieId}
                        openDetail={this.openDetail.bind(this)}
                        changeDetailedMovieId={this.changeDetailedMovieId.bind(
                            this
                        )}
                        favorites={this.props.favorites}
                        addFavoriteMovie={this.props.addFavoriteMovie}
                         deleteFavoriteMovie={this.props.deleteFavoriteMovie}
                    />
                    }
                </Popup>
                <a className="back-to-top" title="Наверх" onClick={this.backToTop.bind(this)}>↑</a>
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
