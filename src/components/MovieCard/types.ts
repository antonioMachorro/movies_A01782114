export interface IMovieCard {
    /**
     * Title of the Movie
     */
    title: string;
    /**
     * Genre id of the Movie
     */
    genreId: number;
    movieId: number;
    voteAverage: number;
    posterPath: string;
}

export interface IGenre {
    id: number;
    name: String;
}