import patientData from '../../data/patientsData';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';
import {v1 as uuid} from 'uuid';
import { isValidEntry } from '../utils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

let patients : Patient[] = patientData;

const getEntries = () : Patient[] => {
    return patients;
};

// since excess fields are not prohibited from being returned, patients 
// should be mapped to include all fields except SSN or other sensitive data
const getNonSensitiveEntries = () : PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry : NewPatient): Patient => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id : string = uuid();

    const newPatient : Patient = {
        id,
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const findById = (id : string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

const addEntry = (currentPatient : Patient, reqBody : Entry) : Entry | undefined => {
    let newEntry : Entry | undefined = undefined;
    
    switch (reqBody.type) {
      case "Hospital":
        newEntry = {
          id: uuid(),
          description: reqBody.description,
          date: reqBody.date,
          specialist: reqBody.specialist,
          diagnosisCodes: reqBody.diagnosisCodes,
          type: "Hospital",
          discharge: reqBody.discharge
        };
        break;
      case "HealthCheck":
        newEntry = {
          id: uuid(),
          description: reqBody.description,
          date: reqBody.date,
          specialist: reqBody.specialist,
          diagnosisCodes: reqBody.diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating: reqBody.healthCheckRating
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          id: uuid(),
          description: reqBody.description,
          date: reqBody.date,
          specialist: reqBody.specialist,
          diagnosisCodes: reqBody.diagnosisCodes,
          type: "OccupationalHealthcare",
          employerName: reqBody.employerName,
          sickLeave: reqBody.sickLeave
        };
        break;
      default:
    }

    const patientToUpdate = patients.find(d => d.id === currentPatient.id);

    if (patientToUpdate !== undefined && newEntry !== undefined && isValidEntry(newEntry)) {
        patientToUpdate.entries.push(newEntry);
        patients = patients.filter(d => d.id !== currentPatient.id);
        patients.push(patientToUpdate);
    } else {
        console.log ('Patient failed backend update');
        throw new Error('Patient failed backend update');
    }

    return newEntry;
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById,
    addEntry
};