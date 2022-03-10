import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Modal from "react-modal";
import api from "../../services/axios";
import styles from "./styles.module.scss";
import { itemValues } from "../../itemValues";

function Items() {
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await api.get("/items");
      console.log(data);
      setItems(data);
    }
    fetchItems();
  }, []);

  const goToPage = (id) => navigate(`${id}`);

  const handleCancel = () => setFile(null);

  const handleSubmit = async (values) => {
    try {
      await api.post("/items", values);
      closeModal();
      setItems([...items, values]);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.reactModalOverlay}
        className={styles.reactModalContent}
        onRequestClose={closeModal}
      >
        <Formik initialValues={itemValues} onSubmit={handleSubmit}>
          {function ShowForm({ values, handleChange }) {
            return (
              <Form>
                <main className={styles.modalMain}>
                  <h2>Cadastrar item</h2>
                  <div className={styles.box}>
                    <label>Nº item</label>
                    <Field
                      name="idItem"
                      placeholder="Somente números"
                      value={values.idItem}
                      onChange={handleChange}
                      autoFocus={true}
                    />
                  </div>
                  <div className={styles.box}>
                    <label>Nome</label>
                    <Field
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      autoFocus={true}
                    />
                  </div>
                  <div className={styles.box}>
                    <label>Marca</label>
                    <Field
                      name="marca"
                      value={values.marca}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.box}>
                    <label>Tipo</label>
                    <Field
                      name="tipo"
                      value={values.tipo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.box}>
                    <label>Quantidade</label>
                    <Field
                      name="quantidade"
                      placeholder="Somente números"
                      value={values.quantidade}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.box}>
                    <label>Preço</label>
                    <Field
                      name="preco"
                      value={values.preco}
                      onChange={handleChange}
                    />
                  </div>
                  <footer>
                    <button onClick={closeModal}>Cancelar</button>
                    <button type="submit" className={styles.salvar}>
                      Salvar
                    </button>
                  </footer>
                </main>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      <div className={styles.container}>
        <section>
          <div>
            <label>Importar itens:</label>
            <div className={styles.buttonImport}>
              <p>Importar</p>
              <input
                type="file"
                onChange={(e) => setFile(e.target.value)}
                placeholder="Escolher arquivo"
              />
            </div>
          </div>
          <button onClick={openModal}>Cadastrar item</button>
        </section>
        {file && file.length > 0 && (
          <>
            <button onClick={handleCancel}>Cancelar</button>
            <button
              style={{
                background: "var(--azul-desbotado)",
                color: "var(--branco)",
                marginLeft: "10px",
              }}
            >
              Cadastrar
            </button>
          </>
        )}
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
                  <tr key={item.idItem} onClick={() => goToPage(item.idItem)}>
                    <td>{item.idItem}</td>
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
    </>
  );
}

export default Items;
