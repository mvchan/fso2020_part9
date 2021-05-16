import patientData from '../../data/patientsData';
import { Patient, RedactedPatient } from '../types';

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

const addEntry = () => {
    return null;
};

const findById = (id : string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    findById
};