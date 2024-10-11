import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Tarjetas.css";

function Tarjetas({ id, Nombre, onUpdate = {} }) {
    const [nombre, setNombre] = useState(Nombre);
    const [descripcion, setDescripcion] = useState('');
    const [cantidadJugadores, setCantidadJugadores] = useState('');
    const [categoria, setCategoria] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/games/${id}`)
          .then(response => response.json())
          .then(data => {
            setNombre(data.title || Nombre);
            setDescripcion(data.description || '');
            setCantidadJugadores(data.players || '');
            setCategoria(data.categories || '');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [id]);

    function handleBorrar() {
        fetch(`http://localhost:3000/api/games/${id}`, {
            method: 'DELETE',
        })
        .then(() => onUpdate(id))
        .catch(error => console.error('Error deleting game:', error));
    }

    function handleDetalles() {
        navigate(`/game/${id}`);
    }

    function handleGuardar(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/api/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: nombre,
                description: descripcion,
                players: cantidadJugadores,
                categories: categoria 
            })
        })
        .then(response => response.json())
        .then(data => {
            setShowForm(false);
            onUpdate(id, data);
        })
        .catch(error => console.error('Error updating game:', error));
    }

    return (
        <div id="Tarjeta">
            <h1 id="Nombre">{nombre}</h1>
            <button id="Detalles" onClick={handleDetalles}>Detalles</button>
            <button id="Borrar" onClick={handleBorrar}>Borrar</button>

            {showForm && (
                <form onSubmit={handleGuardar}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div>
                        <label>Cantidad de Jugadores:</label>
                        <input type="number" value={cantidadJugadores} onChange={(e) => setCantidadJugadores(e.target.value)} />
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            )}
        </div>
    );
}

export default Tarjetas;