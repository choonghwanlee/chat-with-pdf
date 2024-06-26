"use client"
import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const ENDPOINT_URL = 'https://chat-with-pdf-gq9x.onrender.com'

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files[0].type === 'application/pdf' || event.target.files[0].name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(event.target.files[0]);
    } else{
        setSelectedFile('')
        alert('Please select a PDF file!')
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
        let url = ENDPOINT_URL + '/upload'
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            setUploadMessage('File Uploaded Successfully!');
            setTimeout(() => {
                setUploadMessage('');
              }, 3000);      
        } else{
            throw new Error('Upload Failed!');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
    }
  };

  return (
    <div style={{marginTop: '20px', marginLeft:'20px', display: 'flex', flexDirection:'column', alignItems:'flex-start'}}>
      <p>You can choose your own PDF to upload below!</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Submit PDF</button>
      {uploadMessage !== '' ? <p>{uploadMessage}</p>  : <p></p>}
    </div>
  );
};

export default FileUploadComponent;
