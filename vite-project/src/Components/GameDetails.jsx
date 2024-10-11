import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const {id} = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/games/${id}`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(error => console.error('Error fetching game details:', error));
    }, [id]);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => window.history.back()}>Back</button>
            <h2>Title:{game[0].title}</h2>
            <p>Description:{game[0].description}</p>
            <p>Players: {game[0].players}</p>
            <p>Categories: {game[0].categories}</p>
        </div>
    );
}

export default GameDetails;