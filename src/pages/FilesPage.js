// pages/FilesPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const FilesPage = () => {
  const { personName } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/files/${personName}`
        );

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

    if (personName) {
      fetchFiles();
    }
  }, [personName]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">
        Files for {personName}:
      </h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li
                key={file.id}
                className="mb-3 bg-gray-100 p-3 rounded-lg flex items-center"
              >
                <a
                  href={`http://localhost:5000/uploads/${file.fileName}`}
                  className="text-teal-500 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaUser className="text-lg" /> {file.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files found for {personName}.</p>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
