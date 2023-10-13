const router = require('express').Router();

const { readFile, newFile, findId } = require('../utils/utils');

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
    const result = findId(talker, id);
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
    try {
      const personsTalker = await readFile();

      const newId = personsTalker[personsTalker.length - 1].id + 1;

      const newPerson = { id: newId, ...req.body };

      await newFile(newPerson);

      return res.status(201).json(newPerson);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.sqlMessage });
    }
  }); 

router.put('/:id', validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const talker = await readFile();
      const result = findId(talker, id);
      if (!result) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      } 
      result.name = name;
      result.age = age;
      result.talk = talk;
      await newFile(result);
      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.sqlMessage });
    }
  });

module.exports = router;