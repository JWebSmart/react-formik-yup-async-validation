import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const emailValidationApi = (email) => {
  console.log("Validating email:", email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Email is taken");
    }, 1500);
  });
};

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Not a valid email")
    .required("Required")
    .test("email_async_validation", "Email Validation Error", function (value) {
      return emailValidationApi(value)
        .then((res) => {
          const message = res;
          console.log("API Response:", message);
          return this.createError({ message: message });
          // return Promise.resolve(this.createError({ message: message })); // This also works
        })
        .catch((e) => {
          console.log(e);
        });
    })
});

export default function Home() {
  return (
    <div className="App">
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={formSchema}
      >
        <Form>
          <Field name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
        </Form>
      </Formik>
    </div>
  );
}
