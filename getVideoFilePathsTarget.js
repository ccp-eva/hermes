import { walkSync } from './walkSync.js';

export const getVideoFilePathsTarget = (parent) => {
  const videoFilePathsTarget = [];
  for (const filePath of walkSync(parent)) {
    videoFilePathsTarget.push(filePath);
  }

  return videoFilePathsTarget;
};
