import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/${id}`, { title, content })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
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
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  );
}

export default ReviewEdit;
