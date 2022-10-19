const router = require('express').Router();
const { getUserInfo, patchUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', patchUserInfo);

module.exports = router;
