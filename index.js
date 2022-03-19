#!/usr/bin/env node

import inquirer from 'inquirer';
import { init } from './init.js';
import { fullProcess } from './fullProcess.js';

global.globals = init();

const choices = [
  'Backup, Clean Source Directory, Video Compression',
  '  Single Steps (Backup Clean Source Directory (SD Card), Video Compression (if Target contains videos not in Cloud)',
  'Parity Check (Target and Cloud)',
  'Upload Parity List',
  'Update Script',
  'Exit',
];

async function question() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'question',
    message: 'What do want to do?\n',
    choices,
  });

  return handleAnswer(answer.question);
}
await question();

async function handleAnswer(response) {
  if (response === choices[0]) {
    await fullProcess();
  }
}
