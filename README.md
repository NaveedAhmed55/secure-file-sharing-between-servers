# File Encryption and Decryption App

This repository contains a file encryption and decryption application built using React for the frontend and Node.js for the backend. The application allows users to upload a file, encrypt it on the server, and later decrypt and download the encrypted file.

## Features

- Choose a file to encrypt and upload.
- Encrypt the file on the server using AES-256 encryption.
- Decrypt and download the encrypted file.


## Architecture

The application follows a client-server architecture with two main components:

1. **Server E (Encryption Server):**
   - Responsible for encrypting uploaded files.
   - Generates a random session key for encryption.
   - Uses AES-256 encryption to encrypt files.
   - Saves the encrypted files to disk.

2. **Server M (Decryption Server):**
   - Receives the encrypted file ID from the client.
   - Decrypts the encrypted file using the shared session key.
   - Returns the decrypted file to the client for download.

## Tech Stack

- **Frontend:** React
- **Backend (Server E):** Node.js with Express
- **Backend (Server M):** Node.js with Express
- **Encryption:** AES-256 encryption algorithm
- **HTTP Requests:** Axios
- **Styling:** Tailwind CSS

## How to Use

1. Clone the repository:

   https://github.com/NaveedAhmed55/secure-file-sharing-between-servers.git
