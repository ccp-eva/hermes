import path from 'path';

export const sourceToTargetFilePaths = (sourceFilePaths) => {
  const targetFilePaths = [];

  sourceFilePaths.forEach((sourceFilePath) => {
    const targetFilePath =
      process.env.TARGET_DIR +
      today +
      '/' +
      path.parse(sourceFilePath).dir.split('/').pop() +
      '/' +
      path.parse(sourceFilePath).base;
    targetFilePaths.push(targetFilePath);
  });

  return targetFilePaths;
};
