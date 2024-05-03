import React, { useEffect, useState } from 'react';
import { getMovie } from '../../services';
import { IMovieResponse } from '../types';
import MovieCardMap from '../../components/MovieMap/MovieMap';

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getPopularMovies = async () =>{
    /* try{
      const res = await getPopular();
    } catch(err) {

    } */
    await getMovie("popular").then((data) => {
      if (data && data.data)
        console.log(data.data.results);
        setMovies(data.data.results);
    })
    .catch((err) => {
      console.log(err);
      setErrorOnRequest(true)
    });
  };

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {

    }, 5000);
    getPopularMovies();
    setIsLoading(false)
  }, []);

  return (
    <div>
      <h1 className='text-3xl px-4 m-4'>POPULAR</h1>
      <div className='px-5'>
        {isLoading && <div>Loading...</div>}
        {errorOnRequest && <div>Error...</div>}
        {movies?.length > 0 && 
          <MovieCardMap movies={movies}/>
        }
      </div>
    </div>
  );
}

export default Popular;