import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <Link to="/items">
        <span>Itens</span>
      </Link>
      <Link to="/">
        <span>Pedidos</span>
      </Link>
    </header>
  );
}

export default Header;
