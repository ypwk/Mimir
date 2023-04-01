import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Solver from "./pages/Solver";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/solve">
        <Route index element={<Solver />} />
      </Route>
    </BaseRoutes>
  );
}
