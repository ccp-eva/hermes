import 'dotenv/config';
import ffmpeg from 'fluent-ffmpeg';
import { createSpinner } from 'nanospinner';
import fs from 'fs';

export const doffmpeg = () => {
  return new Promise((resolve, reject) => {
    // target dir becomes source dir for ffmpeg
    const sourceDir = process.env.TARGET_DIR + today + '/';
    const targetDir = process.env.CLOUD_DIR + today + '/';

    // check if directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    const proc = new ffmpeg();
    const spinner = createSpinner();

    resolve(
      proc
        .input(sourceDir + 'Azibo22_06.MTS')
        .on('start', function (ffmpegCommand) {
          console.log('Start', ffmpegCommand);
        })
        .on('progress', function (data) {
          spinner.start({ text: 'Converting Video 🎬 ... Please wait!' });
        })
        .on('end', function () {
          spinner.success({ text: 'Video converted! 🎉' });
        })
        .on('error', function (error) {
          console.log('Error', error);
        })
        .outputOptions(['-an'])
        .output(targetDir + 'out.mp4')
        .run()
    );
  });
};
