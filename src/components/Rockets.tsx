import { Link } from "react-router-dom";
import { RocketDetailProps } from "../utils/types.ts";


function Rockets({rockets}: RocketDetailProps) {

	return (
		<>
			<h1>SpaceX rockets</h1>
			<div>
				{rockets.map((rocket, index) => (
					<div key={index}>
						<h2>
							<Link to={`/rocket/${rocket.rocket_id}`}>{rocket.rocket_name}</Link>
						</h2>
						{rocket.description}
					</div>
				))}
			</div>
		</>
	);
}

export default Rockets;