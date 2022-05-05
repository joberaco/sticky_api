import { getDB, toObjectId } from "./mongo.js";

const collectionName = "taskImgs"

/* GET HANDLER */
async function getTaskImgs() {
    const db = await getDB();
    return await db.collection(collectionName).find().toArray()
}

export {
    getTaskImgs
}

