const router = require('express').Router();

const { readFile, writeFile } = require('../utils/utils');

const {
  validateToken, validateName,
  validateAge, validateTalk,
  validateWatchedAt, validateRate,
} = require('../middlewares/validatesNewPerson');

router.get('/', async (_req, res) => {
  try {
    const talker = await readFile();
    return res.status(200).json(talker);
  } catch (err) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await readFile();
    const result = talker.find((element) => element.id === Number(id));
    if (result) {
      return res.status(200).json(result);
    } 
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

router.post('/',
  validateToken, validateName,
  validateAge, validateTalk,
  validateWatchedAt, validateRate,
  async (req, res) => {
    const personsTalker = await readFile();

    const newPerson = { id: personsTalker.length + 1, ...req.body };

    await writeFile(personsTalker, newPerson);

    res.status(201).json(newPerson);
  }); 

module.exports = router;