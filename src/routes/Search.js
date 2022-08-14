import { useState } from "react";
import Confirm from "../components/Confirm";
import Flight from "../components/Flight";
import Locate from "../components/Locate";
import Order from "../components/Order";
import Reservation from "../components/Reservation";

import "../css/search.scss";

function Search(props) {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [flight, setFlight] = useState();
  const [confirmation, setConfirmation] = useState();
  const [order, setOrder] = useState();

  console.log(
    "Search was called with params values: ",
    origin,
    destination,
    flight,
    confirmation,
    order
  );

  function resetPage() {
    setOrder(null);
    setDestination(null);
    setFlight(null);
    setConfirmation(null);
    setOrigin(null);
  }

  return (
    <div className="search">
      {order ? (
        <div>
          <br />
          <h2>Flight Booked! Here are the details:</h2>
          <Reservation reservation={order} />
          <br />
          <button className="btn btn-success" onClick={() => resetPage()}>
            Search for another flight
          </button>
        </div>
      ) : (
        <div>
          <h2>Search for flights</h2>
          <Locate handleChoice={setDestination} display={"Origin"} />
          <Locate handleChoice={setOrigin} display={"Destination"} />
          {origin && destination && (
            <Flight
              origin={origin}
              destination={destination}
              setFlight={setFlight}
            />
          )}
          {flight && (
            <Confirm flight={flight} setConfirmation={setConfirmation} />
          )}
          {confirmation && (
            <Order
              confirmation={confirmation}
              order={order}
              setOrder={setOrder}
              user={props.user}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
