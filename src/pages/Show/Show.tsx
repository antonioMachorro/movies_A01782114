import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Pill } from '../../components/Pill';
import { IMovieResponse } from '../types';
import { getMovieInfo, getRecommended } from '../../services';
import { MovieScroll } from '../../components/MovieScroll';

const Show: React.FC = () => {
    const { id } = useParams(); //Usa los parametros de la ROUTE
    const location = useLocation(); //Obtiene el estado
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IMovieResponse>();
    const [recommendedMovies, setRecommendedMovies] = useState<IMovieResponse[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>('');

    const getMovieData = async () => {
        console.log(id)
        await getMovieInfo(String(id)).then((data) => {
            if(data && data.data)
                setMovie(data.data)
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const getRecommendedMovies = async () => {
        await getRecommended(String(id)).then((data) => {
            if(data && data.data)
                setRecommendedMovies(data.data.results);
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : []; // Buscamos añadir la nueva id a un array
        const newFavorites = [...favs, id]
        setFavorites(JSON.stringify(newFavorites))
        setIsFavorite(true)
        localStorage.setItem('favorites', JSON.stringify(newFavorites)) //(nombre del storage, el valor a guardar)
    };

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs]
        newFavorites = newFavorites.filter((e) => e != id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false)
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const goBack = () => {
        navigate(-1);
    }

    const getColor = (vote: number): "red"|"green"|"yellow" => {
        if(vote<6) return "red";
        if(vote<8) return "yellow";
        return "green";
    };

    const getLanguage = (lang: string)  =>  {
        switch(lang) {
            case "en":
                return "English";
                break;
            case "es":
                return "Spanish";
                break;
            case "fr":
                return "French";
                break;
            case "de":
                return "German";
                break;
            case "it":
                return "Italian";
                break;
            case "ja":
                return "Japanese";
                break;
            default:
                return {lang};
                break;
        }
    }

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || '';
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        getMovieData();
        getRecommendedMovies();
        console.log(movie?.original_language)
    }, []);

    return(
        <div>
            <button className='bg-red-500 rounded-xl px-4 py-1 text-white mb-4' onClick={goBack}>Back</button>
            <div className='bg-gray-300 px-4 py-2 rounded-lg'>
                <div className='m-4'>
                    <strong className='text-4xl font-poppins'>{location.state.movie}</strong>
                </div>
                <div className='flex flex-row my-8'>
                    <img className='h-96 mx-4 rounded-xl' src={location.state.poster}></img>
                    <div className='flex flex-col mx-20'>
                        <div className=''>
                            <Pill title={`Rating: ${(movie?.vote_average)?.toFixed(1)}`} color={getColor(location.state.rating)} />
                        </div>
                        <strong className= 'text-xl mb-4'>Movie Info:</strong>
                        <div className='font-poppins text-lg'>{movie?.overview}</div>
                        <div className='flex flex-row items-center my-12 space-x-4'>
                            <Pill title={location.state.genreName} color='green' />
                            <Pill title={movie ? String(getLanguage(movie.original_language)) : "" } color='red' />
                        </div>
                        <div className='flex flex-row items-center'>
                        <svg width="28px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#1C274C" stroke-width="1.5"></path> </g></svg>
                            {isFavorite ? (
                                <div className='flex ml-2'>
                                    <button onClick={removeFavorite} className=' bg-red-500 px-4 py-2 flex-initial w-48 rounded-xl text-white'>Remove from favorites</button>
                                </div>
                            ) : (
                                <div className='flex ml-2'>
                                    <button onClick={addFavorite} className='bg-blue-500 px-4 py-2 flex-initial w-48 rounded-xl text-white'>Add Favorite</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mx-4'>
                    <strong className= 'text-xl'> Recommended movies:</strong>
                    <div className='my-2'>
                        <MovieScroll movies={recommendedMovies}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;
