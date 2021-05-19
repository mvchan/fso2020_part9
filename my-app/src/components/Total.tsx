import React from 'react';

// less verbose syntax for defining interface type for props
const Total = ( { courseParts } : { courseParts : { name: string, exerciseCount: number }[] } ) => (
    <>
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    </>
)

export default Total;