import Note from "../models/Note.js";

// Get all notes
export async function getAllNotes(req, res) {
  // res.status(200).send("You just fetched  the notes");
  try {
    const notes = await Note.find().sort({createdAt: -1}); // Sort by createdAt in descending order or newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: error.message });
  }
}

// get note by id
export async function getNoteById(req,res){
    try {
        const note  = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json(note);

    } catch (error) {
         console.error("Error in getNoteById:", error);
    res.status(500).json({ message: error.message });
    }
}





// Create a new note
export async function createNote(req, res) {
  // res.status(201).json({message:"note created successfully"})
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content: content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNoteController:", error);
    res.status(500).json({ message: error.message });
  }
}

// Update an existing note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, }
    );
    if (!updatedNote) return res.status(404).json({message: "note not found" });

    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {
    console.error("Error in updateNoteController:", error);
    res.status(500).json({ message: error.message });
  }
}


// Delet a note
export async function deleteNote(req, res) {
//   res.status(200).json({ message: "note deleted successfully" });
try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "note deleted successfully" });
    

} catch (error) {
    console.error("Error in deleteNoteController:", error);
    res.status(500).json({ message: error.message });
}
}
