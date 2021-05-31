import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (value : never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails : React.FC<{ entry : Entry } > = ({ entry }) => {

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const PatientDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [{ patients },] = useStateValue();

    const patient = patients[id];

    if (!patient || patient === undefined)
        return null;

    console.log(patient);

    return (
        <div>
            <h1>{patient.name} <Icon className={patient.gender} /></h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            <div>{patient.entries.map(entry =>
                    <EntryDetails key={entry.id} entry={entry} /> 
                )}
            </div>
        </div>
    );
};

export default PatientDetail;