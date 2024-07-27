import React, { useEffect, useState} from "react";
import './App.css';

function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=6')
            .then(response => response.json())
            .then(data => {
                const fetches = data.results.map(result =>
                    fetch(result.url).then(res => res.json())
                );
                Promise.all(fetches).then(results => setPokemons(results));
            });
    }, []);



  return (
    <div className="App">
        <h1>Pokemon Cards</h1>
        <div className="card-container">
            {pokemons.map(pokemon => (
                <div key={pokemon.id} className="card">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className="cardName">
                        <h2>{pokemon.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default App;
