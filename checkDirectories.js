import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

export const checkDirectories = () => {
  let sourceIsEmpty = false;

  if (!fs.existsSync(process.env.SOURCE_DIR)) {
    console.error(
      chalk.yellow.bold('WARNING — NO SD CARD\n\n') +
        'Cannot find ' +
        process.env.SOURCE_DIR +
        '\n\n' +
        chalk.bold('    Is the SD card mounted?\n\n') +
        chalk.dim('    Is the path correct in .env?\n')
    );

    sourceIsEmpty = true;
  }

  let subSourceDirs = null;
  let dcimDirPath = null;
  if (!sourceIsEmpty) {
    // get all sub directories in source
    subSourceDirs = fs
      .readdirSync(process.env.SOURCE_DIR, {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .map((dir) => process.env.SOURCE_DIR + dir + '/');

    // search for DCIM folders within subSourceDirs
    dcimDirPath = [];
    subSourceDirs.forEach((dir) => {
      if (fs.existsSync(dir + 'DCIM/')) {
        dcimDirPath.push(dir + 'DCIM/');
      }
    });

    // if there are multiple folders report a warning
    if (dcimDirPath.length > 1) {
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

    dcimDirPath = dcimDirPath[0];
  }

  if (!fs.existsSync(process.env.TARGET_DIR)) {
    console.error(
      chalk.yellow.bold('WARNING\n\n') +
        `${chalk.white.bgRed.bold('Cannot find the directory:')} ${
          process.env.TARGET_DIR
        }
    
    ${chalk.bold('Is the external hard drived mounted?\n')}
    
    ${chalk.dim('Is the path correct in .env?')}
    `
    );

    process.exit(0);
  }

  if (!fs.existsSync(process.env.CLOUD_DIR)) {
    console.error(
      `${chalk.white.bgRed.bold('I cannot find the directory:')} ${
        process.env.CLOUD_DIR
      }
    
    ${chalk.dim('Is the path correct in .env?')}
    `
    );

    process.exit(0);
  }

  // get all video folder matching the pattern defined in .env
  // ... if sd card path was found earlier
  let videoFolders = null;
  let videoFiles = null;
  let videoFilePaths = null;
  let videoPaths = null;
  if (!sourceIsEmpty) {
    videoFolders = fs
      .readdirSync(dcimDirPath)
      .filter((i) => i.includes(process.env.VIDEO_DIR_PATTERN));

    if (videoFolders.length === 0) {
      console.error(
        chalk.yellow.bold('WARNING — SD CARD EMPTY\n\n') +
          `Cannot find any directories containing: '${
            process.env.VIDEO_DIR_PATTERN
          }' at ${dcimDirPath}
    
    ${chalk.bold('Is your SD card empty?')}

    ${chalk.dim(
      'Check if the pattern on your SD card matches the one defined in .env'
    )}
    `
      );

      sourceIsEmpty = true;
    }

    videoPaths = videoFolders.map((i) => dcimDirPath + i);

    videoFilePaths = [];
    videoFiles = [];
    videoPaths.forEach((dir) => {
      fs.readdirSync(dir).forEach((file) => {
        videoFiles.push(file);
        videoFilePaths.push(dir + '/' + file);
      });
    });

    // make sure only mp4 files are included
    videoFiles = videoFiles.filter(
      (file) => path.extname(file).toLowerCase() === '.mp4'
    );
    // make sure only mp4 files are included
    videoFilePaths = videoFilePaths.filter(
      (file) => path.extname(file).toLowerCase() === '.mp4'
    );
  }

  return {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
    dcimDirPath,
    sourceIsEmpty,
  };
};
