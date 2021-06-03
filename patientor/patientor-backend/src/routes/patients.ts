import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
      const newPatient = toNewPatient(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
  } catch (e) {
      res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {

      let newEntry : Entry | undefined = undefined;

      const body : Entry = req.body as Entry;
      
      switch (body.type) {
        case "Hospital":
          newEntry = {
            id: body.id,
            description: body.description,
            date: body.date,
            specialist: body.specialist,
            diagnosisCodes: body.diagnosisCodes,
            type: "Hospital",
            discharge: body.discharge
          };
          break;
        case "HealthCheck":
          newEntry = {
            id: body.id,
            description: body.description,
            date: body.date,
            specialist: body.specialist,
            diagnosisCodes: body.diagnosisCodes,
            type: "HealthCheck",
            healthCheckRating: body.healthCheckRating
          };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            id: body.id,
            description: body.description,
            date: body.date,
            specialist: body.specialist,
            diagnosisCodes: body.diagnosisCodes,
            type: "OccupationalHealthcare",
            employerName: body.employerName,
            sickLeave: body.sickLeave
          };
          break;
        default:
          res.sendStatus(404);
      }

      if (newEntry !== undefined) {
        patient.entries.push(newEntry);
        res.json(patient);
      }
      else
        res.sendStatus(404);
    } else {
      res.sendStatus(404);
    }
});

export default router;