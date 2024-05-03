import React from 'react';
import { MovieCard } from '../MovieCard';
import { IMovieResponse } from '../../pages/types';

interface MovieCardMapProps {
  movies: IMovieResponse[];
}


const MovieCardMap: React.FC<MovieCardMapProps> = ({movies}) => {
  return (
    <>
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
    </>
  );
};

export default MovieCardMap;
