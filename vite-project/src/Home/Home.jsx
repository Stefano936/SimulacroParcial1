import React, { useEffect, useState } from "react";
import "./Home.css";
import Tarjetas from '../components/Tarjetas';

function Home(){
    const [juegos, setJuegos] = useState([]); 
    const [showForm, setShowForm] = useState(false);
    const [searchLetter, setSearchLetter] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/games')
            .then(response => response.json())
            .then(data => {
                setJuegos(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function handleUpdateTarjeta(id, updatedGame) {
        if (updatedGame) {
            setJuegos(juegos.map(juego => (juego.id === id ? updatedGame : juego)));
        } else {
            setJuegos(juegos.filter(juego => juego.id !== id));
        }
    }

    function handleAgregarJuego(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: e.target.title.value,
                description: e.target.description.value,
                players: e.target.players.value,
                categories: e.target.categories.value
            })
        })
        .then(response => response.json())
        .then(data => {
            setJuegos([...juegos, {id: data[data.length - 1].id, title: e.target.title.value, description: e.target.description.value, players: e.target.players.value, categories: e.target.categories.value}]);
            setShowForm(false);
        })
        .catch(error => console.error('Error adding game:', error));
    }

    const filteredJuegos = juegos.filter(juego => juego.title.toLowerCase().startsWith(searchLetter.toLowerCase()));

    return (
        <>
            <div>
                <h1 id="Titulo">Paris Juegos</h1>
                <button id="AgregarJuego" onClick={() => setShowForm(true)}>Agregar Juego</button>
                <input className= "search"
                    type="text" 
                    placeholder="Buscar por letra" 
                    value={searchLetter} 
                    onChange={(e) => setSearchLetter(e.target.value)} 
                />
            </div>
            {showForm && (
                <form onSubmit={handleAgregarJuego}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="title" required />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" name="description" required />
                    </div>
                    <div>
                        <label>Cantidad de Jugadores:</label>
                        <input type="number" name="players" required />
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <input type="text" name="categories" required />
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            )}
            <div id="OrdenarTarjetas">
                {filteredJuegos.map(juego => (
                    <Tarjetas key={juego.id} id={juego.id} Nombre={juego.title} onUpdate={handleUpdateTarjeta} />
                ))}
            </div>
        </> 
    );
}

export default Home;