import { getDB, toObjectId } from "./mongo.js";

const collectionName = "tasks"

/* GET HANDLER */
async function getTasks() {
    const db = await getDB();
    return await db.collection(collectionName).find().toArray()
}

/* GET BY ID HANDLER */
async function getTask(id) {
    const db = await getDB();
    let idQuery = {_id: toObjectId(id)}

    return await db.collection(collectionName).findOne(idQuery)
}

/* POST HANDLER */
async function postTask(task) {
    const db = await getDB();
    let newTask = task

    formatToValidInput(task)

    return await db.collection(collectionName).insertOne(newTask)
}

/* UPDATE BY ID HANDLER */
async function updateTask(id, data) {
    const db = await getDB();
    let idQuery = {_id: toObjectId(id)};

    formatToValidInput(data)

    let updateQuery = { $set: data }
    
    return await db.collection(collectionName).updateOne(idQuery, updateQuery)
}

/* GET BY ID HANDLER */
async function deleteTask(id) {
    const db = await getDB();
    let idQuery = {_id: toObjectId(id)}

    return await db.collection(collectionName).deleteOne(idQuery)
}

/* Date conversion for task */
function formatDates(task) {
    if(task.start_time)
        task.start_time = new Date (task.start_time)
    if(task.end_time)
        task.end_time = new Date (task.end_time)
}

/* Convert to valid input json */
function formatToValidInput(task) { 
    formatDates(task);
    /* filter out inmutable field _id*/
    if(task._id)
        delete task._id;
     /* hour string conversion if necessary */
     if(task.hour_estimate)
        task.hour_estimate = task.hour_estimate.toString();
}

export {
    getTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask
}

