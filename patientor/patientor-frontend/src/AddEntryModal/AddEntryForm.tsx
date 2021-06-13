import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryOption, DiagnosisSelection, NumberField } from "./FormField";
import { Entry, EntryTypes } from "../types";

import { useStateValue } from "../state";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values : EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions : EntryOption[] = [
  { value: EntryTypes.HealthCheck, label: "HealthCheck" },
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryTypes.Hospital, label: "Hospital" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {

  const [{ diagnoses },] = useStateValue();

  const additionalEntryInfo = (type : string) => {
    switch(type) {
      case 'HealthCheck':
        return (
          <>
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date (Optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date (Optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
      case 'Hospital':
        return (
          <>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </>
        );
      default:
    }
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";

        // index type expanded to union with object containing index to accommodate subfields (i.e. sickLeave, discharge)
        const errors: { [field: string]: string | { [field:string] : string } } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        
        // the respective errors will only appear per field since the states update independently despite being grouped together
        // i.e. the sick leave dates will not display required until after each input field has been clicked through
        switch (values.type) {
          case 'HealthCheck':
            if (!values.healthCheckRating)
              errors.healthCheckRating = requiredError;
            break;
          case 'OccupationalHealthcare':
            if (!values.employerName)
              errors.employerName = requiredError;
            if ((values.sickLeave?.startDate || values.sickLeave?.endDate) && (!values.sickLeave?.startDate || !values.sickLeave?.endDate)) {
              errors.sickLeave = {
                startDate : requiredError,
                endDate : requiredError
              };
            }
            break;
          case 'Hospital':
            if (!values.discharge) {
              errors.discharge = {
                date : requiredError,
                criteria : requiredError
              };
            }
            break;
          default:
          
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        // The Formik state is handled through the 'values' prop.
        // It is set implicitly by subcomponents through the 'name' field.
        // For example, SelectField assigns values.type to the value of the selected option.

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Type"
              name="type"
              options={entryOptions}
            />
            {additionalEntryInfo(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
