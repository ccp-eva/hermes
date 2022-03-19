import fs from 'fs';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { backup } from './backup.js';
import { getVideoFilePathsTarget } from './getVideoFilePathsTarget.js';
import { doffmpeg } from './doffmpeg.js';

export const fullProcess = async () => {
  const spinner = createSpinner();

  console.log(chalk.dim('\n  === Backup files from SD card to external drive'));

  spinner.start({ text: 'Start Backup...💾' });
  await backup(globals.videoPaths);
  spinner.success({ text: 'Backup Complete 🎉' });

  console.log(chalk.dim('\n  === Cleaning SD Card'));
  for (const videoFolder of globals.videoPaths) {
    console.log(chalk.green('✔') + ` Removing ${videoFolder}`);
    fs.rmSync(videoFolder, { recursive: true, force: true });
  }

  console.log(
    chalk.dim('\n  === Compress videos from external drive to cloud')
  );

  // get target file paths and file names
  const videoFilePathsTarget = getVideoFilePathsTarget(
    process.env.TARGET_DIR + today + '/'
  );

  const subSpinner = createSpinner();
  for (const [i, vid] of videoFilePathsTarget.entries()) {
    subSpinner.start({
      text: `Video ${i + 1} of ${videoFilePathsTarget.length}`,
    });
    await doffmpeg(vid);
    subSpinner.success({
      text: `Video ${i + 1} of ${videoFilePathsTarget.length} 🎉`,
    });
  }
};
