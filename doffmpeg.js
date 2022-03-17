import 'dotenv/config';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

export const doffmpeg = () => {
  const sourceDir = process.env.TARGET_DIR + today + '/';
  const targetDir = process.env.CLOUD_DIR + today + '/';

  // check if directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  const videos = [sourceDir + 'Azibo22_06.MTS'];

  return new Promise((resolve, reject) => {
    // target dir becomes source dir for ffmpeg

    ffmpeg(sourceDir + 'Azibo22_06.MTS')
      .outputOptions(['-an'])
      .save(targetDir + 'out.mp4')
      .on('start', function (ffmpegCommand) {
        // console.log('Start', ffmpegCommand);
      })
      .on('progress', function (data) {})
      .on('err', (err) => {
        return reject(err);
      })
      .on('end', (fim) => {
        return resolve();
      });
  });
};
