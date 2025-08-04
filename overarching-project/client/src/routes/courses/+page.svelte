<script>
    import {useCourseState} from "$lib/states/courseState.svelte.js";

    let courseState = useCourseState();

    const addCourse = async (e) => {
        const courseData = Object.fromEntries(new FormData(e.target));
        await courseState.add(courseData);
        e.target.reset();
        e.preventDefault();
    };


    $effect(() => {
        courseState.getAllCourses();
    })
</script>

<svelte:head><title>Courses</title></svelte:head>

<form class="space-y-4 flex flex-col" onsubmit={addCourse}>
    <h2 class="h2 text-xl font-semibold">Courses</h2>
    <label for="name" class="label">
        <span class="label-text mb-3">Course Name</span>
        <input class="input border placeholder:italic placeholder:text-sm placeholder:text-gray-500 focus:border-success-700"
               type="text"
               name="name" id="name"
               placeholder="Enter a course name">
    </label>

    <button class="btn preset-filled-tertiary-500" type="submit" value="Add Course">Add Course</button>
</form>

<h2 class="h2 text-xl font-semibold mt-8">Existing Courses</h2>
<ul class="list-inside list-disc text-base mt-4 marker:text-secondary-500">
    {#each courseState.courses as course}
        <li class="decoration-secondary-500">
            <a class="hover:underline"
               href={`/courses/${course.id}`}>{course.name}</a>
        </li>
    {/each}
</ul>