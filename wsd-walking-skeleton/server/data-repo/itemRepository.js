const kv = await Deno.openKv()

let item = "Nothing.";

const getItem = async () => {
    const result = await kv.get(['item'])
    item = result.value ?? item
    return item;
};

const setItem = async (i) => {
    await kv.set(['item'], i)
};

export { getItem, setItem };
