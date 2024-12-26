<script>
    import { getSpells } from "$lib/apis/harry-potter-api.js";

    let spells = $state([]);

    const loadSpells = async () => {
        spells = await getSpells();
    };

    $effect(() => {
        loadSpells()
    })
</script>

<button onclick={loadSpells}>Accio</button>

<ul>
    {#each spells as spell}
        <li>{spell.spell}</li>
    {/each}
</ul>
