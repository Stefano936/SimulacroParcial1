import React from "react";
import "./Tarjetas.css";

function Tarjetas({Nombre}){
    return (
        <>
        <div id = "Tarjeta">
            <h1 id = "Nombre">{Nombre}</h1>
            <button id = "Detalles" href = "">Detalles</button>
            <button id = "Borrar">Borrar</button>
        </div>
        </>
    )
}

export default Tarjetas