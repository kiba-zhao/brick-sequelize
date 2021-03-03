/**
 * @fileOverview 工具类代码
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { assign, isFunction, isString, isSymbol } = require('lodash');
const { provide } = require('brick-engine');
const { SEQUELIZE, MODEL } = require('./constants');

function sequelize(target, opts) {
  const { property, name, model } = assign({ property: 'model', name: 'default' }, opts);
  assert(target !== undefined || target !== null, '[brick-sequelize] sequelize Error: wrong target');
  assert(name === undefined || isString(name) || isSymbol(property), '[brick-sequelize] sequelize Error: wrong opts.name');
  assert(isString(property) || isSymbol(property), '[brick-sequelize] sequelize Error: wrong opts.property');
  assert(isString(model), '[brick-sequelize] sequelize Error: wrong opts.model');

  return provide(target, { property, dep: { id: SEQUELIZE, required: true, transform: transform.bind(this, { name, modelName: model }) } });
}

exports.sequelize = sequelize;

function transform(opts, clients) {
  const { name, modelName } = opts;
  const client = clients[name];
  if (!client.isDefined(modelName)) {

    const models = clients[MODEL];
    const model = models[modelName];
    if (isFunction(model)) {
      model(client);
    } else {
      const { options, ...attributes } = model || {};
      client.define(modelName, attributes, options || {});
    }
  }
  return client.model(modelName);
}

function model(target, opts) {

  const { model } = assign({}, opts);
  assert(target !== undefined || target !== null, '[brick-sequelize] model Error: wrong target');
  assert(isString(model), '[brick-sequelize] model Error: wrong opts.model');
  assert(target[MODEL] === undefined, '[brick-sequelize] model Error: duplicate');

  target[MODEL] = model;
  return target;
}

exports.model = model;

function getEnv(env, defaultVal) {
  return env && env.length > 0 ? env : defaultVal;
}

exports.getEnv = getEnv;

function dsnGen(dsn) {
  if (!dsn) { return {}; }
  const {
    hostname, port, username
    , password, pathname,
  } = new URL(dsn);
  return { host: hostname, port, username, password, database: pathname.substr(1) };
}

exports.dsnGen = dsnGen;

