# brick-sequelize #
[brick-engine](https://github.com/kiba-zhao/brick-engine)的[sequelize](https://sequelize.org/)插件模块.

## Install ##

``` shell
npm install brick-sequelize
```

## Configuration ##

**添加插件设置**

``` javascript
// {cwd}/plugin.js
// {cwd}/node_modules/{xxx engine}/plugin.js

exports.sequelize = {
    package:brick-sequelize'
}
```

**在配置文件中定义参数**

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/config/*.js

//简单配置
exports.sequelize = {
  // model定义文件匹配规则
  patterns: 'sequelize/**/*.js',
  // model定义文件加载可选项
  opts:{},
  // sequelize构建参数
  clients: {
    default: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'simple',
    },
    local: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'simple',
    },
  },
};
```

## Usage ##

**使用模型示例**

``` javascript
const {sequelize} = require('brick-sequelize');

class Simple{
  async search(){
    await this.Simple.findOne(...);
    await this.LocalSimple.findOne(...);
  }
}

module.exports = Simple;

// 同等于 this.Simple = clients.default.model('Simple');
sequelize(Simple,{model:'Simple'});

// 同等于 this.LocalSimple = clients.local.model('Simple');
sequelize(Simple,{property:'LocalSimple',name:'local',model:'Simple'});
```

**定义结构示例**

``` javascript
const {model} = require('brick-sequelize');

module.exports = (client, { DataTypes }) => {
  client.define('Simple',
    {
      id: { allowNull: false, type: DataTypes.STRING(36), unique: true, primaryKey: true },
      name: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
};

// model为模型名称，与使用时候sequelize函数的model一致
model(module.exports, { model: 'Simple' });

```
## Documentations ##
使用`jsdoc`生成注释文档

``` shell
git clone https://github.com/kiba-zhao/brick-sequelize.git
cd brick-sequelize
npm install
npm run docs
open docs/index.html
```
n
## License ##
[MIT](LICENSE)


