import * as constants from "../constants/storeConstans";
import { set as storageSet, remove as storageRemove} from '../helpers/localStorage';

export const initialState = {
    movies: [],
    favorites: [],
    searchWord: ""
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOAD_MOVIES:
            return {
                ...state,
                movies: [].concat(state.movies, action.payload)
            };
            
        case constants.CLEAN_MOVIES:
            return {
                ...state,
                movies: []
            };

        case constants.ADD_FAVORITE_MOVIE:
            let addedFavorites = state.favorites.includes(action.payload)
                ? state.favorites
                : [].concat(state.favorites, action.payload);
            storageSet('favorites', addedFavorites);
            return {
                ...state,
                favorites: addedFavorites
            };

        case constants.DELETE_FAVORITE_MOVIE:
        let filteredFavorites = state.favorites.filter(id => id !== action.payload);
        storageRemove('favorites', filteredFavorites);
            return {
                ...state,
                favorites: filteredFavorites
            };
        case constants.CHANGE_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.payload
            };
        case constants.LOAD_FAVORITES_FROM_STORAGE: 
            return {
                ...state,
                favorites: action.payload
            };
    }
    return state;
};
