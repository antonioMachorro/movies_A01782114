import {Header} from '../components/Header';
import {Outlet} from 'react-router-dom';

const PrivateRouter = () => {
    return (
        <div className='bg-gray-500'>
            <Header />
            <div className="m-6">
            <Outlet />
            </div>
        </div>
    )
}

export default PrivateRouter;