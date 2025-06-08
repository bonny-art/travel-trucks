import { Field } from "formik";
import styles from "./FormField.module.css";

const FormField = ({ name, placeholder, isTextarea, error, touched }) => (
  <div className={styles.fieldWrapper}>
    <Field
      name={name}
      placeholder={placeholder}
      as={isTextarea ? "textarea" : "input"}
      className={isTextarea ? styles.fieldStyledComment : styles.fieldStyled}
    />
    {touched && error && <div className={styles.errorStyled}>{error}</div>}
  </div>
);

export default FormField;
