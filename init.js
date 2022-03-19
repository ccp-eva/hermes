import chalk from 'chalk';
import { checkDirectories } from './checkDirectories.js';
import { pluralize } from './pluralize.js';

export const init = () => {
  console.clear();

  // iso 8601 date string without time (YYYY-MM-DD)
  global.today = new Date().toISOString().substring(0, 10);

  console.log(
    chalk.blue.bold('CCP Sambia Backup') +
      ` ${chalk.dim('— Today’s Timestamp: ' + today)}\n`
  );

  // run prechecks, get files and directories as in .env
  const {
    videoFolders,
    videoPaths,
    videoFiles,
    videoFilePaths,
    videoFilePathsTarget,
  } = checkDirectories();

  console.log(
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
    videoFilePathsTarget,
  };
};
