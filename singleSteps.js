import fs from 'fs';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { backup } from './backup.js';
import { doffmpeg } from './doffmpeg.js';
import { walkSync } from './walkSync.js';

export const singleBackup = async () => {
  const spinner = createSpinner();
  console.log(chalk.dim('\n  === Backup files from SD card to external drive'));

  spinner.start({ text: 'Start Backup...💾' });
  await backup(globals.videoPaths);
  spinner.success({ text: 'Backup Complete 🎉' });
};

export const singleCleanSource = async () => {
  console.log(chalk.dim('\n  === Cleaning SD Card'));
  for (const videoFolder of globals.videoPaths) {
    fs.rmSync(videoFolder, { recursive: true, force: true });
    console.log(chalk.green('✔') + ` Removing ${videoFolder} 🎉`);
  }
};

export const singleVideoCompression = async () => {
  // read inventory.json from disk
  const { missingCloudFiles } = JSON.parse(
    fs.readFileSync('missingcloudfiles.json')
  );

  console.log(missingCloudFiles);

  const subSpinner = createSpinner();
  for (const [i, vid] of missingCloudFiles.entries()) {
    subSpinner.start({
      text: `Video ${i + 1} of ${missingCloudFiles.length}`,
    });
    await doffmpeg(vid);
    subSpinner.success({
      text: `Video ${i + 1} of ${missingCloudFiles.length} 🎉`,
    });
  }
};
