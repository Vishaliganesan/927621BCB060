import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this line is added to import the CSS

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState('p'); // Default to prime numbers
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setNumbers(response.data.numbers);
      setAverage(response.data.avg);
    } catch (err) {
      setError('Error fetching numbers');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setNumberType(event.target.value);
  };

  return (
    <div className="Average-Calculator">
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={handleChange}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={fetchNumbers} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Numbers'}
      </button>
      {error && <p>{error}</p>}
      {numbers.length > 0 && (
        <div>
          <h2>Numbers:</h2>
          <ul>
            {numbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
          <div className="average-box">
            Average: {average}
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
