const fs = require('fs').promises;

const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

const newToken = () => {
  let token = '';

  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    token += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  return { token: `${token}` };
};

const newFile = async (talker) => {
  try {
    const personsTalker = await readFile();
    const allPersons = [...personsTalker, talker];
    await fs.writeFile(talkerPath, JSON.stringify(allPersons, null, 2));
  } catch (err) {
    return err.message;
  }
};

const findId = (array, id) => {
  const result = array.findIndex((element) => element.id === Number(id));

  return result;
};

module.exports = {
  readFile,
  newToken,
  newFile,
  findId,
};