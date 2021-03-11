/**
 * sequelize连接注入可选项
 */
export type SequelizeOpts = {
    /**
     * 使用sequelize连接的名称
     */
    name: string | Symbol;
    /**
     * 注入对象的属性
     */
    property: string | Symbol;
    /**
     * model函数声明的名称
     */
    model: string;
};
/**
 * model结构定义可选项
 */
export type ModelOpts = {
    /**
     * model结构的名称
     */
    model: string;
};
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
export function sequelize(target: any, opts: SequelizeOpts): any;
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
export function model(target: any, opts: ModelOpts): any;
export function getEnv(env: any, defaultVal: any): any;
export function dsnGen(dsn: any): {
    host?: undefined;
    port?: undefined;
    username?: undefined;
    password?: undefined;
    database?: undefined;
} | {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
};
