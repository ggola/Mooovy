export const GET_MOVIES_GENRES = 'GET_MOVIES_GENRES';
export const GET_SERIES_GENRES = 'GET_SERIES_GENRES';

// Models
import Genre from '../../models/genre';

import ENV from '../../ENV';

// Action: GET_MOVIES_GENRES
export const getMoviesGenres = () => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ENV.api_key}`);

            if (!response.ok) {
                throw new Error('Error fetching movie genres' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const movieGenres = [];
                for (var i = 0; i < resData.genres.length; i++) {
                    movieGenres.push(new Genre(
                        id = resData.genres[i].id,
                        name = resData.genres[i].name
                    ))
                }

                dispatch({
                    type: GET_MOVIES_GENRES,
                    movieGenres: movieGenres
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: GET_SERIES_GENRES
export const getSeriesGenres = () => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${ENV.api_key}`);

            if (!response.ok) {
                throw new Error('Error fetching series genres' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const seriesGenres = [];
                for (var i = 0; i < resData.genres.length; i++) {
                    seriesGenres.push(new Genre(
                        id = resData.genres[i].id,
                        name = resData.genres[i].name
                    ))
                }

                dispatch({
                    type: GET_SERIES_GENRES,
                    seriesGenres: seriesGenres
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}