import { Formik, Field } from "formik";
import * as Yup from "yup";
import { startOfDay } from "date-fns";

import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";

import { showSuccessToast } from "../../notifications/showToast";

import styles from "./BookingForm.module.css";
import FormField from "../FormField/FormField";

const today = startOfDay(new Date());

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
    .required("Email is required"),
  bookingDate: Yup.date()
    .min(today, "Select a date starting from today")
    .required("Booking date is required"),
  comment: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  bookingDate: null,
  comment: "",
};

const successTitle = "Message send successfully!";
const successMessage = "Our manager will contact you shortly!";

export const BookingForm = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    showSuccessToast(successTitle, successMessage);
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
              <FormField
                name="name"
                placeholder="Name*"
                error={formik.errors.name}
                touched={formik.touched.name}
              />

              <FormField
                name="email"
                placeholder="Email*"
                error={formik.errors.email}
                touched={formik.touched.email}
              />

              <DateInput name="bookingDate" />

              <FormField
                name="comment"
                placeholder="Comment"
                isTextarea
                error={formik.errors.comment}
                touched={formik.touched.comment}
              />
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
