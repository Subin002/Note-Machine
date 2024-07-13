import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';

function Form() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [instruction, setInstruction] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !instruction) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const res = await axios.post('http://localhost:1400/notes', {
    
        title,
        content,
        instruction
      });
      console.log('Response from server:', res.data);
      alert('Note added successfully');
      setTitle('');
      setContent('');
      setInstruction('');
    } catch (err) {
      console.error(err);
      setError('Failed to add note. Please try again.');
    }
  };

  const handleView = () => {
    navigate('/notes');
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
          <button className="button01" type="submit">Add Note</button>
          <button className="button01" onClick={handleView}>View Notes</button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default Form;
