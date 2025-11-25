export function LaunchList({ launches, onLaunchHover, onLaunchLeave }) {
    return (
        <aside className="aside">
            <h3>Launches</h3>
            <div className="list-container">
                <ul>
                    {launches.map(launch => (
                        <li 
                            key={launch.id}
                            onMouseEnter={() => onLaunchHover(launch.launchpad)}
                            onMouseLeave={onLaunchLeave}
                        >
                            {launch.name}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}