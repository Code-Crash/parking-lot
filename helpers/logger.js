'use strict';

/**
 * @author code-crash
 * @description This file is help to maintain the history of commands, activity, and errors by using file system
 */

const fs = require('fs');
const config = require('../config');

class Logger {

    /**
     * @description File writer, which will write the text into the file
     * @param {*} type 
     * @param {*} text 
     */
    static file(type, text) {
        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }
        if (type === 'info') {
            fs.appendFile(__dirname + '/../logs/info.log', text + '\n', function (error) { if (error) { console.log(error); } });
        } else {
            fs.appendFile(__dirname + '/../logs/error.log', text + '\n', function (error) { if (error) { console.log(error); } });
        }
    }

    /**
     * @description This will write the text into the file and will show on console if console is enabled
     * @param {*} text 
     */
    static info(text) {
        text = 'info ' + new Date().getTime() + ': ' + text;
        if (config.enabler.CONSOLE) {
            console.log(text);
        }
        Logger.file('info', text);
    }

    /**
     * @description This will write the text into the file and will show on console if console is enabled
     * @param {*} text 
     */
    static error(text) {
        text = 'error ' + new Date().getTime() + ': ' + text;
        if (config.enabler.CONSOLE) {
            console.error(text);
        }
        Logger.file('error', text);
    }

}

module.exports = Logger;