import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [personName, setPersonName] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (personName) {
      navigate(`/files/${personName}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Search Files</h2>
      <div className="mb-5">
        <label className="block text-gray-800 mb-2 text-sm font-medium">
          Search by Name:
        </label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
