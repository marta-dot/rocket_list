import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import Logo from '../components/Logo.tsx';
import fetcher from '../utils/fetcher.ts';
import Rockets from '../components/Rockets.tsx';
import RocketDescription from './RocketDescription.tsx';
import '../style/app.css';


function App() {

	const {data, error, isLoading} = useSWR(`https://api.spacexdata.com/v3/rockets`, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<Router basename="/rocket_list">
			<Logo/>
			<Routes>
				<Route path="/" element={<Rockets rockets={data}/>}/>
				<Route path="/rocket/:id" element={<RocketDescription rockets={data}/>}/>
			</Routes>
		</Router>
	);
}

export default App;
