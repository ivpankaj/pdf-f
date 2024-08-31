import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState(null);
  const [personName, setPersonName] = useState('');
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', pdf);
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

  const handleGetFiles = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/files/${personName}`);

      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error('Error fetching files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-teal-600">Made By Pankaj</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleUpload} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">Upload File</h2>
          <div className="mb-5">
            <label className="block text-gray-800 mb-2 text-sm font-medium">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-800 mb-2 text-sm font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-800 mb-2 text-sm font-medium">PDF:</label>
            <input
              type="file"
              onChange={(e) => setPdf(e.target.files[0])}
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

        <form onSubmit={handleGetFiles} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">Search Files</h2>
          <div className="mb-5">
            <label className="block text-gray-800 mb-2 text-sm font-medium">Search by Name:</label>
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
      </div>

      {files.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold mb-4 text-teal-600">Files for {personName}:</h2>
          <ul>
            {files.map((file) => (
              <li key={file.id} className="mb-3 bg-gray-100 p-3 rounded-lg flex items-center">
                <a
                  href={`http://localhost:5000${file.file_path}`}
                  className="text-teal-500 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaUser className="text-lg" /> {file.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
