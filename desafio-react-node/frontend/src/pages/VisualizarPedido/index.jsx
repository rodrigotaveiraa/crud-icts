import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import api from "../../services/axios";
import styles from "./styles.module.scss";
import { FiEdit, FiTrash } from "react-icons/fi";
import { itemValues, itemFields } from "../../itemValues";

function VisualizarItem() {
  let navigate = useNavigate();
  const { slug } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [flagReset, setFlagReset] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleDelete = () => {
    navigate("/items");
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={itemValues} onSubmit={handleSubmit}>
        {function ShowForm({ values, handleChange, setFieldValue }) {
          useEffect(() => {
            async function fetchItemsDetails() {
              const { data } = await api.get(`items/${slug}`);
              itemFields.forEach((field) => {
                setFieldValue(field, data[field], false);
              });
            }
            fetchItemsDetails();
          }, [setFieldValue, flagReset]);

          return (
            <main>
              <section>
                <h2>Detalhes do item</h2>
                <div>
                  <FiEdit
                    onClick={() => setIsEdit(!isEdit)}
                    style={{ cursor: "pointer" }}
                  />
                  <FiTrash
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                    color={"red"}
                  />
                </div>
              </section>
              <Form>
                <div className={styles.box}>
                  <label>Id item</label>
                  <Field
                    name="idItem"
                    value={values.idItem}
                    onChange={handleChange}
                    disabled={!isEdit}
                    autoFocus={true}
                  />
                </div>
                <div className={styles.box}>
                  <label>Nome</label>
                  <Field
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    disabled={!isEdit}
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
                    <button type="submit" className={styles.salvar}>
                      Salvar
                    </button>
                  </footer>
                )}
              </Form>
            </main>
          );
        }}
      </Formik>
    </div>
  );
}

export default VisualizarItem;
