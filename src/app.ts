import 'reflect-metadata';
import * as http from './IO/server';

(async () => {
    // const baseDir = __dirname;
    await http.init();
})();
