#!/usr/bin/env node

// import { welcome } from './welcome.js';
import { backup } from './backup.js';
import { doffmpeg } from './doffmpeg.js';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

console.clear();

// iso 8601 date string without time (YYYY-MM-DD)
global.today = new Date().toISOString().substring(0, 10);

const log = console.log;
log(chalk.blue.bold('CCP Backup & Video Compression'));

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
    console.log('Start Backup');

    await backup();

    console.log('Backup done!');
    console.log('Start Video Compression');
    await doffmpeg();
    console.log('Video Compression done!');
  }
}
