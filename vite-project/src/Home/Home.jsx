import React, { useEffect, useState } from "react";
import "./Home.css";
import Tarjetas from '../components/Tarjetas';

function Home(){
    const [juegos, setJuegos] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:3000/api/games')
            .then(response => response.json())
            .then(data => setJuegos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function handleUpdateTarjeta(id) {
        setJuegos(juegos.filter(juego => juego.id !== id));
    }

    function handlerAgregarJuego() {
        fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'CryptoGame',
                description: 'Es un juego de invertir en criptomonedas',
                image: 'https://via.placeholder.com/300',
                rating: 5
            })
        })
        .then(response => response.json())
        .then(data => setJuegos([...juegos, data]))
        .catch(error => console.error('Error adding game:', error));
    }

    return (
        <>
            <div>
                <h1 id = "Titulo">Paris Juegos</h1>
                <button id = "AgregarJuego" onClick={handlerAgregarJuego}>Agregar Juego</button>
            </div>
            <div id = "OrdenarTarjetas">
                {juegos.map(juego => (
                    <Tarjetas key = {juego.id} id = {juego.id} Nombre = {juego.title} onUpdate={handleUpdateTarjeta}/>
                ))}
            </div>
        </> 
        )
    }

export default Home
