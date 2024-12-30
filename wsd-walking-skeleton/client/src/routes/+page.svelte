<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    let errors = $state([]);

    const submitForm = async (e) => {
        errors = [];
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));
        const response = await fetch(`${PUBLIC_API_URL}/emails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        if (data.success === false) {
            errors = data.error.issues;
            console.log(errors)
            return;
        }

        // logic for successful response
    };
</script>

<form onsubmit={submitForm}>
    <label for="email">Email</label><br/>
    <input type="email" name="email" id="email" /><br/><br/>

    <label for="name">Name</label><br/>
    <input type="text" name="name" id="name" /><br/><br/>

    <label for="date">Date</label><br/>
    <input type="date" name="date" id="date" /><br/><br/>

    <input type="submit" value="Send email to server" />
</form>

{#each errors as error}
    <p>Error: {error.message}</p>
{/each}