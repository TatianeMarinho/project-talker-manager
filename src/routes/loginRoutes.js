const router = require('express').Router();

const { validateEmail, validadePassword } = require('../middlewares/validateLogin');
const { newToken } = require('../utils/utils');

router.post('/', validateEmail, validadePassword, (_req, res) => {
  try {
    const token = newToken();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;