import React, {useEffect, useState} from 'react';
import { IMovieDetail } from '../types';
import { MovieCard } from '../../components/MovieCard';
import { getMovieInfo } from '../../services';

const Favorites = () => {
    const[loading, setLoading] = useState<boolean>(false);
    const[show, setShow] = useState<IMovieDetail[]>([]);
    const favorites:string = localStorage.getItem('favorites') || '';

    const runGetFavorites = async () => {
        if(favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) => {
                    return getMovieInfo(String(favorite))
                    .then((res) => {
                        if(res && res.data) {

                            return res.data;
                        }
                    })
                    .catch((err) => {
                        console.log(err, "err")
                    });
                })
            );
            setShow(newShows);
            setLoading(false);
        };
    };

    useEffect(() => {
        setLoading(true)
        runGetFavorites();
    }, [])

    return (
        <div>
            {!loading ? (
                <div>
                    <h2 className='text-4xl mt-4 mx-8 font-montserrat text-white'>MY FAVORITES</h2>
                    {favorites && favorites.length > 0 ? (
                        <div className='px-4 mx-5'>
                            <p className='mt-4 font-poppins text-white text-lg'>Look at all of your favorite movies!</p>
                            {show.length > 0 &&
                            show.map((show:IMovieDetail) => (
                                <MovieCard 
                                    key={show.id}
                                    movieId={show.id}
                                    title={show.title}
                                    genreId={show.genres[0].id}
                                    voteAverage={show.vote_average}
                                    posterPath={show.poster_path}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h2 className='text-4xl font-montserrat text-white'>
                                Oops.you don't have any favorites yet.
                            </h2>
                        </div>
                    )}
                </div>
            ): (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Favorites;