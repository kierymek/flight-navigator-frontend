import "../css/login.scss";

import React from "react";
import { setCookie } from "../cookies/CookieHandler";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
    };
  }

  toggleMode() {
    var newMode = this.state.mode === "login" ? "signup" : "login";
    this.props.logger(newMode);
    this.setState({ mode: newMode });
  }

  onSubmit(user) {
    setCookie("username", user.email, 30);
    this.props.setUser(user);
    this.props.logger("login");
    this.props.navigate("/search");
    console.log("LoginComponent -> onSubmit -> navigate");
  }

  render() {
    return (
      <div className="loginComponent">
        <section className={`form-block form-block--is-${this.state.mode}`}>
          <header className="form-block__header">
            <h1>{this.state.mode === "login" ? "Welcome back!" : "Sign up"}</h1>
            <div className="form-block__toggle-block">
              <span>
                {this.state.mode === "login" ? "Don't" : "Already"} have an
                account? Click here &#8594;
              </span>
              <input
                id="form-toggler"
                type="checkbox"
                onClick={this.toggleMode.bind(this)}
              />
              <label htmlFor="form-toggler"></label>
            </div>
          </header>
          <LoginForm
            mode={this.state.mode}
            onSubmit={(val) => this.onSubmit(val)}
          />
        </section>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      fullName: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("onsubmit login: ", this.state, this.props.mode);

    switch (this.props.mode) {
      case "signup":
        if (this.state.password !== this.state.repeatPassword) {
          alert("Passwords must be the same!");
          return;
        }

        fetch("api/register/", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              fullName: this.state.fullName,
              email: this.state.email,
              password: this.state.password,
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
          .then((json) => {
            console.log("register onsubmit! : ", json);
            json ? this.props.onSubmit(json) : alert("User already exists!");
          })
          .catch((err) => {
            console.log("error catched in registering: ", err);
            alert("User already exists!");
          });
        break;
      case "login":
        fetch("api/login/", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: this.state.email,
              password: this.state.password,
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
          .then((json) => {
            console.log("loggin onsubmit! : ", json);
            json ? this.props.onSubmit(json) : alert("Invalid credentials!");
          })
          .catch((err) => {
            console.log("error catched in loggin: ", err);
            alert("Invalid credentials!");
          });
        break;
      default:
        break;
    }
  }

  makeTraveler(event) {
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
        setTraveler(json);
      });
  }

  // console.log("Order -> makeTraveler: ", traveler)

  submit(event, props) {
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
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setOrder(json);
        props.setOrder(json);
      });
  }

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div className="form-block__input-wrapper">
          <div className="form-group form-group--login">
            <Input
              type="email"
              id="username"
              label="email"
              disabled={this.props.mode === "signup"}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Input
              type="password"
              id="password"
              label="password"
              disabled={this.props.mode === "signup"}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group form-group--signup">
            <Input
              type="text"
              id="fullname"
              label="full name"
              disabled={this.props.mode === "login"}
              onChange={(e) => this.setState({ fullName: e.target.value })}
            />
            <Input
              type="email"
              id="email"
              label="email"
              disabled={this.props.mode === "login"}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Input
              type="password"
              id="createpassword"
              label="password"
              disabled={this.props.mode === "login"}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Input
              type="password"
              id="repeatpassword"
              label="repeat password"
              disabled={this.props.mode === "login"}
              onChange={(e) =>
                this.setState({ repeatPassword: e.target.value })
              }
            />
          </div>
        </div>
        <button className="button button--primary full-width" type="submit">
          {this.props.mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    );
  }
}

const Input = ({ id, type, label, disabled, onChange }) => (
  <input
    className="form-group__input"
    type={type}
    id={id}
    placeholder={label}
    disabled={disabled}
    onChange={onChange}
    required
  />
);

export default LoginComponent;
