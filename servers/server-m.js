const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());

// Use cors middleware to enable CORS
app.use(cors());

// Simulate session key received from Server E
const sessionKey = Buffer.from("2f7c5d8e1a4b3f9c2f7c5d8e1a4b3f9c"); // 32-byte key

if (sessionKey.length !== 32) {
  console.error(" M Invalid session key length");
  process.exit(1);
}

app.get("/decrypt-file/:fileId", (req, res) => {
  try {
    const fileId = req.params.fileId;
    const encryptedFilePath = `${fileId}.enc`;

    if (!fs.existsSync(encryptedFilePath)) {
      return res.status(404).json({ error: "Encrypted file not found" });
    }

    const encryptedContent = fs.readFileSync(encryptedFilePath);
    const decryptedContent = decryptFile(encryptedContent, sessionKey);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=decrypted_file.txt");
    res.send(decryptedContent);
  } catch (error) {
    console.error("Error during file decryption:", error);
    res.status(500).json({ error: "File decryption error" });
  }
});

function decryptFile(encryptedContent, key) {
  // Extract the IV from the encrypted content (first 16 bytes)
  const iv = encryptedContent.slice(0, 16);
  const encryptedData = encryptedContent.slice(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decryptedContent = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return decryptedContent;
}

app.listen(port, () => {
  console.log(`Server M listening at http://localhost:${port}`);
});
