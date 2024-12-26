import { PUBLIC_HARRY_POTTER_API } from "$env/static/public";

const getSpells = async () => {
    const response = await fetch(`${PUBLIC_HARRY_POTTER_API}/en/spells`);
    return await response.json();
};

export { getSpells };
