import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Pill } from '../../components/Pill';
import { IMovieResponse } from '../types';
import { getMovieInfo } from '../../services';

const Show: React.FC = () => {
    const { id } = useParams(); //Usa los parametros de la ROUTE
    const location = useLocation(); //Obtiene el estado
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IMovieResponse>();
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

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || '';
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        getMovieData();
        console.log(movie?.original_language)
    }, []);

    return(
        <div>
            <button className='bg-red-500 rounded-xl px-4 py-2 text-white' onClick={goBack}>Back</button>
            <div className='my-4'>
                <strong className='text-3xl'>{location.state.movie}</strong>
            </div>
            <div className='flex flex-row my-8'>
                <img className='h-96 mx-4 rounded-xl' src={location.state.poster}></img>
                <div className='flex flex-col mx-20'>
                    <strong className= 'text-xl mb-8'>Movie Info:</strong>
                    <div>AQUI VA LA DESCRIPCION</div>
                    <div className='flex flex-row items-center my-20 space-x-4'>
                        <Pill title={location.state.genreName} color='green' />
                        <Pill title={`Rating: ${(movie?.vote_average)?.toFixed(1)}`} color={getColor(location.state.rating)} />
                        <Pill title={movie ? movie.original_language : "" } color='green' />
                    </div>
                </div>
            </div>
            {isFavorite ? (
                <div className='bg-red-500'>
                    <button onClick={removeFavorite}>Remove from favorites</button>
                </div>
            ) : (
                <div className='bg-blue-500'>
                    <button onClick={addFavorite}>Add Favorite</button>
                </div>
            )}
        </div>
    );
}

export default Show;
