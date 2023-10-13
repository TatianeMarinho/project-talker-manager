const router = require('express').Router();

const { readFile, newFile, findId, deleteFile } = require('../utils/utils');

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

router.get('/search/', validateToken, async (req, res) => {
  try {
    const searchTerm = req.query.q; 
    const personsTalker = await readFile();

    if (searchTerm) {
      const filtered = personsTalker.filter((person) => person.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));

      return res.status(200).json(filtered);
    } 
    return res.status(200).json(personsTalker);
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
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
      if (result < 0) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      } 
      talker[result] = { id: Number(id), name, age, talk };

      await newFile(talker);
      return res.status(200).json(talker[result]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.sqlMessage });
    }
  });

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const personsTalker = await readFile();

    const filteredPersons = personsTalker.filter((person) => person.id !== Number(id));
    console.log(filteredPersons);
    await deleteFile(filteredPersons);
    
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
});  

module.exports = router;