// import postgres from "postgres";
//
// const sql = postgres();


const create = async (book) => {
    const kv = await Deno.openKv();
    book.id = crypto.randomUUID();
    await kv.set(["books", book.id], book);
    return book;
};

const readAll = async () => {
    const kv = await Deno.openKv();
    const records = kv.list({ prefix: ["books"] });

    const result = [];
    for await (const record of records) {
        result.push(record.value);
    }

    return result;
};

const readOne = async (id) => {
    const kv = await Deno.openKv();
    const book = await kv.get(["books", id]);
    return book.value;
};

const update = async (id, book) => {
    const kv = await Deno.openKv();
    book.id = id;
    await kv.set(["books", id], book);
    return book;
};

const remove = async (id) => {
    const book = await readOne(id);
    const kv = await Deno.openKv();
    await kv.delete(["books", id]);
    return book;
};

export { create, readAll, readOne, update, remove };