export interface RocketDetailProps {
	rockets: Rocket[];
}

export interface Rocket {
	rocket_id: string;
	rocket_name: string;
	description: string;
	country: string;
	height: { meters: number };
	diameter: { meters: number };
	mass: { kg: number };
	success_rate_pct: number;
	cost_per_launch: number;
	first_flight: string;
}