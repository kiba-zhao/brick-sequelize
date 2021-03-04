/**
 * @fileOverview 示例模型
 * @name simple.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { model } = require('../../../../..');

module.exports = (client, { DataTypes }) => {
  client.define('Simple',
    {
      id: { allowNull: false, type: DataTypes.STRING(36), unique: true, primaryKey: true },
      name: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
};

model(module.exports, { model: 'Simple' });
