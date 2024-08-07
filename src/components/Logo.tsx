import { Link } from 'react-router-dom';
import '../style/App.css';
import logo from '../../public/spacex-logo.png';

const Logo = () => (
			<Link to="/">
				<img src={logo} alt="SpaceX Logo" className="logo"/>
			</Link>
);

export default Logo;