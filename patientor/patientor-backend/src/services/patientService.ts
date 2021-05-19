import patientData from '../../data/patientsData';
import { Patient, RedactedPatient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const patients : Patient[] = patientData;

const getEntries = () : Patient[] => {
    return patients;
};

// since excess fields are not prohibited from being returned, patients 
// should be mapped to include all fields except SSN or other sensitive data
const getNonSensitiveEntries = () : RedactedPatient[] => {
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

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById
};