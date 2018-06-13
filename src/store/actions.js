import * as constants from '../constants/storeConstans';
import { sortObjectByName } from '../helpers/utils'

export const loadPopularMovies = (popuparMovies) => {
    return {
        type: constants.LOAD_POPULAR_MOVIES,
        payload: popuparMovies
    };
};

export const addFavoriteMovie = (id) => {
    return {
        type: constants.ADD_FAVORITE_MOVIE,
        payload: id
    }
}

export const deleteFavoriteMovie = (id) => {
    return {
        type: constants.DELETE_FAVORITE_MOVIE,
        payload: id
    }
}
