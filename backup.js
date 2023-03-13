import Rsync from 'rsync';
import { createDateDirectory } from './createDateDir.js';

export const backup = (videoPaths) => {
  const rsync = new Rsync();
  rsync.flags('avzP');
  rsync.include('*/'); // include current directory (important)
  rsync.include(['*.mp4', '*.MP4', '*.mts', '*.MTS']);
  rsync.exclude('*');
  rsync.source(videoPaths);
  rsync.destination(createDateDirectory());

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
};
