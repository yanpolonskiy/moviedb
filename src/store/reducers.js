import * as constants from "../constants/storeConstans";

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
            return {
                ...state,
                favorites: action.payload
            };

        case constants.DELETE_FAVORITE_MOVIE:
           return {
                ...state,
                favorites: action.payload
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
