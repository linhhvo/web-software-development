import * as courseApi from '$lib/apis/courses-api.js';

let courseState = $state([]);

// if (browser) {
//   courseState = await courseApi.getCourses();
// }

export const useCourseState = () => {
    return {
        get courses() {
            return courseState;
        },
        add: async (newCourse) => {
            await courseApi.addCourse(newCourse);
            courseState = await courseApi.getCourses();
        },
        getOneCourse: async (courseId) => {
            return await courseApi.getOneCourse(courseId);
        },
        getAllCourses: async () => {
            courseState = await courseApi.getCourses();
        }
    };
};