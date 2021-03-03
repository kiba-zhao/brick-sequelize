/**
 * @fileOverview 生产配置
 * @name prod.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { getEnv, dsnGen } = require('../lib/utils');

const SEMICOLON = ';';

module.exports = (env) => {

  const exports = {};

  const DB_READ_DSN = getEnv(env.DB_READ_DSN);
  const DB_WRITE_DSN = getEnv(env.DB_WRITE_DSN);
  const DB_DSN = getEnv(env.DB_DSN);
  const pool_max = parseInt(getEnv(env.DB_POOL_MAX, 5));
  if (DB_READ_DSN || DB_WRITE_DSN) {
    exports.sequelize = {
      clients: {
        default: {
          replication: {
            read: DB_READ_DSN ? DB_READ_DSN.split(SEMICOLON).map(dsnGen) : dsnGen(DB_DSN),
            write: dsnGen(DB_WRITE_DSN || DB_DSN),
          },
          pool: {
            max: isNaN(pool_max) ? 5 : pool_max,
          },
        }
      }
    };

  } else {
    exports.sequelize = {
      clients: {
        default: {
          ...dsnGen(env.DB_DSN),
          pool: {
            max: isNaN(pool_max) ? 5 : pool_max,
          }
        }
      }
    };
  }

  return exports;
};

exports[SEQUELIZE] = {
  clients: {
    default: {}
  }
};
