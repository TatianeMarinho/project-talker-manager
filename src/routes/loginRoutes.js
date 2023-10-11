const router = require('express').Router();

const { newToken } = require('../utils/utils');

router.post('/', (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const token = newToken();
      return res.status(200).json({ token });
    } 
    return res.status(400).json({ message: 'email e password são obrigatórios' });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;