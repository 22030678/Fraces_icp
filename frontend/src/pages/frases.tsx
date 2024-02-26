import React, { useState, useEffect } from 'react';
import { AuthButton, useRestActor } from "@bundly/ic-react";
import "./page.css"

function FrasesApp() {
    const backend = useRestActor("backend");
    const [frases, setFrases] = useState<string[]>([]); // Explicitly type frases as an array of strings
    const [frase, setFrase] = useState('')
    const [categoria, setCategoria] = useState('amor'); // Categoría predeterminada

async function obtenerFrases() {
    try {
        const response = await backend.get(`/json`);
        const data = response.data as { [key: string]: string[] }; // Add this line
        if (data && Array.isArray(data[categoria])) {
            setFrases(data[categoria]);
        } else {
            console.error('Error: data[categoria] no es un array:', data);
        }
    } catch (error) {
        console.error('Error al obtener frases:', error);
    }
}

function obtenerFrase(frases: string[]){
    const randomIndex = Math.floor(Math.random() * frases.length);

    console.log(frases[randomIndex])
    return frases[randomIndex];
    
}

    useEffect(() => {
        obtenerFrases();
    }, [categoria]); // Actualizar las frases cuando la categoría cambia

    useEffect(() => {
        setFrase(obtenerFrase(frases));
    }, [frases]); 

    return (
        <div>
            <h1>Frases App</h1>
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="amor">Amor</option>
                <option value="motivacional">Motivacional</option>
                <option value="amistad">Amistad</option>
                <option value="tristeza">Tristeza</option>
                <option value="feliz_cumpleaños">Feliz Cumpleaños</option>
            </select>
            <button onClick={obtenerFrases}>Obtener Frases</button>
            <ul>
                {frase}
            </ul>
        </div>
    );
}

export default FrasesApp;