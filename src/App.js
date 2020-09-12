import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import ParkingLot from "./ParkingLot";

function App() {
  const [formData, setFormData] = useState({ region: "" });
  const [parkingLots, setParkingLots] = useState([]);

  const API_KEY =
    "mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx";

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      let result = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=parkinglots&location=${formData.region}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      let lotsArr = result.data.businesses;
      let lowLotsArr = lotsArr.filter((lot) => lot.rating && lot.rating <= 3.5);
      setParkingLots(lowLotsArr);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <h1>HareGarage</h1>
      <h3>Find the lowest-rated parking lots near you!</h3>
      <form onSubmit={handleSubmit}>
        <label>Enter a region to begin</label>
        <input
          name="region"
          value={formData.region}
          onChange={handleChange}
        ></input>
        <button>let's go!</button>
      </form>
      <ul>
      {parkingLots.length ? parkingLots.map((lot) => <ParkingLot lot={lot}/>) : null}
      </ul>
    </div>
  );
}

export default App;
