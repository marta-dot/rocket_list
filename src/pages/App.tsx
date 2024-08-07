import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../style/App.css'
import RocketDescription from './RocketDescription.tsx';
import Logo from '../components/Logo.tsx';
import Rockets from '../components/Rockets.tsx';


function App() {
	const [rocketNames, setRocketNames] = useState<string[]>([]);
	const [rocketId, setRocketId] = useState<string[]>([]);
	const [description, setDescription] = useState<string[]>([]);


	useEffect(() => {
		async function fetchRocketNames() {
			try {
				const response = await fetch('https://api.spacexdata.com/v3/rockets');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				const names = data.map((rocket: { rocket_name: string }) => rocket.rocket_name);
				const id = data.map((rocket: { rocket_id: string }) => rocket.rocket_id);
				const description = data.map((rocket: { description: string }) => rocket.description);

				setRocketNames(names);
				setDescription(description);
				setRocketId(id);
			} catch (error) {
				console.error('Failed to fetch rocket names:', error);
			}
		}

		fetchRocketNames();
	}, []);

	return (
			<Router basename={"/rocket_list"}>
				<Logo/>
				<Routes>
					<Route path="/" element={
						<Rockets rocketNames={rocketNames} rocketIds={rocketId} description={description} />
					}/>
					<Route path="/rocket/:id" element={
						<RocketDescription rocketNames={rocketNames} rocketIds={rocketId} description={description}/>
					}/>
				</Routes>
			</Router>
	)
}

export default App
