/**
 * @fileOverview 简单示例测试
 * @name simple.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');
const faker = require('faker');
const { Engine, provide } = require('brick-engine');
const { SEQUELIZE, sequelize } = require('..');

const APP_PATH = path.join(__dirname, 'fixtures', 'apps', 'simple');

describe('simple.test.js', () => {

  let engine;

  beforeAll(() => {
    engine = new Engine({ chdir: APP_PATH });
  });

  afterAll(() => {
    engine = undefined;
  });

  it('success', async () => {

    const module = {};
    sequelize(module, { model: 'Simple' });
    provide(module, { property: 'conn', dep: { id: SEQUELIZE, transform: _ => _.default } });

    engine.init();
    engine.model({ model: module, module });

    await module.conn.authenticate();

    const record = { id: faker.random.uuid(), name: faker.random.word() };
    console.log(111, record);
    await module.Simple.drop();
    await module.Simple.sync();
    await module.Simple.create(record);
    const res = await module.Simple.findOne({ where: { id: record.id } });

    expect(res.toJSON()).toEqual(record);
    await module.conn.close();

  });
});

