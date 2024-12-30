
const getCount = async (feedbackValue) => {
    const kv = await Deno.openKv()
    const count = await kv.get(['feedbacks', feedbackValue])
    return count.value ?? 0
}

const addCount = async (feedbackValue) => {
    const kv = await Deno.openKv()
    const newCount = await getCount(feedbackValue) + 1
    await kv.set(['feedbacks', feedbackValue], newCount)
    return newCount
}

export {getCount, addCount}