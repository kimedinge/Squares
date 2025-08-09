import React, { useEffect, useState } from 'react';
import SquareGrid from './components/SquareGrid.jsx';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/squares';

function randomColor(exclude) {
  let c;
  do {
    c = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  } while (c.toLowerCase() === (exclude||'').toLowerCase());
  return c;
}

export default function App() {
  const [squares, setSquares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API).then(r=>r.json()).then(data=>{
      setSquares(data || []);
    }).catch(err=> setError(err.message)).finally(()=> setLoading(false));
  }, []);

  /// addSquare uses the last squares color to make sure it does not render the same color directly after each other
  /// then calls the API and gets a square with id, index and color for that square, which is then set in state.
  async function addSquare() {
    try {
      const lastColor = (squares.length ? squares[squares.length-1].color : null);
      const color = randomColor(lastColor);
      const res = await fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ color }) });
      if (!res.ok) throw new Error('API error');
      const saved = await res.json();
      setSquares(prev=>[...prev, saved]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Wizardworks — Don't be a square</h1>
      <div>
        <button onClick={addSquare} style={{
          backgroundColor: "#0ba535",
          border: "none",
          borderRadius: "18px",
          height: "25px",
          width: "95px",
          color: "#c4fe92" }}>Lägg till ruta</button>
      </div>
      {error && <div style={{ color: red}}>Error: {error}</div>}
      {loading ? <div>Loading...</div> : <SquareGrid squares={squares} />}
    </div>
  )
}
