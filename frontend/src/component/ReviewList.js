import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/`)
      .then(response => setReviews(response.data))
      .catch(error => console.error(error));
    console.log(process.env.REACT_APP_API_URL);
    socket.on('reviewUpdated', (review) => {
      if (review.id) {
        setReviews(reviews => reviews.filter(r => r._id !== review.id));
      } else {
        setReviews(reviews => [review, ...reviews]);
      }
    });

    return () => socket.off('reviewChange');
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
      .catch(error => console.error(error));
  };

  return (
    <div className='wrapper'>
      <button className='btn-place'><Link to="/new">Create New Review</Link></button>
      <div className='table-container'>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Date-time</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {reviews.map((review, index) => (
                <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.title}</td>
                <td>{review.content}</td>
                <td>{new Date(review.dateTime).toLocaleString()}</td>
                <td><Link to={`/${review._id}`}>Edit</Link></td>
                <td><button onClick={() => handleDelete(review._id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewList;
