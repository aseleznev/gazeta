export const appConfig = require('config.json')(process.env.NODE_ENV || 'sandbox');
// const appConfig = require('config.json')(__dirname + '/config.json', 'sandbox');
// console.log(process.env.NODE_ENV);
// console.log(appConfig.database.type);
// module.exports = appConfig;