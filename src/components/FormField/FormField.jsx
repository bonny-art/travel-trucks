import { Field } from "formik";

import styles from "./FormField.module.css";

const FormField = ({ name, placeholder, isTextarea, error, touched }) => {
  const fieldClass = isTextarea ? styles.fieldComment : styles.field;

  return (
    <div className={styles.wrapper}>
      <Field
        name={name}
        as={isTextarea ? "textarea" : "input"}
        className={fieldClass}
        placeholder={placeholder}
        aria-label={placeholder || name}
      />
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FormField;
