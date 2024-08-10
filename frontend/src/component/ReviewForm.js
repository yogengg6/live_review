import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReviewForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/new`, { title, content })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Review:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
      <button type="reset" onClick={() => { setTitle(''); setContent(''); }}>Reset</button>
    </form>
  );
}

export default ReviewForm;
