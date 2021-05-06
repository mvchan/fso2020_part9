interface Hours {
    hours: Array<number>;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
  
const parseExerciseCalcArguments = (args: Array<string>): Hours => {
    
    // first two arguments will be "run" and "calculateExercises"
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 9) throw new Error('Too many arguments');

    const hours = [];
    for (let i = 2; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            hours.push(Number(args[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return { hours }
}

const calculateExercises = (hours: Array<number>) : Result => {
    
    const periodLength = hours.length;

    const trainingDays = hours.reduce((accum, currentValue) => {
        return currentValue === 0 ? accum : accum + 1;
    }, 0);
    
    let rating;
    if (trainingDays / periodLength < 0.5)
        rating = 1;
    else if (trainingDays / periodLength >= 0.5 && trainingDays / periodLength < 0.75)
        rating = 2;
    else
        rating = 3;

    let ratingDescription;
    switch (rating) {
        case 1:
            ratingDescription = 'Abysmal';
            break;
        case 2:
            ratingDescription = 'Meh';
            break;
        case 3:
            ratingDescription = 'Awesome';
            break;
        default:
    }

    const average = hours.reduce((accum, currentValue) => accum + currentValue) / periodLength;

    const target = 2;
    
    const success = rating >= target ? true : false;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { hours } = parseExerciseCalcArguments(process.argv);
    console.log(calculateExercises(hours));
} catch (e) {
    console.log('Error: ', e.message);
}