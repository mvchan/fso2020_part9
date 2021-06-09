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
      const body : Entry = req.body as Entry;

      const newEntry : Entry | undefined = patientService.addEntry(patient,body);

      console.log(newEntry);
      if (newEntry !== undefined) {
        res.json(newEntry);
      }
      else
        res.sendStatus(400);
    } else {
      res.sendStatus(404);
    }
});

export default router;