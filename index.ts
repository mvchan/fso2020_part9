import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

// important for obtaining request body
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const  { height, weight } = req.query;

    if ( (!height || !weight)
        || (isNaN(Number(height)) || isNaN(Number(weight))) )
        throw new Error('malformatted parameters');

    const result = {
        height,
        weight,
        bmi: calculateBMI(Number(height), Number(weight))
    };
        
    res.send(result);
});

app.post('/exercises', (req, res) => {
 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const  { daily_exercises, target } = req.body;

    if (!daily_exercises || !target)
        throw new Error('parameters missing');

    if ( isNaN(Number(target)) )
        throw new Error('malformatted parameters');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if ( isNaN(Number(daily_exercises[i])) )
            throw new Error('malformatted parameters');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parametersToSend : Array<number> = [ target, ...daily_exercises ];

    res.send(calculateExercises(parametersToSend));

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});