import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

// less verbose syntax for defining interface type for props
const Content = ( { courseParts } : { courseParts: CoursePart[] }) => (
    <>
        {courseParts.map(course => (
            <p key={course.name}>
                <b>{course.name} {course.exerciseCount}</b>
                <br /><Part course={course} />
            </p>
        ))}
    </>
)

export default Content;