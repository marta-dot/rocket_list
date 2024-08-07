import { Link } from "react-router-dom";
import { RocketDetailProps } from "../utils/Props.ts";

function Rockets({rocketNames, rocketIds, description}: RocketDetailProps) {

	return (
			<>
				<h1>SpaceX rockets</h1>
				<div>
					{rocketNames.map((name, index) => (
							<div key={index}>
								<h2><Link to={`/rocket/${rocketIds[index]}`}>{name}</Link></h2>
								{description[index]}
							</div>
					))}
				</div>
			</>
	)
}

export default Rockets;