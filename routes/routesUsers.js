const router = require('express').Router();
const { findAll, findById, register, updateById, verifyToken, deleteById, login } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/searchUser:id', verifyToken, findById);
router.get('/searchAllUser', verifyToken, findAll);
router.put('/:id', verifyToken, updateById);
router.delete('/:id', verifyToken, deleteById);

module.exports = router;
