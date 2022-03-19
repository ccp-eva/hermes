#!/usr/bin/env node

import inquirer from 'inquirer';
import { init } from './init.js';
import { fullProcess } from './fullProcess.js';

global.globals = init();

const mainChoices = [
  'Backup, Clean Source Directory, Video Compression',
  '  Single Steps',
  'Parity Check (Target and Cloud)',
  'Upload Parity List',
  'Update Script',
  'Exit',
];

async function mainQuestion() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'mainQuestion',
    message: 'What do want to do?',
    choices: mainChoices,
  });

  return handleAnswer(answer.mainQuestion);
}
await mainQuestion();

async function singleSteps() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'singleSteps',
    message: 'Every operation can be executed in a single step. Which one?',
    choices: [
      'Backup',
      'Clean source directory (removes *BPHH* folders on SD Card)',
      'Video Compression (only if target folder contains videos which are not present in cloud)',
      'Exit',
    ],
  });

  return handleAnswer(answer.singleSteps);
}

async function handleAnswer(response) {
  if (response === mainChoices[0]) {
    await fullProcess();
  }

  if (response === mainChoices[1]) {
    await singleSteps();
  }
}
