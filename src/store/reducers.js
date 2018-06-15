import * as constants from "../constants/storeConstans";
export const initialState = {
    movies: [],
    favorites: [383498],
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
            let updatedFavorites = state.favorites.includes(action.payload)
                ? state.favorites
                : [].concat(state.favorites, action.payload);
            return {
                ...state,
                favorites: updatedFavorites
            };

        case constants.DELETE_FAVORITE_MOVIE:
            return {
                ...state,
                favorites: state.favorites.filter(id => id !== action.payload)
            };
        case constants.CHANGE_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.payload
            };
    }
    return state;
};
