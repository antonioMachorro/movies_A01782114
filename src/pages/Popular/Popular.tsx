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
      <h1 className='text-4xl mt-4 mx-8 font-montserrat text-white'>POPULAR</h1>
        <div className='px-5 mx-4'>
          <p className='mt-4 font-poppins text-white text-lg'>Check today's most popular movies!</p>
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