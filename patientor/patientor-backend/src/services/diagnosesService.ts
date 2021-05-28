import diagnosesData from '../../data/diagnosesData';
import { Diagnosis } from '../types';

const diagnoses : Array<Diagnosis> = diagnosesData;

const getEntries = () : Array<Diagnosis> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

const findByCode = (code : string): Diagnosis | undefined => {
    const entry = diagnoses.find(d => d.code === code);
    return entry;
};

export default {
    getEntries,
    addEntry,
    findByCode
};