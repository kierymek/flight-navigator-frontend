import React, { useState } from "react";
import FlightSelect from "./FlightSelect";

function Flight(props) {
  const [passengers, setPassengers] = useState("1");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightOptions, setFlightOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(undefined);
  const [isOneWay, setIsOneWay] = useState(false);

  function submit(event, props) {
    event.preventDefault();
    setIsLoading(true);
    const returnDateParam = returnDate ? "&returnDate=" + returnDate : "";

    console.log("Flight -> submit: ", returnDateParam);

    fetch(
      "/api/flights/?origin=" +
        props.origin +
        "&destination=" +
        props.destination +
        "&departDate=" +
        departDate +
        "&adults=" +
        passengers +
        returnDateParam
    )
      .then((response) => response.json())
      .then((json) => {
        setFlightOptions(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error catched when fetching flights: ", err);
      });
  }

  return (
    <div>
      <div className="one-way-toggle">
        <input
          type="checkbox"
          id="temp"
          onChange={() => setIsOneWay(!isOneWay)}
          // checked={isOneWay}
        />
        <label htmlFor="temp">{isOneWay ? "One-way" : "Round trip"}</label>
      </div>
      <form onSubmit={(e) => submit(e, props)}>
        <label htmlFor="passengers">Passengers:</label>
        <input
          onChange={(e) => setPassengers(e.target.value)}
          type="number"
          name="passengers"
          min="1"
          max="5"
          defaultValue="1"
          required
        />
        <br></br>
        <label htmlFor="departure">Depart Date:</label>
        <input
          type="date"
          onChange={(e) => setDepartDate(e.target.value)}
          id="departure"
          name="departure"
          required
        />
        <br></br>
        {!isOneWay && (
          <>
            <label htmlFor="return">Return Date:</label>
            <input
              type="date"
              onChange={(e) => setReturnDate(e.target.value)}
              id="return"
              name="return"
            />
            <br></br>
          </>
        )}
        <input className="btn btn-danger" type="submit" />
      </form>
      <br />
      {isLoading && (
        <div className="row">
          <p>Wait for results to be loaded!</p>
          <div className="loader" />
        </div>
      )}
      {flightOptions.length ? (
        <FlightSelect
          flightOptions={flightOptions}
          setFlight={props.setFlight}
        />
      ) : (
        <> </>
      )}
    </div>
  );
}

export default Flight;
