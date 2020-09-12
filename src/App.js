import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import ParkingLot from "./ParkingLot";
import { Button, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [formData, setFormData] = useState({ region: "" });
  const [parkingLots, setParkingLots] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY =
    "mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx";

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setParkingLots([]);
    setIsLoading(true);
    try {
      let result = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=parkinglots&location=${formData.region}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      let lotsArr = result.data.businesses;
      let lowLotsArr = lotsArr.filter((lot) => lot.rating && lot.rating <= 3.5);
      setParkingLots(lowLotsArr);
    } catch (err) {
      setError("Please try searching a different region");
    }
    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1 className="title">HareGarage</h1>
      <h3>Find the lowest-rated parking lots near you!</h3>
      <form onSubmit={handleSubmit}>
        <label className="input-label">Enter a region to begin</label>
        <input
          name="region"
          value={formData.region}
          onChange={handleChange}
        ></input>
        <Button className="search-button" size="sm" color="info">
          Let's go!
        </Button>
        {error.length ? <div className="error">{error}</div> : null}
      </form>
      <Container className="lots-container">
        {isLoading ? <FontAwesomeIcon className="loading fa-spin" icon={faSpinner} /> : null}
        <Row>
          {parkingLots.length
            ? parkingLots.map((lot) => (
                <Col sm="4">
                  <ParkingLot lot={lot} key={lot.id} />
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </div>
  );
}

export default App;
