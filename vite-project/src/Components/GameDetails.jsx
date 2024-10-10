import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const { id } = useParams();
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
            <h1>{game.title}</h1>
            <p>{game.description}</p>
            <p>Players: {game.players}</p>
            <p>Category: {game.category}</p>
        </div>
    );
}

export default GameDetails;