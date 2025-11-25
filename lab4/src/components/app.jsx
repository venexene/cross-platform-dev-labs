import { LaunchList } from "./launchList";
import { Map } from "./map";
import { useEffect, useState } from "react";
import { SpaceX } from "../api/spacex";

export function App() {
    const [launches, setLaunches] = useState([]);
    const [launchPads, setLaunchPads] = useState({
        type: "FeatureCollection",
        features: [] 
    });
    const [selectedLaunchpad, setSelectedLaunchpad] = useState(null);

    const spacex = new SpaceX();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [launchesData, launchpadsData] = await Promise.all([
                    spacex.launches(),
                    spacex.launchpads(true)
                ]);
                setLaunches(launchesData);
                setLaunchPads(launchpadsData);
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        };

        loadData();
    }, []);

    const handleLaunchHover = (launchpadId) => {
        setSelectedLaunchpad(launchpadId);
    };

    const handleLaunchLeave = () => {
        setSelectedLaunchpad(null);
    };

    return (
        <main className='main'>
            <LaunchList 
                launches={launches} 
                onLaunchHover={handleLaunchHover}
                onLaunchLeave={handleLaunchLeave}
            />
            <Map 
                launchPads={launchPads}
                selectedLaunchpad={selectedLaunchpad}
            />
        </main>
    );
}