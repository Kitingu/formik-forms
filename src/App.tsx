import React from "react";
import { Formik,Field } from "formik";
import { TextField, Button } from "@material-ui/core";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "ben", lastName: "mwendwa" }}
        onSubmit={(data, { setSubmitting /*resetForm */ }) => {
          console.log(data);
          setSubmitting(false);
          // resetForm(false)
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>

            
            <TextField
              name="firstname"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              name="lastname"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre> {JSON.stringify(values, null, 2)} </pre>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
