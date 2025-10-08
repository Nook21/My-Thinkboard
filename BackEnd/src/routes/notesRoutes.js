import express from 'express'
import { createAllNotes,  deleteAllNotes,  getAllNotes, getNoteeBYId, updateAllNotes } from '../controllers/notesControllers.js'
const route = express.Router()

route.get('/',getAllNotes)
route.get('/:id',getNoteeBYId)
route.post('/',createAllNotes)
route.put('/:id',updateAllNotes)
route.delete('/:id',deleteAllNotes)

export default route
