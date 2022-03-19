import fs from 'fs';
import path from 'path';
import 'dotenv/config';

export const getVideoFilePathsTarget = (parent) => {
  function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        yield* walkSync(path.join(dir, file.name));
      } else {
        yield path.join(dir, file.name);
      }
    }
  }

  const videoFilePathsTarget = [];
  for (const filePath of walkSync(parent)) {
    videoFilePathsTarget.push(filePath);
  }

  return videoFilePathsTarget;
};
