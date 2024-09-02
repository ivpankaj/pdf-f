// components/UploadForm.js

import React, { useState } from 'react';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (pdf) {
      formData.append('pdf', pdf);
    }
    formData.append('title', title);
    formData.append('personName', name);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully');
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Upload File</h2>
      <div className="mb-5">
        <label className="block text-gray-800 mb-2 text-sm font-medium">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-800 mb-2 text-sm font-medium">
          Title:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-800 mb-2 text-sm font-medium">
          PDF:
        </label>
        <input
          type="file"
          onChange={(e) => setPdf(e.target.files[0] || null)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
