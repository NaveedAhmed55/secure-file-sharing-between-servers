const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulate session key received from Server M
const sessionKey = Buffer.from("2f7c5d8e1a4b3f9c2f7c5d8e1a4b3f9c"); // 32-byte key

if (sessionKey.length !== 32) {
  console.error("M Invalid session key length");
  process.exit(1);
}
else{
  console.log("valid")
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/encrypt-file", upload.single("file"), (req, res) => {
  console.log("filedeails",req.file);
  try {
    const fileContent = req.file.buffer;
    const encryptedContent = encryptFile(fileContent, sessionKey);

    // Simulate storing the encrypted file
    const fileId = crypto.randomBytes(16).toString("hex");
    fs.writeFileSync(`${fileId}.enc`, encryptedContent);

    res.json({ fileId });
  } catch (error) {
    console.error("Error during file encryption:", error);
    res.status(500).json({ error: "File encryption error", session: sessionKey });
  }
});

function encryptFile(fileContent, key) {
  const iv = crypto.randomBytes(16); // Generate IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encryptedContent = Buffer.concat([iv, cipher.update(fileContent), cipher.final()]);
  return encryptedContent;
}

app.listen(port, () => {
  console.log(`Server E listening at http://localhost:${port}`);
});
