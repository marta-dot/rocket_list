import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../style/App.css'
import RocketDescription from './RocketDescription.tsx';
import Logo from '../components/Logo.tsx';
import Rockets from '../components/Rockets.tsx';
import useSWR from 'swr';
import { RocketDetailProps } from "../utils/Props.ts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

function App() {

	const {data, error, isLoading} = useSWR(`https://api.spacexdata.com/v3/rockets`, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const rocketDetails = {
		rocketNames: data.map((rocket: any) => rocket.rocket_name),
		rocketIds: data.map((rocket: any) => rocket.rocket_id),
		description: data.map((rocket: any) => rocket.description),
	} as RocketDetailProps;

	return (
			<Router basename={"/rocket_list"}>
				<Logo/>
				<Routes>
					<Route path="/" element={
						<Rockets rocketNames={rocketDetails.rocketNames} rocketIds={rocketDetails.rocketIds}
										 description={rocketDetails.description}/>
					}/>
					<Route path="/rocket/:id" element={
						<RocketDescription rocketNames={rocketDetails.rocketNames} rocketIds={rocketDetails.rocketIds}
															 description={rocketDetails.description}/>
					}/>
				</Routes>
			</Router>
	)
}

export default App
