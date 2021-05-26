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
const isValidEntries = (param : any[]) : param is Entry[] => {

    let result = true;

    param.forEach((element : Entry) => {
        if (!Object.values(EntryTypes).includes(element.type))
            result = false;
    });

    return result;
    
};

export default toNewPatient;