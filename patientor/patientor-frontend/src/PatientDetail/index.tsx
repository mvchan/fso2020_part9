import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

const PatientDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses },] = useStateValue();

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
                    <div key={entry.id}>
                        <em>{entry.date} {entry.description}</em>
                        <ul>
                            {entry.diagnosisCodes?.map(code => 
                                <li key={code}>{code} {diagnoses[code]?.name}</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetail;