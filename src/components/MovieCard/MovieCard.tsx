import { IMAGE_SOURCE } from '../../constants/moviesMock'
import { IMovieCard } from './types'
import { Pill } from '../Pill';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../routes/constants';
import genres from '../../constants/genres.json';
import {ReactComponent as StarSVG} from '../../assets/star-svgrepo-com.svg' //Fix this export to be default without this

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {
  //HOOKS
    const navigate = useNavigate();
  //CONSTANTS
    const poster = IMAGE_SOURCE + posterPath;
  //STATES
    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find((key) => key.id === genreId)
        return key ? key.name : ''
    }

    const getColor = (vote: number): "red"|"green"|"yellow" => {
      if(vote<6) return "red";
      if(vote<8) return "yellow";
      return "green";
    };

    const navigateMovies = (id: number, movieName: string, posterPath: string, genre: string, voteAverage: number) => {
      navigate(`${ROUTES.SHOW}/${id}`, { state: { movie: movieName, poster: posterPath, genreName: genre, rating: voteAverage }});
    }
       
  return (
  <div className="flex bg-white auto float-left overflow-hidden block mr-5 my-4 relative shadow-lg rounded-lg p-0 flex-shrink-0 smooth-scroll w-64"
  onClick={() => {
    navigateMovies(movieId, title, poster, getGenre(genreId), voteAverage)
  }}
  >
    <div className='place-content-center items-center ml-0 min-w-full overflow-hidden bg-gray-800 float-none transition-opacity duration-5550 ease-in-out transform-gpu'>
      <img src={poster} className='max-h-96 transition-all duration-900 ease-in-out backface-hidden overflow-hidden min-w-full max-h-poster relative max-w-none ml-0 scale-100 hover:scale-125 hover:opacity-40' />
    </div>
    <div className='absolute bottom-0 left-0 w-full h-auto opacity-100 transition-all duration-300 bg-gradient-to-t from-[rgb(2,0,36)] via-transparent to-transparent rounded-b-none'>
      <div className='p-4 py-3.5 w-full align-middle text-white'>
        <Pill title={getGenre(genreId)} color={getColor(voteAverage)} />
        <p className='text-white block text-lg font-jakarta-medium leading-none mt-2.5 mb-2'>{title}</p>
        <div className='flex flex-row items-center space-x-1.5'>
          <StarSVG width="20px"height="20px"/>
          <p className='mr-2.5 text-white text-sm font-medium table uppercase leading-none'> {(voteAverage.toFixed(1))} / 10</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MovieCard
