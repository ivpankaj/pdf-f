// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilesPage from './pages/FilesPage';
import UploadForm from './components/UploadForm';
import SearchForm from './components/SearchForm';


const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-teal-600">
        Made By Pankaj
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <UploadForm />
        <SearchForm />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/files/:personName" element={<FilesPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
