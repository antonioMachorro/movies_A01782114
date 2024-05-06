import {Header} from '../components/Header';
import {Outlet} from 'react-router-dom';

const PrivateRouter = () => {
    return (
        <>
        <div className='fixed w-full top-0 z-30 opacity-90'>
            <Header />
        </div>
            <div className="mx-6 mb-6 mt-32">
            <Outlet />
            </div>
        </>
    )
}

export default PrivateRouter;