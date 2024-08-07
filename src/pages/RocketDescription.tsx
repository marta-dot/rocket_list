import { useParams } from 'react-router-dom';
import { Rocket, RocketDetailProps } from '../utils/Props.ts';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function RocketDetail({rocketNames, rocketIds, description}: RocketDetailProps) {
	const {id} = useParams<{ id: string }>(); // Get the rocket ID from the URL
	const index = rocketIds.indexOf(id!);

	const {data, error, isLoading} = useSWR(`https://api.spacexdata.com/v3/rockets/${id}`, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const rocket = data as Rocket;

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
					<p>{description[index]}</p>
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