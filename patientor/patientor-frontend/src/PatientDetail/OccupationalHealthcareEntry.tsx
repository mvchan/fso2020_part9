import React from "react";
import { useStateValue } from "../state";
import { Icon, Container, Card } from "semantic-ui-react";
import { OccupationalHealthcareEntry as OccupationalHealthcare } from '../types';

const OccupationalHealthcareEntry : React.FC<{ entry : OccupationalHealthcare } >= ({ entry }) => {

    const [{ diagnoses },] = useStateValue();

    return (
        <Container key={entry.id}>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{entry.date} <Icon className="stethoscope"/> {entry.employerName}</Card.Header>
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
    );
};

export default OccupationalHealthcareEntry;