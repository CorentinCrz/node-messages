const express = require('express');
const router = express.Router();

import message from '../controllers/message';

router.get('/', message.get);
router.post('/', message.post);
router.delete('/:id', message.delete);
router.put('/:id', message.update);

module.exports = router;