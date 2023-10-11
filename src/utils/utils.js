const fs = require('fs').promises;
const crypto = require('crypto');

const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

const newToken = () => crypto.randomBytes(8).toString('hex');

const writeFile = async (talker) => {
  const insert = JSON.stringify(talker, null, 2);
  await fs.writeFile(talkerPath, insert);
};

module.exports = {
  readFile,
  newToken,
  writeFile,
};