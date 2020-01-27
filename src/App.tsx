import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Checkbox,Radio } from "@material-ui/core";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yoghurt: ""
        }}
        onSubmit={async(data, { setSubmitting /*resetForm */ }) => {
          console.log(data);
          setSubmitting(false);
          // resetForm(false)
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field
              placeholder="First Name"
              name="firstName"
              type="input"
              as={TextField}
            />
            <div>
              <Field
                placeholder="Last Name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>

            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div> Cookies</div>
            <Field
              name="cookies"
              type="checkbox"
              value="weed chip"
              as={Checkbox}
            />

            <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />

            <Field
              name="cookies"
              type="checkbox"
              value="choclate chip"
              as={Checkbox}
            />
            <div>Yoghurt</div>
            <Field
              name="yoghurt"
              type="radio"
              value="Strawbery"
              as={Radio}
            />
            <Field name="yoghurt" type="radio" value="Vanilla " as={Radio} />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre> {JSON.stringify(values, null, 2)} </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
