import * as constants from '../constants/storeConstans';
export const initialState = {
    popularMovies: [],
    favorites: [383498, 284054, 482560]
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOAD_POPULAR_MOVIES:
            return {
                ...state,
                popularMovies: [].concat(state.popularMovies, action.payload)
            };

        case constants.ADD_FAVORITE_MOVIE:
        let updatedFavorites = state.favorites.includes(action.payload) ? state.favorites : [].concat(state.favorites, action.payload);
        return {
            ...state,
            favorites: updatedFavorites
        };

        case constants.DELETE_FAVORITE_MOVIE:
        console.log(state.favorites.filter( id => id !== action.payload));
        return {
            ...state,
            favorites: state.favorites.filter( id => id !== action.payload)
        }
        
    }
    return state;
}