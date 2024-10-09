import React from "react";
import "./Home.css";
import Tarjetas from '../components/Tarjetas';

function Home(){
    return (
        <>
            <div>
                <h1 id = "Titulo">Paris Juegos</h1>
                <button id = "AgregarJuego">Agregar Juego</button>
            </div>
            <div id = "OrdenarTarjetas">
                <Tarjetas Nombre = "Carrera"/>
                <Tarjetas Nombre = "Salto Alto"/>
                <Tarjetas Nombre = "Natacion"/>
                <Tarjetas Nombre = "Basketball"/>
            </div>
        </> 
        )
    }

export default Home
