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

    //  ffmpeg -i out-25.mp4 -c:v libx265 -an -x265-params crf=38 output-h265-38.mp4
    // ffmpeg -i Azibo\ 22_06.MTS -c:v libx265 -crf 38 -preset fast -c:a aac -b:a 128k output-265-crf-38a.mp4

    ffmpeg(sourceDir + 'Azibo22_06.MTS')
      .outputOptions([
        `-c:v ${process.env.VIDEO_CODEC}`,
        `-crf ${process.env.CRF}`,
        `-preset ${process.env.PRESET}`,
        `-c:a ${process.env.AUDIO_CODEC}`,
        `-b:a ${process.env.AUDIO_BITRATE}`,
        '-tag:v hvc1', // apple-complient; https://trac.ffmpeg.org/wiki/Encode/H.265
      ])
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
