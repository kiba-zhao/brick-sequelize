/**
 * @fileOverview 应用入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const sequelize = require('sequelize');
const { inject, ENGINE } = require('brick-engine');
const { SEQUELIZE, MODEL } = require('./lib/constants');

module.exports = engine => {
  engine.install(factory);
};

function factory(engine) {

  const { patterns, opts, clients: clientConfig } = engine.config.sequelize || {};
  const model = {};
  if (patterns) {
    const targets = engine.load(patterns, opts);
    for (const target of targets) {
      const name = target.module[MODEL];
      if (name) {
        model[name] = target.module;
      }
    }
  }

  const keys = Reflect.ownKeys(clientConfig || {});
  const clients = { [SEQUELIZE]: sequelize, [MODEL]: model };
  if (keys.length > 0) {
    for (const key of keys) {
      const opts = clientConfig[key];
      clients[key] = new sequelize.Sequelize(opts);
    }
  }
  return clients;

}

inject(factory, { name: SEQUELIZE, deps: [ ENGINE ] });
