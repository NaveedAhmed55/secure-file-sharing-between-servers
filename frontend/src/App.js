import React, { useState } from "react";
import axios from "axios";

function App() {
  const [encryptedFileId, setEncryptedFileId] = useState("");
  const [decryptedFileLink, setDecryptedFileLink] = useState("");

  const encryptAndUploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/encrypt-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEncryptedFileId(response.data.fileId);
      alert("Encrypted file with id ",response.data.fileId)
      setDecryptedFileLink(""); 
    } catch (error) {
      console.error("Error encrypting and uploading file:", error);
    }
  };

  const requestDecryptedFile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/decrypt-file/${encryptedFileId}`, null, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDecryptedFileLink(url);
    } catch (error) {
      console.error("Error requesting decrypted file:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">File Encryption and Decryption</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a file to encrypt and upload:
        </label>
        <input
          type="file"
          accept=".txt"
          className="w-full border rounded p-2 mb-4"
          onChange={(e) => encryptAndUploadFile(e.target.files[0])}
        />
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={requestDecryptedFile}
            disabled={!encryptedFileId}
          >
            Decrypt File
          </button>
          {decryptedFileLink && (
            <a
              className="text-blue-500"
              href={decryptedFileLink}
              download="decrypted_file.txt"
            >
              Download Decrypted File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
