const router = require('express').Router();

const { readFile } = require('../utils/utils');

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

module.exports = router;