import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value : never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ course } : { course : CoursePart }) => {

    const displayAttributes = () => {
        switch (course.type) {
            case "normal":
                return (
                    <>
                        <i>{course.description}</i>
                    </>
                )
                break;
            case "groupProject":
                return (
                    <>
                        project exercises {course.groupProjectCount}
                    </>
                )
                break;
            case "submission":
                return (
                    <>
                        <i>{course.description}</i>
                        <br/>submit to {course.exerciseSubmissionLink}
                    </>
                )
                break;
            case "special":
                return (
                    <>
                        <i>{course.description}</i>
                        <br/>required skills: {course.requirements.toString()}
                    </>
                )
                break;
            default:
                return assertNever(course);
        }
    }

    return (
        <>
            {displayAttributes()}
        </>
    );
}

export default Part;