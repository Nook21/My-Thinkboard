import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        console.error('error in getallnotes', error)
        res.status(500).json({ message: 'internal server error' })
    }
}

export const getNoteeBYId = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "any note found ( " })

        res.status(200).json(note)
    } catch (error) {
        console.error('error in get own note', error)
        res.status(500).json({ message: 'internal server error' })
    }
}
export const createAllNotes = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })
        const savenote = await note.save()
        res.status(201).json(savenote)
    } catch (error) {
        console.error('error in createallnotes', error)
        res.status(500).json({ message: 'internal server error' })
    }

}

export const updateAllNotes = async (req, res) => {
    try {
        const { title, content } = req.body
        const updatednote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })

        if (!updatednote) return res.status(404).json({ message: 'not found' })

        res.status(200).json({ updatednote })
    } catch (error) {
        console.error('error in updatingllnotes', error)
        res.status(500).json({ message: 'internal server error' })
    }
}

export const deleteAllNotes = async (req, res) => {
    try {
        const deletenote = await Note.findByIdAndDelete(req.params.id)
        if (!deletenote) return res.status(404).json({ message: 'eror in deleting' })

        res.status(200).json({ message: 'deleted' })
    } catch (error) {
        console.error('error in deletellnotes', error)
        res.status(500).json({ message: 'internal server error' })
    }

}
