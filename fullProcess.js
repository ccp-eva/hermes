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

  // get target file paths and file names
  let videoFilePathsTarget = getVideoFilePathsTarget(
    process.env.TARGET_DIR + today
  );

  // today maybe later (add hh-mm timestamp on target folders)
  // console.log(videoFilePathsTarget);

  // let uniqueParents = videoFilePathsTarget.map((dir) =>
  //   dir.substr(0, dir.lastIndexOf('/'))
  // );
  // uniqueParents = [...new Set(uniqueParents)];

  // spinner.start({ text: 'Adding Timestamp...⏱️' });
  // uniqueParents.map((dir) => {
  //   fs.renameSync(dir, dir + '-' + time);
  // });
  // spinner.success({ text: 'Done 🎉' });

  // // get target file paths and file names
  // sleep();
  // console.log(uniqueParents);
  // // const uniqueParentsFiles = getVideoFilePathsTarget(uniqueParents);

  // // console.log(uniqueParentsFiles);

  console.log(chalk.dim('\n  === Cleaning SD Card'));
  for (const videoFolder of globals.videoPaths) {
    fs.rmSync(videoFolder, { recursive: true, force: true });
    console.log(chalk.green('✔') + ` Removing ${videoFolder} 🎉`);
  }

  console.log(
    chalk.dim('\n  === Compress videos from external drive to cloud')
  );

  const subSpinner = createSpinner();
  for (const [i, vid] of videoFilePathsTarget.entries()) {
    subSpinner.start({
      text: `Video ${i + 1} of ${videoFilePathsTarget.length} (Input: ${vid})`,
    });
    await doffmpeg(vid);
    subSpinner.success({
      text: `Video ${i + 1} of ${
        videoFilePathsTarget.length
      } 🎉 (Input: ${vid})`,
    });
  }
};
