import React, { useState } from 'react';
import axios from 'axios';
import './form.css';

function UpdateForm({ updateNoteId, updateNoteText, handleUpdateSubmit }) {
  const [title, setTitle] = useState(updateNoteText?.title || '');
  const [content, setContent] = useState(updateNoteText?.content || '');
  const [instruction, setInstruction] = useState(updateNoteText?.instruction || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !instruction) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:1400/notes/${updateNoteId}`, { title, content, instruction });
      handleUpdateSubmit(res.data.note); 
      setError(null); 
    } catch (err) {
      console.error('Axios Error:', err);
      if (err.response) {
       
        setError(`Server Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError('Network Error: Unable to reach server.');
      } else {
        setError('Unknown Error: Please try again later.');
      }
    }
  };
  
  

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
        </div>
        <div className='form-group'>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Content"
          />
        </div>
        <div className='form-group'>
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Enter Instruction"
          />
        </div>
        <div className='form-group'>
          <button className="button01" type="submit">Update Note</button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default UpdateForm;
