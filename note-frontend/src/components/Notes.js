import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './note.css';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:1400/notes');
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1400/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    navigate('/updatenote'); 
  };

  return (
    <div className='full01'>
      <h2>NOTES</h2>
      <div className='card-container'>
        {notes.map((note) => (
          <div key={note._id} className='card'>
            <p>{note.note}</p>
            <p>{note.title}</p>
            <p>{note.content}</p>
            <p>{note.instruction}</p>
            <button onClick={() => handleUpdate(note._id, note.note)}>Update</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
