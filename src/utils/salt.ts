import crypto from 'crypto';

function generateRandomHash(length: number): string {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^A-Za-z0-9]/g, '');
}

export function createPasswordHash(
  password: string,
): Promise<{ hashedPassword: string; salt: string }> {
  return new Promise((resolve, reject) => {
    try {
      const salt = generateRandomHash(64);
      crypto.pbkdf2(password, salt, 104236, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        resolve({ hashedPassword: key.toString('base64'), salt });
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
  salt: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      crypto.pbkdf2(password, salt, 104236, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        if (key.toString('base64') === hashedPassword) {
          resolve(true);
        }
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}
