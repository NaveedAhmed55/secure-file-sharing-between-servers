const crypto = require("crypto");
const { encryptFile, decryptFile } = require("./functions"); // Import your encryption and decryption functions

describe("Server E Encryption", () => {
  it("should encrypt and decrypt a file", () => {
    //content testing 
    const fileContent = Buffer.from("Hello, this is a test content!");
    const sessionKey = crypto.randomBytes(32);
    const encryptedContent = encryptFile(fileContent, sessionKey); 
    const decryptedContent = decryptFile(encryptedContent, sessionKey);
    // Compare the original and decrypted content
    expect(decryptedContent).toEqual(fileContent);
  });
});

describe("Server M Decryption", () => {
  it("should decrypt an encrypted file", () => {
    // Generate a random file content for testing
    const fileContent = Buffer.from("Hello, this is a test content!");
    const sessionKey = crypto.randomBytes(32);

    // Encrypt the file content
    const iv = crypto.randomBytes(16); // Generate IV
    const cipher = crypto.createCipheriv("aes-256-cbc", sessionKey, iv);
    const encryptedContent = Buffer.concat([iv, cipher.update(fileContent), cipher.final()]);
    const decryptedContent = decryptFile(encryptedContent, sessionKey);

    // Compare the original and decrypted content
    expect(decryptedContent).toEqual(fileContent);
  });
});
