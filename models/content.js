class Content {
    constructor(id, popularity, voteCount, voteAverage, title, releaseDate, originalLanguage, genreIds, backdropPath, overview, posterPath, category) {
        this.id = id; 
        this.popularity = popularity;
        this.voteCount = voteCount;
        this.voteAverage = voteAverage;
        this.title = title;
        this.releaseDate = releaseDate;
        this.originalLanguage = originalLanguage;
        this.genreIds = genreIds;
        this.backdropPath = backdropPath;
        this.overview = overview;
        this.posterPath = posterPath;
        this.category = category;
    }
}

export default Content;