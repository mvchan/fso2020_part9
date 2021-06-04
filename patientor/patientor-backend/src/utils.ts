import { NewPatient, Gender, EntryTypes, Entry } from './types';

type PatientFields = { 
    name : unknown,
    dateOfBirth : unknown,
    ssn : unknown,
    gender : unknown,
    occupation : unknown,
    entries? : unknown[]
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : PatientFields): NewPatient => {
  const newEntry : NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: entries ? parseEntries(entries) : []
  };

  return newEntry;
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

const parseEntries = (entries : unknown[]) : Entry[] => {
    if (!entries || !isValidEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntries = (param : any[]) : boolean => {

    let result = true;

    param.forEach((element : Entry) => {
        if (!Object.values(EntryTypes).includes(element.type))
            result = false;

        switch (element.type) {
            case "Hospital":
                result = isString(element.id) ||
                        isString(element.description) ||
                        isDate(element.date) ||
                        isString(element.specialist) ||
                        (element.diagnosisCodes ? isDiagnosisCodes(element.diagnosisCodes) : true) ||
                        isEntryType(element.type) ||
                        isString(element.discharge.date) ||
                        isString(element.discharge.criteria);
                
                break;
            // case "HealthCheck":
            //     newEntry = {
            //     id: body.id,
            //     description: body.description,
            //     date: body.date,
            //     specialist: body.specialist,
            //     diagnosisCodes: body.diagnosisCodes,
            //     type: "HealthCheck",
            //     healthCheckRating: body.healthCheckRating
            //     };
            //     break;
            // case "OccupationalHealthcare":
            //     newEntry = {
            //     id: body.id,
            //     description: body.description,
            //     date: body.date,
            //     specialist: body.specialist,
            //     diagnosisCodes: body.diagnosisCodes,
            //     type: "OccupationalHealthcare",
            //     employerName: body.employerName,
            //     sickLeave: body.sickLeave
            //     };
            //     break;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                result = false;
            }
    });

    return result;
    
};

const parseEntryTypes = (entryType : unknown): EntryTypes => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing entry type: ' + entryType);
    }
    return entryType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param : any) : param is EntryTypes => {
    return Object.values(EntryTypes).includes(param);
};

const parseDiagnosisCodes = (codes : unknown) : string[] => {
    if (!codes || !isDiagnosisCodes(codes)) {
        throw new Error('Incorrect or missing diagnosis codes: ' + codes);
    }

    return codes;
};

const isDiagnosisCodes = (param : unknown) : param is string[] => {
    return Array.isArray(param);
};

export default toNewPatient;