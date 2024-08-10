import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './component/ReviewList';
import ReviewForm from './component/ReviewForm';
import ReviewEdit from './component/ReviewEdit';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/new" element={<ReviewForm />} />
          <Route path="/:id" element={<ReviewEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
