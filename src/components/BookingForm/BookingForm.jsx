import { Formik, Field } from "formik";
import * as Yup from "yup";
import styles from "./BookingForm.module.css";
import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { startOfDay } from "date-fns";
import { showSuccessToast } from "../../notifications/showToast";

const today = () => startOfDay(new Date());

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
    .required("Email is required"),
  bookingDate: Yup.date()
    .min(today(), "Select a date starting from today")
    .required("Booking date is required"),
  comment: Yup.string(),
});

export const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  };

  const title = "Message send successfully!";
  const message = "Our manager will contact you shortly!";

  const handleSubmit = async (values, actions) => {
    console.log(values);
    showSuccessToast(title, message);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h3>Book your campervan now</h3>
        <p>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form className={styles.formStyled} onSubmit={formik.handleSubmit}>
            <div className={styles.inputs}>
              <div className={styles.fieldWrapper}>
                <Field
                  name="name"
                  placeholder="Name*"
                  className={styles.fieldStyled}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className={styles.errorStyled}>{formik.errors.name}</div>
                )}
              </div>

              <div className={styles.fieldWrapper}>
                <Field
                  name="email"
                  placeholder="Email*"
                  className={styles.fieldStyled}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={styles.errorStyled}>
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <DateInput name="bookingDate" />

              <div className={styles.fieldWrapper}>
                <Field
                  name="comment"
                  placeholder="Comment"
                  as="textarea"
                  className={styles.fieldStyledComment}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className={styles.errorStyled}>
                    {formik.errors.comment}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <Button type="submit" style="orange" width="166">
                Send
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
