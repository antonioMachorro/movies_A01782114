import React from 'react';
import { MovieCard } from '../MovieCard';
import { IMovieResponse } from '../../pages/types';

interface MovieCardMapProps {
  movies: IMovieResponse[];
}


const MovieCardMap: React.FC<MovieCardMapProps> = ({movies}) => {
  return (
    <div className='space-y-4'>
    {movies.map((movie, index) => (
      <div key={movie.id}>
        <MovieCard
          movieId={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          voteAverage={movie.vote_average}
          genreId={movie.genre_ids[0]}
        />
    </div>
  ))}
</div>


  );
};

export default MovieCardMap;
