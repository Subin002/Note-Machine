const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Notemodel = require('./models/note');

const app = express();
const port = 1400;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/NoteApp')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection failed', err);
});

// POST
app.post('/notes', async (req, res) => {
    try {
        const { note, title, content, instruction } = req.body;
        const notedata = await Notemodel.create({ note, title, content, instruction });
        res.status(201).json({ message: 'Successfully created', notes: notedata });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// GET all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Notemodel.find();
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// UPDATE
app.put('/notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, instruction } = req.body;
      const updatedNote = await Notemodel.findByIdAndUpdate(id, { title, content, instruction }, { new: true });
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json({ message: 'Successfully updated', note: updatedNote });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });


// DELETE
app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Notemodel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
