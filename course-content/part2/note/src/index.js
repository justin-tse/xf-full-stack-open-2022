import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

const promise = axios
  .get('http://localhost:3001/notes')
  .then(response => {
    console.log(response)
    const notes = response.data
    console.log(notes)
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App notes={notes} />);
  })
