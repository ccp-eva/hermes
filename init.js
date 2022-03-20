import chalk from 'chalk';
import { checkDirectories } from './checkDirectories.js';
import { pluralize } from './pluralize.js';

export const init = () => {
  console.clear();

  // iso 8601 date string without time (YYYY-MM-DD)
  global.today = new Date().toISOString().substring(0, 10);

  console.log(
    chalk.blue.bold('🌬 CCP Hermes Backup') +
      ' — ' +
      chalk.greenBright('Zambia Branch') +
      ' — ' +
      ` ${chalk.dim('Today’s Timestamp: ' + today)}\n`
  );

  // run prechecks, get files and directories as in .env
  const {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
    dcimDirPath,
    sourceIsEmpty,
  } = checkDirectories();

  sourceIsEmpty
    ? console.log(
        `${chalk.bold.greenBright(
          '    You can still perform a target/cloud parity check and video compression tasks.\n'
        )}`
      )
    : console.log(
        chalk.dim(
          `✔ All directories set! Found ${pluralize(
            videoFolders.length,
            'folder'
          )} at source location → ${videoFolders}
  containing a total of ${pluralize(videoFiles.length, 'video')}.\n`
        )
      );

  return {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
    dcimDirPath,
    sourceIsEmpty,
  };
};
