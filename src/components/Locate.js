import React, { useState } from "react";
import TextInput from "./TextInput";
import LocationSelect from "./LocationSelect";

function Locate(props) {
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    fetch("/api/locations?keyword=" + value)
      .then((response) => response.json())
      .then((json) => {
        setLocations(json);
      })
      .catch((err) => {
        console.log("error catched when fetching airports for location: ", err);
      });
  };

  return (
    <div>
      <TextInput
        className="textInput"
        onSubmit={submit}
        display={props.display}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <br />
      <LocationSelect
        className="locationSelect"
        data={locations}
        handleChoice={props.handleChoice}
      />
    </div>
  );
}

export default Locate;
