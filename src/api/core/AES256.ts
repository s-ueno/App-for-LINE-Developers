import crypto = require('crypto');

export class AES256 {

    constructor(protected IV?: string, protected Key?: string) {
        if (!IV) {
            this.IV = process.env["AES256.IV"];
        }
        if (!Key) {
            this.Key = process.env["AES256.Key"];
        }
    }

    public Encript(data: Buffer | string): Buffer {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.Key, this.IV);
        let encryptedData = cipher.update(data);
        encryptedData = Buffer.concat([encryptedData, cipher.final()]);
        return encryptedData;
    }

    public Decrypt(buff: Buffer): Buffer {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.Key, this.IV);
        let decryptedData = decipher.update(buff);
        decryptedData = Buffer.concat([decryptedData, decipher.final()]);
        // const dec = decryptedData.toString();
        return decryptedData;
    }
}