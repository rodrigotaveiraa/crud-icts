import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  let { slug } = useParams();

  return (
    <header className={styles.container}>
      <Link to="/items">
        <span style={{ textDecoration: slug === "items" ? "underline" : null }}>
          Items
        </span>
      </Link>
      <Link to="/">
        <span style={{ textDecoration: slug === "/" ? "underline" : null }}>
          Pedidos
        </span>
      </Link>
    </header>
  );
}

export default Header;
