import { GET_MOVIES_GENRES, GET_SERIES_GENRES } from '../actions/genres';

// Set initial state
const initialState = {
    movieGenres: [],
    seriesGenres: []
};

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES_GENRES: {   
            return {
                ...state,
                movieGenres: action.movieGenres
            }
        };
        case GET_SERIES_GENRES: {
            return {
                ...state,
                seriesGenres: action.seriesGenres
            }
        };
    default:
        return state;
    };
};

export default genresReducer;