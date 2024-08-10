import { useParams } from 'react-router-dom';
import { RocketDetailProps } from '../utils/types.ts';


function RocketDetail({rockets}: RocketDetailProps) {
	const {id} = useParams<{ id: string }>(); // Get the rocket ID from the URL
	const rocket = rockets.find(rocket => rocket.rocket_id === id); // Find the rocket in the list

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
				<h1>{rocket.rocket_name}</h1>
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