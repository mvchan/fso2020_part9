interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
interface CoursePartBaseDesc extends CoursePartBase {
    description: string;
}
interface CourseNormalPart extends CoursePartBaseDesc {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartBaseDesc {
    type: "submission";
    exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartBaseDesc {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;