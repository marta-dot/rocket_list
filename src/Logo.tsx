import { Link } from 'react-router-dom';
import './App.css';

const Logo = () => {
    return (
        <Link to="/">
            <img src="/spacex-logo.png" alt="SpaceX Logo" className="logo" />
        </Link>
    );
};

export default Logo;