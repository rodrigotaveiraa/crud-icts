import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import api from "../../services/axios";
import styles from "./styles.module.scss";
import { FiEdit, FiTrash } from "react-icons/fi";

const itemFields = ["nome", "marca", "tipo", "quantidade", "preco"];
const itemValues = {
  nome: "",
  marca: "",
  tipo: "",
  quantidade: "",
  preco: 0,
};

function VisualizarItem() {
  let navigate = useNavigate();
  const { slug } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={itemValues}
        onSubmit={(values) => console.log(values)}
      >
        {function ShowForm({ values, handleChange, setFieldValue }) {
          useEffect(() => {
            async function fetchItemsDetails() {
              const { data } = await api.get(`items/${slug}`);
              itemFields.forEach((field) => {
                setFieldValue(field, data[field], false);
              });
            }
            fetchItemsDetails();
          }, [setFieldValue]);

          return (
            <main>
              <section>
                <h2>Detalhes do item</h2>
                <div>
                  <FiEdit
                    onClick={() => setIsEdit(!isEdit)}
                    style={{ cursor: "pointer" }}
                  />
                  <FiTrash style={{ cursor: "pointer" }} color={"red"} />
                </div>
              </section>
              <div className={styles.box}>
                <label>Nome</label>
                <Field
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  disabled={!isEdit}
                  autoFocus={true}
                />
              </div>
              <div className={styles.box}>
                <label>Marca</label>
                <Field
                  name="marca"
                  value={values.marca}
                  onChange={handleChange}
                  disabled={!isEdit}
                />
              </div>
              <div className={styles.box}>
                <label>Tipo</label>
                <Field
                  name="tipo"
                  value={values.tipo}
                  onChange={handleChange}
                  disabled={!isEdit}
                />
              </div>
              <div className={styles.box}>
                <label>Quantidade</label>
                <Field
                  name="quantidade"
                  value={values.quantidade}
                  onChange={handleChange}
                  disabled={!isEdit}
                />
              </div>
              <div className={styles.box}>
                <label>Preço</label>
                <Field
                  name="preco"
                  value={values.preco}
                  onChange={handleChange}
                  disabled={!isEdit}
                />
              </div>
              {isEdit && (
                <footer>
                  <button>Cancelar</button>
                  <button>Salvar</button>
                </footer>
              )}
            </main>
          );
        }}
      </Formik>
    </div>
  );
}

export default VisualizarItem;
