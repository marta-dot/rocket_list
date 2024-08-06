// rocket_list/src/RocketDetail.tsx
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

interface RocketDetailProps {
    rocketNames: string[];
    rocketIds: string[];
}

function RocketDetail({rocketNames, rocketIds}: RocketDetailProps) {
    const {id} = useParams<{ id: string }>(); // Get the rocket ID from the URL
    const index = rocketIds.indexOf(id!);

    const [description, setDescription] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [diameter, setDiameter] = useState<string>('');
    const [mass, setMass] = useState<string>('');
    const [successRate, setSuccessRate] = useState<string>('');
    const [costPerLaunch, setCostPerLaunch] = useState<string>('');
    const [firstFlight, setFirstFlight] = useState<string>('');

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
                setDescription(data.description)
                setCountry(data.country);
                setHeight(data.height.meters);
                setDiameter(data.diameter.meters);
                setMass(data.mass.kg);
                setSuccessRate(data.success_rate_pct);
                setCostPerLaunch(data.cost_per_launch);
                setFirstFlight(data.first_flight);

            } catch (error) {
                console.error('Failed to fetch rocket details:', error);
            }
        }

        fetchRocketParam();
    }, [id]);

    if (index === -1) {
        return <div>Rocket not found</div>;
    }

    return (
        <>
            <div>
                <h1>{rocketNames[index]}</h1>
                <p>{description}</p>
                <div className={"param_container"}>
                    <div className={"param"}><span>COUNTRY</span> <span>{country}</span></div>
                    <div className={"param"}><span>HEIGHT</span> <span>{height} meters</span></div>
                    <div className={"param"}><span>DIAMETER</span> <span>{diameter} meters</span></div>
                    <div className={"param"}><span>MASS</span> <span>{mass} kg</span></div>
                    <div className={"param"}><span>SUCCESS RATE</span> <span>{successRate}%</span></div>
                    <div className={"param"}><span>COST PER LAUNCH</span> <span>${costPerLaunch}</span></div>
                    <div className={"param"}><span>FIRST FLIGHT</span> <span>{firstFlight}</span>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}

export default RocketDetail;