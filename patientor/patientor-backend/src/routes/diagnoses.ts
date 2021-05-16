import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.get('/:code', (req, res) => {
    const diagnosis = diagnosesService.findByCode(req.params.code);
  
    if (diagnosis) {
      res.send(diagnosis);
    } else {
      res.sendStatus(404);
    }
  }
);

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;