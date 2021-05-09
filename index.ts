import express from 'express';
import { calculateBMI } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height = req.query.height;
    const weight = req.query.weight;

    if ( (!height || !weight)
        || (isNaN(Number(height)) || isNaN(Number(weight))) )
        throw new Error('malformatted parameters')

    const result = {
        height,
        weight,
        bmi: calculateBMI(Number(height), Number(weight))
    }
        
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});