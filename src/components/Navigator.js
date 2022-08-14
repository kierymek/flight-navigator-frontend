import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { setCookie } from "../cookies/CookieHandler";

function Navigator(props) {
  function onLogout() {
    setCookie("username", "", 0);
    props.setUser(null);
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/search">Flight Navigator</Navbar.Brand>
        <Nav className="me-auto">
          {props.user ? (
            <Nav.Link href="/" onClick={() => onLogout()}>
              Log out
            </Nav.Link>
          ) : (
            <Nav.Link href="/">Login</Nav.Link>
          )}

          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
        {props.user && <Nav.Link href="/profile">{props.user.email}</Nav.Link>}
      </Container>
    </Navbar>
  );
}

export default Navigator;
