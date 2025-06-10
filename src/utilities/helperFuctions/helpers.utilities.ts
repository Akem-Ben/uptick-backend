import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";

dotenv.config();

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const generateToken = (data: any) => {
  return jwt.sign(data.data, `${process.env.APP_SECRET}`, { expiresIn: `${data.expires}` });
};

const convertToDDMMYY = (isoDateString: any) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;

}

const convertToISODateString = (regularDateString: any): string | null => {
  const dateParts = regularDateString.split('/');

  if (dateParts.length === 3) {
    const day = dateParts[0].padStart(2, '0');
    const month = dateParts[1].padStart(2, '0');
    const year = dateParts[2];

    const date = new Date(`${year}-${month}-${day}`);

    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
  }
  return null;
};

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET!);
    return decoded;
  }
  catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

export default {
  generateToken,
  validateToken,
  hashPassword,
  convertToDDMMYY,
  convertToISODateString
}