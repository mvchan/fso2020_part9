import React from "react";
import { useStateValue } from "../state";
import { Icon, Container, Card } from "semantic-ui-react";
import { HealthCheckEntry as HealthCheck, HealthCheckRating } from '../types';

const setColor = (rating : HealthCheckRating) => {
    switch (rating) {
        case HealthCheckRating.Healthy:
            return "green";
        case HealthCheckRating.LowRisk:
            return "yellow";
        case HealthCheckRating.HighRisk:
            return "orange";
        case HealthCheckRating.CriticalRisk:
            return "red";
        default:
            return "grey";
    }
};

const HealthCheckEntry : React.FC<{ entry : HealthCheck }> = ({ entry }) => {

    const [{ diagnoses },] = useStateValue();

    return (
        <Container key={entry.id}>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{entry.date} <Icon className="doctor"/></Card.Header>
                        <Card.Meta>{entry.description}</Card.Meta>
                        <Card.Description>
                            <div>
                                <ul>
                                    {entry.diagnosisCodes?.map(code => 
                                        <li key={code}>{code} {diagnoses[code]?.name}</li>
                                    )}
                                </ul>
                                <Icon className="heart" color={setColor(entry.healthCheckRating)}/>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Container>
    );
};

export default HealthCheckEntry;