'use strict';

const router = require('express').Router();
const prefix = '/logs';
const token = require("../middleware/token");
const controller = require('../controllers/main.controller');
const seeder = require('../controllers/seeder.controller');

seeder.initSeeder();

router.get(`${prefix}/`,token, controller.all);
router.post(`${prefix}/`,token, controller.create);
router.get(`${prefix}/:id`,token, controller.info);
router.put(`${prefix}/:id`,token, controller.update);
router.delete(`${prefix}/:id`,token, controller.delete);

module.exports = router;
