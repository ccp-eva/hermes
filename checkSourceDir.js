import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import 'dotenv/config';

export const checkSourceDir = () => {
  if (!fs.existsSync(process.env.SOURCE_DIR)) {
    console.error(
      `${chalk.white.bgRed.bold('I cannot find the directory:')} ${
        process.env.SOURCE_DIR
      }
    
    ${chalk.bold('Is the SD card mounted?')}
    `
    );

    process.exit(0);
  }

  // get all video folder matching the pattern defined in .env
  const videoFolders = fs
    .readdirSync(process.env.SOURCE_DIR)
    .filter((i) => i.includes(process.env.VIDEO_DIR_PATTERN));

  if (videoFolders.length === 0) {
    console.error(
      `I cannot find any directories containing: '${
        process.env.VIDEO_DIR_PATTERN
      }' at ${process.env.SOURCE_DIR}
    
    ${chalk.bold('Is your SD card empty?')}

    ${chalk.bold(
      'Check if the pattern on your SD card matches the one defined in .env'
    )}
    `
    );

    process.exit(0);
  }

  const videoPaths = videoFolders.map((i) => process.env.SOURCE_DIR + i);

  const videoFilePaths = [];
  const videoFiles = [];
  videoPaths.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => {
      videoFiles.push(file);
      videoFilePaths.push(dir + '/' + file);
    });
  });

  return {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
  };
};
