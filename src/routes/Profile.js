import { useEffect } from "react";
import { useState } from "react";
import Reservation from "../components/Reservation";
import "../css/profile.scss";

function Profile(props) {
  const [reservations, setReservations] = useState([]);
  console.log("Profile -> user: ", props);

  useEffect(() => {
    fetch("/api/reservations?email=" + props.user.email)
      .then((response) => response.json())
      .then((json) => {
        console.log("Profile -> fetch reservations: ", json);
        setReservations(json);
      })
      .catch((err) => {
        console.log("error catched when fetching reservations: ", err);
      });
  }, []);

  function cancelReservation(id) {
    fetch("api/cancel/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Oops something went wrong!");
        }
      })
      .then(() => {
        console.log("Cancelation succeeded!");
        alert("Cancelation succeeded!");
      })
      .catch((err) => {
        console.log("error catched when canceling: ", err);
      });
  }

  return (
    <div className="profile">
      <h2>
        Welcome {props.user.fname} {props.user.lname}
      </h2>
      <h3>Your profile</h3>
      <p>email: {props.user.email}</p>
      <br />
      <h3>Your reservations</h3>
      {reservations.length ? (
        reservations.map((reservation, index) => (
          <div className="reservation-container" key={index}>
            <h4>Reservation {index + 1}</h4>
            <Reservation reservation={reservation} />
            <button
              className="btn btn-primary"
              onClick={() => cancelReservation(reservation.id)}
            >
              Cancel reservaion
            </button>
          </div>
        ))
      ) : (
        <p>You don't have any reservations yet.</p>
      )}
    </div>
  );
}

export default Profile;
