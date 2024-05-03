import {RouteObject, createBrowserRouter} from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import { ROUTES } from './constants';
import { Home, NowPlaying, Popular, Show, TopRated} from '../pages';
import PublicRouter from './PublicRouter';
import Favorites from '../pages/Favorites/Favorites';

const routes: RouteObject[] = [
    {
        path: ROUTES.HOME, element: <PrivateRouter />,
        children: [
            { path: ROUTES.HOME, element: <Home />},
            { path: ROUTES.POPULAR, element: <Popular />},
            { path: `${ROUTES.SHOW}/:id`, element: <Show />}, // /show/:id
            { path: ROUTES.NOW_PLAYING, element: <NowPlaying />},
            { path: ROUTES.TOP_RATED, element: <TopRated />},
            { path: ROUTES.FAVORITES, element: <Favorites />},
        ]
    },
    {
        path: '/admin', element: <PublicRouter />,
        children: [
            { path: '/admin', element: <PublicRouter />},
        ]
    },
]

export const router = createBrowserRouter(routes);