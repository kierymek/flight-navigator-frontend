function Confirm(props) {
  function submit(event, props) {
    event.preventDefault();
    fetch("api/confirm/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.flight),
    })
      .then((response) => response.json())
      .then((json) => {
        props.setConfirmation(json);
      })
      .catch((err) => {
        console.log("error catched when posting confirmation: ", err);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e, props)}>
        <input className="btn btn-danger" type="submit" />
      </form>
      <br />
      {props.order && (
        <div>
          Confirmation:<br></br>
          {props.order}
        </div>
      )}
    </div>
  );
}

export default Confirm;
