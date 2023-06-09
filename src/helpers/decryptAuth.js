import CryptoJS from 'crypto-js';

export function decryptAuth(encryptedPassword) {
    const decryptB64 = Buffer.from(encryptedPassword, 'base64').toString('utf-8');
    const decryptedPassword = CryptoJS.AES.decrypt(decryptB64, '5HbQWlj2d7').toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
}
