export function sequelize(target: any, opts: any): void;
export function model(target: any, opts: any): any;
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
