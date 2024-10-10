import React from "react";
import "./Tarjetas.css";

function Tarjetas({ id, Nombre, onUpdate = {} }) {
    function handleBorrar() {
        // request a el borrar endpoint.
        //  para q se borre en tiempo real en la pagina, tenes q actualizar el array
        // onUpdate(id);
        onUpdate(id)
    }

    return (
        <>
            <div id="Tarjeta">
                <h1 id="Nombre">{Nombre}</h1>
                <button id="Detalles"><a href={`detalles/${id}`} style={{textDecoration: "none", color: "black"}}>Detalles</a></button>      
                <button id="Borrar" onClick={handleBorrar}>Borrar</button>
            </div>
        </>
    );
}

export default Tarjetas;