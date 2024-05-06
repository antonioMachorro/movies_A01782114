import React, {useState, useEffect} from 'react';
import { MovieScroll } from '../../components/MovieScroll';
import { IMovieResponse } from '../types';
import { getMovie } from '../../services';

const Home = () => {

  const [popularMovies, setPopular] = useState<IMovieResponse[]>([]);
  const [topRatedMovies, setTopRated] = useState<IMovieResponse[]>([]);
  const [nowPlayingMovies, setNowPlaying] = useState<IMovieResponse[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getPopularMovies = async() => {
    await getMovie("popular").then((data) => {
      if (data && data.data)
        console.log(data.data.results);
        setPopular(data.data.results);
    })
    .catch((err) => {
      console.log(err);
      setErrorOnRequest(true)
    });
  }

  const getTopRatedMovies = async() => {
    await getMovie("top_rated").then((data) => {
      if (data && data.data)
        console.log(data.data.results);
        setTopRated(data.data.results);
    })
    .catch((err) => {
      console.log(err);
      setErrorOnRequest(true)
    });
  }

  const getNowPlayingMovies = async() => {
    await getMovie("now_playing").then((data) => {
      if (data && data.data)
        console.log(data.data.results);
        setNowPlaying(data.data.results);
    })
    .catch((err) => {
      console.log(err);
      setErrorOnRequest(true)
    });
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {

    }, 5000);
    getPopularMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
    setIsLoading(false)
  }, []);

  return (
    <div>
      <h1 className='text-4xl px-4 my-4 font-montserrat text-white'>POPULAR</h1>
      <div className='px-5 rounded-xl overflow-x-auto bg-lightgray'>
        {isLoading && <div>Loading...</div>}
        {errorOnRequest && <div>Error...</div>}
        {popularMovies?.length > 0 && 
          <MovieScroll movies={popularMovies}/>
        }
      </div>
      <h1 className='text-4xl px-4 font-montserrat text-white mt-8 mb-4'>NOW PLAYING</h1>
      <div className='px-5 rounded-xl overflow-x-auto bg-lightgray'>
        {isLoading && <div>Loading...</div>}
        {errorOnRequest && <div>Error...</div>}
        {popularMovies?.length > 0 && 
          <MovieScroll movies={nowPlayingMovies}/>
        }
      </div>
      <h1 className='text-4xl px-4 font-montserrat text-white mt-8 mb-4'>TOP RATED</h1>
      <div className='px-5 rounded-xl overflow-x-auto bg-lightgray'>
        {isLoading && <div>Loading...</div>}
        {errorOnRequest && <div>Error...</div>}
        {popularMovies?.length > 0 && 
          <MovieScroll movies={topRatedMovies}/>
        }
      </div>
    </div>
  );
}

export default Home;
