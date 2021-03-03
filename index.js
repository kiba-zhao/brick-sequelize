/**
 * @fileOverview 模块包入口
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { SEQUELIZE } = require('./lib/constants');
const { model, sequelize } = require('./lib/utils');

exports.SEQUELIZE = SEQUELIZE;

exports.model = model;
exports.sequelize = sequelize;
