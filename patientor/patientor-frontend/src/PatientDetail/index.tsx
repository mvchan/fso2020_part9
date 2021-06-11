import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon, Button } from "semantic-ui-react";
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { addEntry } from "../state/reducer";

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
    const [{ patients }, dispatch] = useStateValue();

    const patient = patients[id];

    // START MODAL CODE
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/api/patients/${id}/entries`,
            values
          );

          console.log(newEntry);

          if (patient !== undefined) {
            dispatch(addEntry(patient,newEntry));
          }

          closeModal();
        } catch (e) {
            console.log(e.response);
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data || 'Unknown error');
        }
    };
    // END MODAL CODE

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
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientDetail;