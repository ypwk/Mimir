import { Link, useRoutes } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <>
      <header>
        <strong>Mimir</strong>
        <nav>
          <ul>
            <li>
              <Link to="/">Mimir</Link>
            </li>
            <li>
              <Link to="/solve">Solver</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes />
      </main>
    </>
  );
}

export default App;
