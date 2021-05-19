import React from 'react';

// less verbose syntax for defining interface type for props
const Content = ( { courseParts } : { courseParts : { name: string, exerciseCount: number }[] } ) => (
    <>
        {courseParts.map(course => (
            <p key={course.name}>
                {course.name} {course.exerciseCount}
            </p>
        ))}
    </>
)

export default Content;