import { Link } from 'react-router-dom';
import Navigation from './navigation';

const MainLeaute = ({ children }) => {
    return (
        <>
            <header className="bg-gray-800 p-2 ">

                <span className='text-white flex gap-4 justify-end items-center container mx-auto px-[100px]'>
                    <Link to={'/login'}>Sign in/Guest</Link>
                    <Link to={'/register'}>Create Account</Link>
                </span>
            </header>

            <Navigation />

            {children}
        </>

    );
};

export default MainLeaute;