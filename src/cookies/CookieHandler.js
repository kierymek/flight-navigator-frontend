export function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
    // alert("Welcome again " + username);
    console.log("Authentificated correctly for user: ", username);
    return true;
  } else {
    // alert("First you need to log in to gain all functionalities!");
    return false;
  }
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exminutes = 2) {
  const d = new Date();
  d.setTime(d.getTime() + exminutes * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
