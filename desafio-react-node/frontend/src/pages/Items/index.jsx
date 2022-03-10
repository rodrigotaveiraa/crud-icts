import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import styles from "./styles.module.scss";

function Items() {
  let navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await api.get("/items");
      console.log(data);
      setItems(data);
    }
    fetchItems();
  }, []);

  const goToPage = (id) => navigate(`${id}`);

  return (
    <div className={styles.container}>
      <section>
        <label>Importar itens:</label>
        <input type="file" placeholder="Escolher arquivo" />
      </section>
      <main>
        <div className={styles.containerTable}>
          <table>
            <thead>
              <tr>
                <th>Nº item</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} onClick={() => goToPage(item.id)}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.marca}</td>
                  <td>{item.tipo}</td>
                  <td>{item.quantidade}</td>
                  <td>R${item.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Items;
