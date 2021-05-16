import diagnosesData from '../../data/diagnosesData';
import { Diagnose } from '../types';

const diagnoses : Array<Diagnose> = diagnosesData;

const getEntries = () : Array<Diagnose> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

const findByCode = (code : string): Diagnose | undefined => {
    const entry = diagnoses.find(d => d.code === code);
    return entry;
};

export default {
    getEntries,
    addEntry,
    findByCode
};