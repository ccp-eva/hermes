import 'dotenv/config';
import fs from 'fs';

export const createDateDirectory = () => {
  // check if directory exists
  if (!fs.existsSync(process.env.TARGET_DIR + today)) {
    fs.mkdirSync(process.env.TARGET_DIR + today);
  }

  return process.env.TARGET_DIR + today;
};
