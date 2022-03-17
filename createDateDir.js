import 'dotenv/config';
import fs from 'fs';

export const createDateDirectory = () => {
  // create iso 8601 date string without time (YYYY-MM-DD)
  const dateString = new Date().toISOString().substring(0, 10);

  // check if directory exists
  if (!fs.existsSync(process.env.TARGET_DIR + dateString)) {
    fs.mkdirSync(process.env.TARGET_DIR + dateString);
  }

  return process.env.TARGET_DIR + dateString;
};
