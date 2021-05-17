import express from 'express';
import patientService from '../services/patientService';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
  
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  }
);

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(newPatient);
});

export default router;