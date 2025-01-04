<script>
  import { useCourseState } from "../../lib/states/courseState.svelte.js";

  let courseState = useCourseState();

  const addCourse = async (e) => {
    const courseData = Object.fromEntries(new FormData(e.target));
    await courseState.add(courseData);
    e.target.reset();
    e.preventDefault();
  };
</script>

<h1>Courses</h1>
<form onsubmit={addCourse}>
  <label for="name">Course Name</label>
  <input type="text" name="name" id="name" placeholder="Enter a course name">
  <button type="submit" value="Add Course">Add Course</button>
</form>

<ul>
  {#each courseState.courses as course}
    <li><a href={`/courses/${course.id}`}>{course.name}</a></li>
  {/each}
</ul>




