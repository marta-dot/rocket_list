import { Link } from 'react-router-dom';
import logo from '../../public/spacex-logo.png';
import '../style/app.css';


const Logo = () => (
	<Link to="/">
		<img src={logo} alt="SpaceX Logo" className="logo"/>
	</Link>
);

export default Logo;