import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import api from "../../services/axios";
import styles from "./styles.module.scss";
import { pedidoValues } from "../../itemValues";

function Pedidos() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listaItems, setListaItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await api.get("/items");
      // console.log(data);
      setListaItems(data);
    }
    fetchItems();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    // try {
    //   await api.post("/items", values);
    //   closeModal();
    //   setItems([...items, values]);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(values);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.reactModalOverlay}
        className={styles.reactModalContent}
        onRequestClose={closeModal}
      >
        <Formik initialValues={pedidoValues} onSubmit={handleSubmit}>
          {function ShowForm({ values, handleChange }) {
            return (
              <Form>
                <main className={styles.modalMain}>
                  <div className={styles.divideSections}>
                    <section>
                      <h2>Cadastrar Pedido</h2>
                      <div className={styles.box}>
                        <label>Nº Pedido</label>
                        <Field
                          name="idPedido"
                          placeholder="Somente números"
                          value={values.idPedido}
                          onChange={handleChange}
                          autoFocus={true}
                        />
                      </div>
                      <div className={styles.box}>
                        <label>Itens</label>
                        <Field
                          as="select"
                          name="listItems"
                          value={values.listItems}
                          onChange={handleChange}
                          placeholder="Selecionar itens"
                          id="listaItems"
                          multiple
                        >
                          {/* <option value="">Selecionar item</option> */}
                          {listaItems.map((item) => (
                            <option value={item.preco}>{item.nome}</option>
                          ))}
                        </Field>
                      </div>
                      <div className={styles.box}>
                        <label>Total Pedido</label>
                        <Field
                          name="totalPedido"
                          value={values.totalPedido}
                          onChange={handleChange}
                          autoFocus={true}
                        />
                      </div>
                    </section>
                    {/* <section>
                      <strong>Selecionados</strong>
                      {values.listItems.map((item) => (
                        <p>{item}</p>
                      ))}
                    </section> */}
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
        <button onClick={openModal}>Cadastrar pedido</button>
        <main>
          <div className={styles.containerTable}>
            <table>
              <thead>
                <tr>
                  <th>Nº Pedido</th>
                  <th>Total Pedido</th>
                  <th>Itens</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Pedidos;
