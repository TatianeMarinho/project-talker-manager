const router = require('express').Router();

const { readFile } = require('../db/talkerDB');

router.get('/', async (_req, res) => {
  try {
    const talker = await readFile();
    return res.status(200).json(talker);
  } catch (err) {
    return res.status(200).json([]);
  }
});

module.exports = router;