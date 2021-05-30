import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon, Container, Card } from "semantic-ui-react";

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
                    <Container key={entry.id}>
                        <Card.Group>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{entry.date}</Card.Header>
                                    <Card.Meta>{entry.description}</Card.Meta>
                                    <Card.Description>
                                        <ul>
                                            {entry.diagnosisCodes?.map(code => 
                                                <li key={code}>{code} {diagnoses[code]?.name}</li>
                                            )}
                                        </ul>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Container>
                )}
            </div>
        </div>
    );
};

export default PatientDetail;