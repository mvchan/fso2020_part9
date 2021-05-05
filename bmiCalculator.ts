interface DivideValues {
    value1: number;
    value2: number;
}
  
const parseArguments = (args: Array<string>): DivideValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBMI = (height_in_cm: number, weight_in_kg: number) : string => {
    const BMI = weight_in_kg / Math.pow((height_in_cm / 100), 2);

    if (BMI < 18.5)
        return 'Underweight';
    else if (BMI >= 18.5 && BMI <= 24.9)
        return 'Normal (healthy weight)'
    else if (BMI > 24.9 && BMI <= 29.9)
        return 'Overweight'
    else
        return 'Obesity'
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBMI(value1, value2));
} catch (e) {
    console.log('Error: ', e.message);
}