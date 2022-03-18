#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
// import { welcome } from './welcome.js';
import { backup } from './backup.js';
import { doffmpeg } from './doffmpeg.js';

console.clear();

// iso 8601 date string without time (YYYY-MM-DD)
global.today = new Date().toISOString().substring(0, 10);

console.log(chalk.blue.bold('CCP Backup & Video Compression') + ` — ${today}`);

async function question1() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'question_1',
    message: 'What do want to do?\n',
    choices: ['Backup & Video Compression', 'Video Compression', 'Exit'],
  });

  return handleAnswer(answer.question_1);
}
await question1();

async function handleAnswer(response) {
  if (response === 'Backup & Video Compression') {
    const spinner = createSpinner();
    spinner.start({ text: 'Start Backup...💾' });
    await backup();
    spinner.success({ text: 'Backup Complete 🎉' });

    spinner.start({ text: 'Start ffmpeg...🎬' });
    await doffmpeg();
    spinner.success({ text: 'ffmpeg done 🎉' });
  }
}
