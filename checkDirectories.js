import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import 'dotenv/config';

export const checkDirectories = () => {
  if (!fs.existsSync(process.env.SOURCE_DIR)) {
    console.error(
      `${chalk.white.bgRed.bold('I cannot find the directory:')} ${
        process.env.SOURCE_DIR
      }
    
    ${chalk.bold('Is the SD card mounted?\n')}
    
    ${chalk.bold('Is the path correct in .env?')}
    `
    );

    process.exit(0);
  }

  // get all sub directories in source
  const subSourceDirs = fs
    .readdirSync(process.env.SOURCE_DIR, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .map((dir) => process.env.SOURCE_DIR + dir + '/');

  // search for DCIM folders within subSourceDirs
  let dcimDir = [];
  subSourceDirs.forEach((dir) => {
    if (fs.existsSync(dir + 'DCIM/')) {
      dcimDir.push(dir + 'DCIM/');
    }
  });

  // if there are multiple folders report a warning
  if (dcimDir.length > 1) {
    console.error(
      chalk.yellow.bold('WARNING\n\n') +
        'Multiple DCIM folders found! ' +
        'There are too many drives connected to the computer.\n' +
        'Please connect ' +
        chalk.bold('only one drive containing your video files.') +
        '\n'
    );
    process.exit(0);
  }

  dcimDir = dcimDir[0];

  if (!fs.existsSync(process.env.TARGET_DIR)) {
    console.error(
      `${chalk.white.bgRed.bold('I cannot find the directory:')} ${
        process.env.TARGET_DIR
      }
    
    ${chalk.bold('Is the external hard drived mounted?\n')}
    
    ${chalk.bold('Is the path correct in .env?')}
    `
    );

    process.exit(0);
  }

  if (!fs.existsSync(process.env.CLOUD_DIR)) {
    console.error(
      `${chalk.white.bgRed.bold('I cannot find the directory:')} ${
        process.env.CLOUD_DIR
      }
    
    ${chalk.bold('Is the path correct in .env?')}
    `
    );

    process.exit(0);
  }

  // get all video folder matching the pattern defined in .env
  const videoFolders = fs
    .readdirSync(dcimDir)
    .filter((i) => i.includes(process.env.VIDEO_DIR_PATTERN));

  if (videoFolders.length === 0) {
    console.error(
      `I cannot find any directories containing: '${
        process.env.VIDEO_DIR_PATTERN
      }' at ${dcimDir}
    
    ${chalk.bold('Is your SD card empty?')}

    ${chalk.bold(
      'Check if the pattern on your SD card matches the one defined in .env'
    )}
    `
    );

    process.exit(0);
  }

  const videoPaths = videoFolders.map((i) => dcimDir + i);

  const videoFilePaths = [];
  const videoFiles = [];
  videoPaths.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => {
      videoFiles.push(file);
      videoFilePaths.push(dir + '/' + file);
    });
  });

  // anticipate target file paths
  const videoFilePathsTarget = [];
  videoFilePaths.forEach((file) => {
    videoFilePathsTarget.push(
      file.replace(process.env.SOURCE_DIR, process.env.TARGET_DIR + today + '/')
    );
  });

  return {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
    videoFilePathsTarget,
  };
};
