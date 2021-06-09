import { NewPatient, Gender, EntryTypes, Entry, HealthCheckRating } from './types';

type PatientFields = { 
    name : unknown,
    dateOfBirth : unknown,
    ssn : unknown,
    gender : unknown,
    occupation : unknown,
    entries? : unknown[]
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : PatientFields): NewPatient => {
    
    const emptyEntries : Entry[] = [];

    const newPatient : NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries : entries ? parseEntries(entries) : emptyEntries
    };

    return newPatient;
};

// STRING PARSING
const parseString = (text : unknown): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing text');
    }
    return text;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// DATE PARSING
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// GENDER PARSING
const parseGender = (gender : unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param : any) : param is Gender => {
    return Object.values(Gender).includes(param);
};

export const parseEntries = (entries : unknown) : Entry[] => {
    if (!entries || !isValidEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntries = (param : any) : param is Entry[] => {

    let result = true;

    if (param.length)
        return result;

    if (Array.isArray(param)) {
        param.forEach((element : Entry) => {
            result = result && isValidEntry(element);
        });
    }

    return result;
    
};

export const isValidEntry = (element : Entry) : element is Entry => {

    let result = true;

    if (!Object.values(EntryTypes).includes(element.type)) {
        result = result && false;
    }
        
    result = result && isString(element.id) &&
        isString(element.description) &&
        isDate(element.date) &&
        isString(element.specialist) &&
        (element.diagnosisCodes ? isDiagnosisCodes(element.diagnosisCodes) : true);

    switch (element.type) {
        case "Hospital":
            result = result &&
                isEntryType(element.type) &&
                isString(element.discharge.date) &&
                isString(element.discharge.criteria);
            break;
        case "HealthCheck":
            result = result &&
                isEntryType(element.type) &&
                isHealthCheckRating(element.healthCheckRating);
            break;
        case "OccupationalHealthcare":
            result = result &&
                isEntryType(element.type) &&
                isString(element.employerName) &&
                isString(element.employerName) &&
                (element.sickLeave ? isSickLeave(element.sickLeave) : true);
            break;
        default:
            result = false;
    }

    if (!result)
        throw new Error('Entry is not valid: ' + element);

    return result;
};

// const parseEntryTypes = (entryType : unknown): EntryTypes => {
//     if (!entryType || !isEntryType(entryType)) {
//         throw new Error('Incorrect or missing entry type: ' + entryType);
//     }
//     return entryType;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param : any) : param is EntryTypes => {
    return Object.values(EntryTypes).includes(param);
};

// const parseDiagnosisCodes = (codes : unknown) : string[] => {
//     if (!codes || !isDiagnosisCodes(codes)) {
//         throw new Error('Incorrect or missing diagnosis codes: ' + codes);
//     }

//     return codes;
// };

const isDiagnosisCodes = (param : unknown) : param is string[] => {
    return Array.isArray(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param : any) : param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

type SickLeave = {
    startDate : string,
    endDate : string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param : any) : param is SickLeave => {
    return isDate(param.startDate) && isDate(param.endDate);
};

export default toNewPatient;