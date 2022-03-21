import fs from 'fs';
import { walkSync } from './walkSync.js';

export const parityCheck = () => {
  const targetFilePaths = [];
  for (const filePath of walkSync(process.env.TARGET_DIR)) {
    targetFilePaths.push(filePath);
  }

  const cloudFilePaths = [];
  for (const filePath of walkSync(process.env.CLOUD_DIR)) {
    cloudFilePaths.push(filePath);
  }

  let targetInventory = targetFilePaths.map((i) =>
    i.replace(process.env.TARGET_DIR, '')
  );

  let cloudInventory = cloudFilePaths.map((i) =>
    i.replace(process.env.CLOUD_DIR, '')
  );

  // filter out residual files (e.g., DS_STORE et al.)
  // specifically we only look for mp4/MTS extensions!
  targetInventory = targetInventory.filter(
    (i) =>
      i.includes('.mp4') ||
      i.includes('.MP4') ||
      i.includes('.MTS') ||
      i.includes('.mts')
  );
  cloudInventory = cloudInventory.filter(
    (i) =>
      i.includes('.mp4') ||
      i.includes('.MP4') ||
      i.includes('.MTS') ||
      i.includes('.mts')
  );

  const targetInventoryLower = targetInventory.map((i) => i.toLowerCase());
  const cloudInventoryLower = cloudInventory.map((i) => i.toLowerCase());

  // https://stackoverflow.com/a/33034768/2258480
  const missingCloudFiles = targetInventoryLower.filter(
    (i) => !cloudInventoryLower.includes(i)
  );

  try {
    fs.writeFileSync(
      'inventory.json',
      JSON.stringify({ target: targetInventory, cloud: cloudInventory })
    );
    console.log('inventory.json written');
  } catch (err) {
    console.log(err, 'An error occured while writing JSON Object to File.');
  }

  return missingCloudFiles;
};
