import React, { useEffect, useState } from "react";
import Reservation from "./Reservation";

function Order(props) {
  const [traveler, setTraveler] = useState("");
  const [fname, setFname] = useState("Harryette");
  const [lname, setLname] = useState("Mullen");
  const [dob, setDob] = useState("1990-01-01");
  const [order, setOrder] = useState("");

  function makeTraveler(event) {
    event.preventDefault();
    fetch("api/traveler/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          fname: fname,
          lname: lname,
          dob: dob,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("make traveler request: ", json);
        setTraveler(json);
      })
      .catch((err) => {
        console.log("error catched when creating traveler: ", err);
      });
  }

  console.log("Order -> rerender: ", traveler);

  function submit(event, props) {
    console.log("Order -> submit: ", {
      type: "flight-order",
      flightOffers: props.confirmation.flightOffers,
      travelers: [traveler],
    });
    event.preventDefault();
    fetch("api/order/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: props.confirmation.flightOffers,
          travelers: [traveler],
          user: props.user,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("order request: ", json);
        setOrder(json);
        props.setOrder(json);
      })
      .catch((err) => {
        console.log("error catched when posting an order: ", err);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => makeTraveler(e)}>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          onChange={(e) => setDob(e.target.value)}
          id="dob"
          name="dob"
          required
        />
        <br></br>
        <label>First Name: </label>
        <input
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        ></input>
        <br></br>
        <label>Last Name: </label>
        <input
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        ></input>
        <br></br>
        <input
          className="btn btn-danger"
          type="submit"
          value="Submit Traveler Info"
        />
      </form>
      <br />
      {traveler && (
        <form onSubmit={(e) => submit(e, props)}>
          <input className="btn btn-danger" type="submit" value="Book Flight" />
        </form>
      )}
    </div>
  );
}

export default Order;
