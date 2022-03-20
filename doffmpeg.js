import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export const doffmpeg = (inputVideo) => {
  const targetDir = process.env.CLOUD_DIR + today + '/';
  const baseFilename = path.parse(inputVideo).name;

  // check if directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  return new Promise((resolve, reject) => {
    ffmpeg(inputVideo)
      .outputOptions([
        `-c:v ${process.env.VIDEO_CODEC}`,
        `-crf ${process.env.CRF}`,
        `-preset ${process.env.PRESET}`,
        `-c:a ${process.env.AUDIO_CODEC}`,
        `-b:a ${process.env.AUDIO_BITRATE}`,
        '-tag:v hvc1', // apple-complient; https://trac.ffmpeg.org/wiki/Encode/H.265
      ])
      .save(targetDir + baseFilename + '.mp4')
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
