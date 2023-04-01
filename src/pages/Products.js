import { Link } from "react-router-dom";

export default function Products() {
  return (
    <ul className="products">
      <li>
        <Link to="produto-1">boo</Link>
      </li>
      <li>
        <Link to="produto-3?color=green">boo 2</Link>
      </li>
    </ul>
  );
}
