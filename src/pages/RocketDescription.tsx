// rocket_list/src/RocketDetail.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Rocket, RocketDetailProps } from '../utils/Props.ts';

function RocketDetail({rocketNames, rocketIds}: RocketDetailProps) {
	const {id} = useParams<{ id: string }>(); // Get the rocket ID from the URL
	const index = rocketIds.indexOf(id!);

	const [rocket, setRocket] = useState<Rocket | null>(null);

	useEffect(() => {
		if (id === undefined) {
			console.error('Rocket ID not found');
			return;
		}

		async function fetchRocketParam() {
			try {
				const response = await fetch(`https://api.spacexdata.com/v3/rockets/${id}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setRocket(data);
			} catch (error) {
				console.error('Failed to fetch rocket details:', error);
			}
		}

		fetchRocketParam();
	}, [id]);

	if (index === -1) {
		return <div>Rocket not found</div>;
	}

	if (!rocket) {
		return <div>Loading...</div>;
	}

	const parameters = [
		{label: "COUNTRY", value: rocket.country},
		{label: "HEIGHT", value: `${rocket.height.meters} meters`},
		{label: "DIAMETER", value: `${rocket.diameter.meters} meters`},
		{label: "MASS", value: `${rocket.mass.kg} kg`},
		{label: "SUCCESS RATE", value: `${rocket.success_rate_pct}%`},
		{label: "COST PER LAUNCH", value: `$${rocket.cost_per_launch}`},
		{label: "FIRST FLIGHT", value: rocket.first_flight}
	];

	return (
			<>
				<div>
					<h1>{rocketNames[index]}</h1>
					<p>{rocket.description}</p>
					<div className="param_container">
						{parameters.map(param => (
								<div className="param" key={param.label}>
									<span>{param.label}</span> <span>{param.value}</span>
								</div>
						))}
					</div>
				</div>
			</>
	);

}

export default RocketDetail;