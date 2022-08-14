import React from "react";

const TextInput = (props) => (
  <form className="textInput" onSubmit={props.onSubmit}>
    <label className="label">{props.display}: </label>
    <input
      className="input"
      type="text"
      onChange={props.onChange}
      placeholder={`Enter your ${props.display}`}
      required
    />
    <button className="btn btn-danger" type="submit">
      Submit
    </button>
  </form>
);

export default TextInput;
