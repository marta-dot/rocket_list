import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import RocketDescription from './RocketDescription';
import Logo from './Logo';


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
                console.log(id);
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

            <Router>
                <Logo/>
                <Routes>

                    <Route path="/" element={
                        <>

                            <h1>SpaceX rockets</h1>
                            <div>
                                {rocketNames.map((name, index) => (
                                    <div key={index}>
                                        <h2><Link to={`/rocket/${rocketId[index]}`}>{name}</Link></h2>
                                        {description[index]}
                                    </div>
                                ))}
                            </div>
                        </>
                    }/>
                    <Route path="/rocket/:id" element={
                        <RocketDescription rocketNames={rocketNames} rocketIds={rocketId}/>
                    }/>
                </Routes>
            </Router>
    )
}

export default App
