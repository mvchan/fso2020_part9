import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

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
            <p>{patient.entries.map(entry => 
                    <div key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => 
                                <li key={code}>{code}</li>
                            )}
                        </ul>
                    </div>
                )}
            </p>
        </div>
    );
};

export default PatientDetail;