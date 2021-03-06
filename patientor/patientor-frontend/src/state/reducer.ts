import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { 
        patient : Patient;
        entry : Entry; 
      }
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const currentPatient : Patient = action.payload.patient;
      currentPatient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patient.id]: { ...currentPatient }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi : Patient[]) : Action => (
  { 
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi 
  }
);

export const addPatient = (newPatient : Patient) : Action => (
  { 
    type: "ADD_PATIENT", 
    payload: newPatient 
  }
);

export const setDiagnosisList = (diagnosisListFromApi : Diagnosis[]) : Action => (
  { 
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnosisListFromApi 
  }
);

export const addEntry = (currentPatient : Patient, newEntry : Entry) : Action => (
  {
    type: "ADD_ENTRY",
    payload: {
      patient: currentPatient,
      entry: newEntry
    }
  }
);
