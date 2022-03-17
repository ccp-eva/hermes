import 'dotenv/config';
import Rsync from 'rsync';
import fs from 'fs';
import { createDateDirectory } from './createDateDir.js';

export const backup = async () => {
  const targetPath = createDateDirectory();

  const rsync = new Rsync()
    // The -a flag means "archive" to say we are copying the full directory not just a file
    .flags('a')
    .source(process.env.SOURCE_DIR)
    .destination(targetPath);

  const startSync = () => {
    rsync.execute((error, code, cmd) => {
      // List of rsync status codes
      // https://stackoverflow.com/a/20738063
      console.log('backup completed with status code: ' + code);
    });
  };

  // Begin sync
  startSync();
};
