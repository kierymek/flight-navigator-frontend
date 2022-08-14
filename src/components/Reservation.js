import moment from "moment";
import { Component } from "react";

export default class Reservation extends Component {
  render() {
    const reservation = this.props.reservation;
    console.log("Reservation -> render: ", this.props, reservation);
    return (
      <div className="reservation">
        {reservation.flights.map((flight, index) => (
          <div key={index}>
            <p>{index === 0 ? "outbound" : "return"} flight:</p>
            <label>Flight number: {flight.number}</label>
            <br />
            <label>Departure from: {flight.from}</label>
            <br />
            <label>Arrival to: {flight.to}</label>
            <br />
            <label>
              Departure date: {new Date(flight.departureDate).toTimeString()}
            </label>
            <br />
            <label>
              Arrival date: {new Date(flight.arrivalDate).toTimeString()}
            </label>
            <br />
            <label>
              Flight furation: {moment.duration(flight.duration).humanize()}
            </label>
            <br />
            <label>Aircraft code: {flight.aircraft}</label>
            <br />
            <label>Terminal: {flight.terminal}</label>
            <br />
          </div>
        ))}
        <label>Oneway: {reservation.oneWay.toString()}</label>
        <br />
        <label>Passport number: {reservation.passport}</label>
        <br />
        <label>Price: {reservation.price}</label>
        <br />
      </div>
    );
  }
}
