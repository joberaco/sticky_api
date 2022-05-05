import { MongoClient as mongo, ObjectId } from "mongodb"

/* MongoDB init */
const mongoURL = "mongodb://127.0.0.1:27017"
let db = null

async function startDB() {
    mongo.connect(
        mongoURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if(err) {
                console.error("MongoDB connection error: ", err)
                return
            }
    
            db = client.db("stickyTasksDB")

            /* Handle conenction reset */
            client.on('close', function(){
                db = null
            })
        }
    )
}

async function getDB() {
    if(!db) await startDB()
    return db
}

/* bson ObjectID conversion */
function toObjectId(stringId) {
    return ObjectId.isValid(stringId) ? new ObjectId(stringId) : new ObjectId(parseInt(stringId))
}

export {
    startDB,
    getDB,
    toObjectId
}

