import { Link } from "react-router-dom";
import Routes from "./Routes";
import styled from "styled-components";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "blue",
};

function App() {
  return (
    <>
      <header>
        <Link to="/" style={linkStyle}>
          <img src="png/logo-no-background.png" className="logoimg" alt="logo"></img>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/solve" style={linkStyle}>
                Solver
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes />
    </>
  );
}

export default App;
