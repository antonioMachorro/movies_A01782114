import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import '../../assets/styles/styles.css'

const Header = () => {
  return (
    <nav className="bg-gray-800 px-4 py-2 flex items-center">
      <img
  src={require(`../../assets/film-movie-reel-icon.png`)}
  alt=''
  className='w-24 py-2'
  style={{ filter: 'invert(100%)' }}
/>

      <ul className="flex ml-auto">
        <li className="mr-8">
          <Link to={ROUTES.HOME} className="text-white text-lg font-poppins">
            Home
          </Link>
        </li>
        <li className='mr-8'>
          <Link to={ROUTES.POPULAR} className="text-white text-lg font-poppins">
            Popular
          </Link>
        </li>
        <li className='mr-8'>
          <Link to={ROUTES.NOW_PLAYING} className='text-white text-lg font-poppins'>
            Now Playing
          </Link>
        </li>
        <li className='mr-8'>
          <Link to={ROUTES.TOP_RATED} className='text-white text-lg font-poppins'>
            Top Rated
          </Link>
        </li>
        <li className=''>
          <Link to={ROUTES.FAVORITES} className='text-white text-lg font-poppins'>
            My Favorites
          </Link>
        </li>
      </ul>
    </nav>
    
  );
};

export default Header;
