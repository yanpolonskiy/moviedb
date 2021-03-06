import * as constants from '../constants/storeConstans';
import { sortObjectByName } from '../helpers/utils';

export const loadMovies = movies => {
    return {
        type: constants.LOAD_MOVIES,
        payload: movies
    };
};

export const loadFavorites = favorites => {
    return {
        type: constants.LOAD_FAVORITES_FROM_STORAGE,
        payload: favorites
    }
}

export const addFavoriteMovie = addedFavorites => {    
    return {
        type: constants.ADD_FAVORITE_MOVIE,
        payload: addedFavorites
    }
}

export const deleteFavoriteMovie = filteredFavorites => {
    return {
        type: constants.DELETE_FAVORITE_MOVIE,
        payload: filteredFavorites
    }
}

export const changeSearchWord = word => {
    return {
        type: constants.CHANGE_SEARCH_WORD,
        payload: word
    }
}

export const cleanMovies = () => {
    return {
        type: constants.CLEAN_MOVIES
    }
}
