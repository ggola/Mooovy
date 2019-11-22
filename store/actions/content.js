export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const GET_POPULAR_SERIES = 'GET_POPULAR_SERIES';
export const GET_MOVIES_BY_GENRE = 'GET_MOVIES_BY_GENRE';
export const GET_SERIES_BY_GENRE = 'GET_SERIES_BY_GENRE';
export const GET_FILTERED_MOVIES = 'GET_FILTERED_MOVIES';
export const GET_FILTERED_SERIES = 'GET_FILTERED_SERIES';
export const DELETE_FILTERED_CONTENT = 'DELETE_FILTERED_CONTENT';

// Models
import Content from '../../models/content';

import ENV from '../../ENV';

// Action: GET_POPULAR_MOVIES
export const getPopularMovies = (pageNumber) => {
    
    return async dispatch => {     
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${ENV.api_key}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching popular movies' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const popularMovies = [];
                for (var i = 0; i < resData.results.length; i++) {
                    popularMovies.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].title,
                        releaseDate = resData.results[i].release_date,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'MOVIE'
                    ))
                }
                
                dispatch({
                    type: GET_POPULAR_MOVIES,
                    popularMovies: popularMovies
                });

            } 
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: GET_TV_SERIES
export const getPopularSeries = (pageNumber) => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${ENV.api_key}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching popular series' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const popularSeries = [];
                for (var i = 0; i < resData.results.length; i++) {
                    popularSeries.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].name,
                        releaseDate = resData.results[i].first_air_date,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'TV SERIES'
                    ))
                }

                dispatch({
                    type: GET_POPULAR_SERIES,
                    popularSeries: popularSeries
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: GET_MOVIES_BY_GENRE
export const getMoviesByGenre = (genreId, pageNumber) => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ENV.api_key}&with_genres=${genreId}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching movies by genres' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const moviesByGenres = [];
                for (var i = 0; i < resData.results.length; i++) {
                    moviesByGenres.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].title,
                        releaseDate = resData.results[i].release_date,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'MOVIE'
                    ))
                }

                dispatch({
                    type: GET_MOVIES_BY_GENRE,
                    genreId: genreId,
                    moviesByGenres: moviesByGenres
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}


// Action: GET_SERIES_BY_GENRE
export const getSeriesByGenre = (genreId, pageNumber) => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${ENV.api_key}&with_genres=${genreId}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching series by genres' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const seriesByGenres = [];
                for (var i = 0; i < resData.results.length; i++) {
                    seriesByGenres.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].name,
                        releaseDate = null,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'TV SERIES'
                    ))
                }

                dispatch({
                    type: GET_SERIES_BY_GENRE,
                    genreId: genreId,
                    seriesByGenres: seriesByGenres
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: GET_FILTERED_MOVIES
export const getFilteredMovies = (searchQuery, pageNumber) => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ENV.api_key}&query=${searchQuery}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching filtered movies' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const filteredMovies = [];
                for (var i = 0; i < resData.results.length; i++) {
                    filteredMovies.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].title,
                        releaseDate = resData.results[i].release_date,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'MOVIE'
                    ))
                }

                dispatch({
                    type: GET_FILTERED_MOVIES,
                    filteredMovies: filteredMovies
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: GET_FILTERED_SERIES
export const getFilteredSeries = (searchQuery, pageNumber) => {

    return async dispatch => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${ENV.api_key}&query=${searchQuery}&page=${pageNumber}`);

            if (!response.ok) {
                throw new Error('Error fetching filtered series' + response.status)
            }

            if (response) {
                const resData = await response.json();

                const filteredSeries = [];
                for (var i = 0; i < resData.results.length; i++) {
                    filteredSeries.push(new Content(
                        id = resData.results[i].id,
                        popularity = resData.results[i].popularity,
                        voteCount = resData.results[i].vote_count,
                        voteAverage = resData.results[i].vote_average,
                        title = resData.results[i].name,
                        releaseDate = resData.results[i].first_air_date,
                        originalLanguage = resData.results[i].original_language,
                        genreIds = resData.results[i].genre_ids,
                        backdropPath = resData.results[i].backdrop_path,
                        overview = resData.results[i].overview,
                        posterPath = resData.results[i].poster_path,
                        category = 'TV SERIES'
                    ))
                }

                dispatch({
                    type: GET_FILTERED_SERIES,
                    filteredSeries: filteredSeries
                });

            }
        } catch (err) {
            throw new Error('Incorrect request url');
        }
    }
}

// Action: DELETE_FILTERED_CONTENT
export const deleteFilteredContent = () => {
    return {
        type: DELETE_FILTERED_CONTENT
    };
};