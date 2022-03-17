import 'dotenv/config';
import Rsync from 'rsync';
import { createDateDirectory } from './createDateDir.js';
import { createSpinner } from 'nanospinner';

export function backup() {
  const rsync = new Rsync();
  rsync.flags('avzP');
  rsync.source(process.env.SOURCE_DIR);
  rsync.destination(createDateDirectory());

  const spinner = createSpinner();

  return new Promise((resolve, reject) => {
    try {
      let logData = '';
      rsync.execute(
        (error, code, cmd) => {
          resolve({ error, code, cmd, data: logData });
        },
        // (data) => {
        //   logData += data;
        // },
        (err) => {
          logData += err;
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
