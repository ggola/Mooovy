import {
    GET_POPULAR_MOVIES,
    GET_POPULAR_SERIES,
    GET_MOVIES_BY_GENRE,
    GET_SERIES_BY_GENRE,
    GET_FILTERED_MOVIES,
    GET_FILTERED_SERIES,
    DELETE_FILTERED_CONTENT
} from '../actions/content';

// Set initial state
const initialState = {
    popularMoviesList: [],
    popularSeriesList: [],
    familyContent: [],
    documentaryContent: [],
    filteredMovies: [],
    filteredSeries: []
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POPULAR_MOVIES: { 
            const popMov = action.popularMovies;    
            return {
                ...state,
                popularMoviesList: popMov.concat(state.popularMoviesList)
            }
        };
        case GET_POPULAR_SERIES: {
            const popSer = action.popularSeries;
            return {
                ...state,
                popularSeriesList: popSer.concat(state.popularSeriesList)
            }
        };
        case GET_MOVIES_BY_GENRE: {
            const movGenId = action.genreId;
            const movGen = action.moviesByGenres;
            return {
                ...state,
                familyContent: movGenId === 10751 ? movGen.concat(state.familyContent) : state.familyContent,
                documentaryContent: movGenId === 99 ? movGen.concat(state.documentaryContent) : state.documentaryContent
            }
        };
        case GET_SERIES_BY_GENRE: {
            const serGenId = action.genreId;
            const serGen = action.seriesByGenres;
            return {
                ...state,
                familyContent: serGenId === 10751 ? serGen.concat(state.familyContent) : state.familyContent,
                documentaryContent: serGenId === 99 ? serGen.concat(state.documentaryContent) : state.documentaryContent
            }
        };
        case GET_FILTERED_MOVIES: {
            const filtMov = action.filteredMovies;
            return {
                ...state,
                filteredMovies: filtMov.concat(state.filteredMovies)
            }
        };
        case GET_FILTERED_SERIES: {
            const filtSer = action.filteredSeries;
            return {
                ...state,
                filteredSeries: filtSer.concat(state.filteredSeries)
            }
        };
        case DELETE_FILTERED_CONTENT: {
            return {
                ...state,
                filteredSeries: [],
                filteredMovies: []
            }
        };
    default:
        return state;
    };
};

export default contentReducer;