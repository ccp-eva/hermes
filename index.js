#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
// import { welcome } from './welcome.js';
import { backup } from './backup.js';
import { doffmpeg } from './doffmpeg.js';
import { checkDirectories } from './checkDirectories.js';

console.clear();

// iso 8601 date string without time (YYYY-MM-DD)
global.today = new Date().toISOString().substring(0, 10);

console.log(
  chalk.blue.bold('CCP Backup & Video Compression') +
    ` ${chalk.dim('— Today’s Timestamp: ' + today)}`
);

// run prechecks and get source directory as in .env
const directoryCollection = checkDirectories();

createSpinner().success({ text: 'Source directory found!' });
createSpinner().success({ text: 'Target directory found!' });

console.log(
  '\n',
  chalk.dim(
    'Found Video folders at source location:',
    directoryCollection.videoFolders.length,
    directoryCollection.videoFolders,
    '\n',
    'Folders contain: ' + directoryCollection.videoFiles.length + ' videos.'
  ),
  '\n\n'
);

async function question1() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'question_1',
    message: 'What do want to do next?\n',
    choices: ['Backup & Video Compression', 'Video Compression', 'Exit'],
  });

  return handleAnswer(answer.question_1);
}
await question1();

async function handleAnswer(response) {
  if (response === 'Backup & Video Compression') {
    const spinner = createSpinner();

    spinner.start({ text: 'Start Backup...💾' });
    await backup(directoryCollection.videoPaths);
    spinner.success({ text: 'Backup Complete 🎉' });

    const subSpinner = createSpinner();
    for (const [i, vid] of directoryCollection.videoFilePathsTarget.entries()) {
      subSpinner.start({
        text: `Video ${i + 1} of ${
          directoryCollection.videoFilePathsTarget.length
        }`,
      });
      await doffmpeg(vid);
      subSpinner.success({ text: 'Done' });
    }
  }
}
