import moment from "moment";
import React from "react";

function FlightSelect(props) {
  console.log("FlightSelect -> props.flightOptions: ", props.flightOptions);
  const options = props.flightOptions.map((flight, index) => (
    <div key={index} className="flight-options">
      <input type="radio" id={flight.id} name="select" value={index} /> {" "}
      <label htmlFor={flight.id}>
        {"Price: " + flight.price.grandTotal + " " + flight.price.currency}
      </label>
      <div className="flight-options-segment">
        <div>Available Seats: {flight.numberOfBookableSeats}</div>
        {flight.itineraries[0].segments.map((segment, index) => (
          <div key={index}>
            <div>
              Departure time: {new Date(segment.departure.at).toTimeString()}
            </div>
            <div>
              Arrival time: {new Date(segment.arrival.at).toTimeString()}
            </div>
            <div>
              Flight duration: {moment.duration(segment.duration).humanize()}
            </div>
          </div>
        ))}
      </div>
      <br></br>
    </div>
  ));

  return (
    <div>
      {props.flightOptions.length > 0 ? (
        <div>
          <p>Flight options:</p>
          <form
            onChange={(e) =>
              props.setFlight(props.flightOptions[e.target.value])
            }
          >
            {options}
          </form>
        </div>
      ) : (
        <p>No flights found, try another destination.</p>
      )}
    </div>
  );
}

export default FlightSelect;
