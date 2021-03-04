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

/**
 * sequelize连接注入可选项
 * @typedef {Object} SequelizeOpts
 * @property {String | Symbol} name 使用sequelize连接的名称
 * @property {String | Symbol} property 注入对象的属性
 * @property {String} model model函数声明的名称
 */

/**
 * sequelize声明函数
 * @param {Any} target 目标对象
 * @param {SequelizeOpts} opts 可选项
 * @return {Any} 目标对象
 */
function sequelize(target, opts) {
  const { property, name, model } = assign({ name: 'default' }, opts);
  assert(target !== undefined || target !== null, '[brick-sequelize] sequelize Error: wrong target');
  assert(name === undefined || isString(name) || isSymbol(property), '[brick-sequelize] sequelize Error: wrong opts.name');
  assert(isString(model), '[brick-sequelize] sequelize Error: wrong opts.model');

  const _property = property || model;
  assert(isString(_property) || isSymbol(_property), '[brick-sequelize] sequelize Error: wrong opts.property');


  return provide(target, { property: _property, dep: { id: SEQUELIZE, required: true, transform: transform.bind(this, { name, modelName: model }) } });
}

exports.sequelize = sequelize;

function transform(opts, clients) {
  const { name, modelName } = opts;
  const client = clients[name];
  if (!client.isDefined(modelName)) {

    const models = clients[MODEL];
    const model = models[modelName];
    if (isFunction(model)) {
      model(client, clients[SEQUELIZE]);
    } else {
      const { options, ...attributes } = model || {};
      client.define(modelName, attributes, options || {});
    }
  }
  return client.model(modelName);
}

/**
 * model结构定义可选项
 * @typedef {Object} ModelOpts
 * @property {String} model model结构的名称
 */

/**
 * model结构声明函数
 * @param {Any} target 目标对象
 * @param {ModelOpts} opts 可选项
 * @return {Any} 目标对象
 */
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
