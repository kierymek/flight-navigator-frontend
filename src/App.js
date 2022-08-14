import React, { useEffect, useState } from "react";
import LoginComponent from "./routes/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "./routes/Search";
import Navigator from "./components/Navigator";

import "./css/app.scss";
import { checkCookie, getCookie } from "./cookies/CookieHandler";
import Profile from "./routes/Profile";

export default function App() {
  const [isLogged, setIsLogged] = useState("login");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log("App -> checkCookie / user: ", user);

  useEffect(() => {
    console.log("App -> inside  useEffect");
    if (checkCookie()) {
      fetch("api/auth/", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            email: getCookie("username"),
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
          console.log("authentificating user onsubmit! : ", json);
          json ? setUser(json) : alert("Oops something went wrong!");
        })
        .catch((err) => {
          console.log("error catched in loggin: ", err);
          // alert("Invalid credentials!");
        });
    }
  }, []);

  console.log("App -> after checkCookie");

  return (
    <div className="app">
      <div className={`app-block-wrapper app-block-wrapper--is-${isLogged}`}>
        <Navigator user={user} setUser={(val) => setUser(val)} />
        <Routes>
          <Route
            path="/"
            element={
              <LoginComponent
                mode={isLogged}
                logger={(val) => setIsLogged(val)}
                setUser={(val) => setUser(val)}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/search"
            element={
              user ? (
                <Search user={user} />
              ) : (
                <LoginComponent
                  mode={isLogged}
                  logger={(val) => setIsLogged(val)}
                  setUser={(val) => setUser(val)}
                  navigate={navigate}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile
                  user={user}
                />
              ) : (
                <LoginComponent
                  mode={isLogged}
                  logger={(val) => setIsLogged(val)}
                  setUser={(val) => setUser(val)}
                  navigate={navigate}
                />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}
