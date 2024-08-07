export interface RocketDetailProps {
 rocketNames: string[];
 rocketIds: string[];
}

export interface Rocket {
 description: string;
 country: string;
 height: { meters: number };
 diameter: { meters: number };
 mass: { kg: number };
 success_rate_pct: number;
 cost_per_launch: number;
 first_flight: string;
}