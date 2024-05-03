import React from 'react';
import { IMovieResponse } from '../../pages/types';
import { MovieCard } from '../MovieCard';

interface MovieScrollProps {
    movies: IMovieResponse[];
}

const MovieScroll: React.FC<MovieScrollProps> = ({movies}) => {
    return(
        <div className='no-scrollbar flex overflow-x-auto'>
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movieId={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            voteAverage={movie.vote_average}
            genreId={movie.genre_ids[0]}
            />
        ))}
        </div>
    );
};

export default MovieScroll;