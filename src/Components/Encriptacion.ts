import * as CryptoJS from 'crypto-js';

export function encryptData(data: string, secretKey: string): string {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey);
  return encryptedData.toString();
}

// Función para desencriptar datos
export function decryptData(encryptedData: string, secretKey: string): string {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return decryptedData.toString(CryptoJS.enc.Utf8);
}