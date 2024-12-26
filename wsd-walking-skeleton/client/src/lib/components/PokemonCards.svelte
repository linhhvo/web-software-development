<script>
    import { PUBLIC_API_URL } from "$env/static/public";

    let cards = $state([]);

    const addCard = async (e) => {
        const card = Object.fromEntries(new FormData(e.target));
        card.id = crypto.randomUUID();

        e.target.reset();
        e.preventDefault();

        await fetch(`${PUBLIC_API_URL}/cards`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(card)
            }
        )

    };

    const deleteCard = async (id) => {
        await fetch(`${PUBLIC_API_URL}/cards/${id}`, {
            method: 'DELETE'
        })
    };

    const fetchCards = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/cards`);
        const json = await response.json();
        cards = json.cards;
    };

    $effect(() => {
        fetchCards()
    })
</script>

<h1>Pokemon cards</h1>

<h2>Add a card</h2>

<form onsubmit={addCard}>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" placeholder="Enter name" /><br />
    <label for="type">Type</label>
    <input id="type" name="type" type="text" placeholder="Enter type" /><br />
    <input type="submit" value="Add card" />
</form>

<h2>Existing cards</h2>

<button onclick={fetchCards}>Update cards from API</button>

<ul>
    {#each cards as card}
        <li>
            {card.name} ({card.type})
            <button onclick={() => deleteCard(card.id)}>Remove</button>
        </li>
    {/each}
</ul>
