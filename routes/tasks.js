import { Router } from "express"
import { newDbError, okResponse } from '../utils.js'
import * as db from '../database/tasks.js'

const router = Router()

 /* GET TASKS */
 router.get("/", (req, res, next) => {
    db.getTasks()
        .then(data => res.status(200).json(data))
        .catch(err => next(newDbError(err, "Could not get tasks")))
})

/* GET TASK BY ID */
router.get("/:id", (req, res, next) => {
    db.getTask(req.params.id)
        .then(data => {
            if(data)
                res.status(200).json(data)
            else
                throw new Error("Not found")
        })
        .catch(err => next(newDbError(err, "Could not get task with id " + req.params.id)))
})

/* POST TASK */
router.post("/", (req, res, next) => {
    db.postTask(req.body)
        .then(() => res.status(200).json(okResponse))
        .catch(err => next(newDbError(err, "Could not post task")))
})

/* UPDATE TASK */
router.put("/:id", (req, res, next) => {
    db.updateTask(req.params.id, req.body)
        .then(data => {
            if(data.acknowledged && data.modifiedCount > 0)
                res.status(200).json(okResponse)
            else
                throw new Error("Not found for update")
        })
        .catch(err => next(newDbError(err, "Could not update task with id " + req.params.id)))
})

/* DELETE TASK */
router.delete("/:id", (req, res, next) => {
    db.deleteTask(req.params.id)
        .then(data => {
            if(data.deletedCount > 0)
                res.status(200).json(okResponse)
            else
                throw new Error("Not found for deletion")
        })
        .catch(err => next(newDbError(err, "Could not delete task with id " + req.params.id)))
})

export default router