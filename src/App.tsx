import React from "react";
import {
  Formik,
  Field,
  FieldArray,
  Form,
  FieldAttributes,
  useField
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import * as yup from "yup";
import "./App.css";

type MyRadioProps = { label: string } & FieldAttributes<{}>;
const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  // field.value
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

// custom text field
const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(25),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});
const App: React.FC = () => {
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yoghurt: "",
          pets: [{ type: "cat", name: "sophia", id: "" + Math.random() }]
        }}
        // validate={values => {
        //   const errors: Record<string, string> = {};
        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "Please input your first name";
        //   }
        //   return errors
        // }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting /*resetForm */ }) => {
          console.log(data);
          setSubmitting(false);
          // resetForm(false)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField
              placeholder="First Name"
              name="firstName"
              type="input"
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
            {/* working with radio buttons */}
            <div>Yoghurt</div>
            {/* <Field name="yoghurt" type="radio" value="Strawbery" as={Radio} /> */}
            <MyRadio
              name="yoghurt"
              type="radio"
              value="Strawberry"
              label="Strawberry"
            />
            <MyRadio
              name="yoghurt"
              type="radio"
              value="Vanila"
              label="Vanila"
            />
            <MyRadio name="yoghurt" type="radio" value="Mango" label="Mango" />
            <div>
              <FieldArray name="pets">
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          type: "Cat",
                          name: "",
                          id: "" + Math.random()
                        })
                      }
                    >
                      Add Pet
                    </Button>
                    {values.pets.map((pet, index) => {
                      // const name = `pets.${index}.name`;
                      // pets.0.name
                      return (
                        <div key={pet.id}>
                          <MyTextField
                            placeholder="Pet Name"
                            name={`pets.${index}.type`}
                          />
                          <Field
                            name={`pets.${index}.name`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="cat">Cat </MenuItem>
                            <MenuItem value="dog">Dog </MenuItem>
                            <MenuItem value="chinchilla">Chinchilla </MenuItem>
                          </Field>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            Delete
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>

              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre> {JSON.stringify(values, null, 2)} </pre>
            <pre> {JSON.stringify(errors, null, 2)} </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
