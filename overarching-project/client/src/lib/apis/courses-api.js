import { PUBLIC_API_URL } from '$env/static/public';

export const getCourses = async () => {
  const res = await fetch(`${PUBLIC_API_URL}/api/courses`);
  return await res.json();
};

export const addCourse = async (newCourse) => {
  const res = await fetch(`${PUBLIC_API_URL}/api/courses`, {
    headers: {
      "Content-Type": "application/json"
    },
    method : "POST",
    body   : JSON.stringify(newCourse)
  });

  return await res.json();
};

export const getOneCourse = async (courseId) => {
  const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}`);
  return await res.json();
};