import inquirer from 'inquirer';
import chalk from 'chalk';

export const welcome = () => {
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
  question1();

  function handleAnswer(response) {
    console.log(response);
    process.exit(0);
  }
};
