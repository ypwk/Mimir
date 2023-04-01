import { Link, useRoutes } from "react-router-dom";

import mainRoutes from "./routes/";
import Routes from "./Routes";

function App() {
  const routeResult = useRoutes(mainRoutes);
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
              <Link to="/products">Solver</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* You can use by useRoutes like this (I prefer it): */}
        {/* {routeResult} */}
        {/* Or use by defining it */}
        <Routes />
      </main>
    </>
  );
}

export default App;
