'use strict';

/**
 * @author code-crash
 * @description This file will be responsible for handling the input from user with file or command reader
 */

const manager = require('./controllers');
const logger = require('./helpers/logger');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @description Available Commands
 */
const COMMANDS = [
    {
        name: 'Create Parking Lot',
        format: 'create_parking_lot {size:number}',
        note: 'This will allocate a total size to your parking lot.'
    }, {
        name: 'Check Parking Lot Status',
        format: 'status',
        note: 'Show vehicles in table format.'
    }, {
        name: 'Park a Vehicle',
        format: 'park {vehicle_number:string} {color:string} {type:string}',
        note: 'Your vehicle type should be in allowed vehicle types in parking lot.'
    }, {
        name: 'Remove a Vehicle From Parking lot',
        format: 'leave {vehicle_number:string} {hours:number}',
        note: 'Parked vehicle with given number will be removed from parking lot and charge will be shown to user.'
    }, {
        name: 'Exit/Terminate Parking Lot Command Reader',
        format: 'exit',
        note: 'This command will close the Command Reader, but you can find the activity logs in logs folder with specific file'
    },
];

/**
 * @description This function will be our command processor function, 
 *              which can be execute form command reader or file processor
 * 
 * @param {*} command 
 */
const CommandProcessor = (command) => {
    command = command.split(" "); // Get Command Arguments
    logger.info(`User trying to execute the command: ${command.join(' ')}`);
    switch (command[0]) {
        case 'help':
            console.table(COMMANDS);
            break;
        case 'create_parking_lot':
            try {
                const result = manager.allocate(command[1]);
                console.log(result);
            } catch (error) {
                logger.error(error);
                console.log(error);
            }
            break;
        case 'status':
            try {
                const result = manager.status();
                console.table(result);
            } catch (error) {
                logger.error(error);
                console.log(error);
            }
            break;
        case 'park':
            try {
                if (command.length < 4) {
                    logger.error('You entered wrong format, command is: park {vehicle_number:string} {color:string} {type:string}');
                    console.log('You entered wrong format, command is: park {vehicle_number:string} {color:string} {type:string}');
                    return;
                }
                const result = manager.park({ number: command[1].trim(), color: command[2].trim(), type: command[3].trim() });
                console.log(result);
            } catch (error) {
                logger.error(error);
                console.log(error);
            }
            break;
        case 'leave':
            try {
                if (command.length < 3) {
                    logger.error('You entered wrong format, command is: leave {vehicle_number:string} {hours:number}');
                    console.log('You entered wrong format, command is: leave {vehicle_number:string} {hours:number}');
                    return;
                }
                const result = manager.leave(command[1], command[2]);
                console.log(result);
            } catch (error) {
                logger.error(error);
                console.log(error);
            }
            break;
        case 'exit':
            logger.info(`User trying to exit the command reader!`);
            rlInstance.pause();
            logger.info(`Stopping Command Reader..`);
            break;
        default:
            logger.error('Looks like you have entered unsupported command, please read the document(PROBLEM.md), command: ' + command.join(', '));
            console.log('Looks like you have entered unsupported command, please read the document(PROBLEM.md), command: ' + command.join(', '));
            break;
    }
}

/**
 * @description Start a command line reader and watch the entered command to operate.  
 */
let start = () => {
    logger.info(`Starting Command Reader..`);
    rl.on('line', (command) => {
        if (command.split(" ")[0] === 'exit') {
            logger.info(`User trying to exit the command reader!`);
            rl.pause();
            logger.info(`Stopping Command Reader..`);
        } else {
            CommandProcessor(command);
        }
    });
}

/**
 * @description Ctrl+C which will cause the SIGINT signal to the node process. 
 */
rl.on('SIGINT', () => {
    rl.question('Are you sure you want to terminate server?. It will delete all the data from memory but you can check the logs folder to see the activity. (yes/no)', (answer) => {
        if (answer.match(/^y(es)?$/i)) {
            logger.info(`Stopping Command Reader..`);
            rl.pause();
        } else {
            logger.info(`Resuming Command Reader..`);
        }
    });
});

/**
 * @description This function will read file line by line and execute the command
 * @param {*} reader 
 */
const FileProcessor = async (reader) => {
    for await (const line of reader) {
        CommandProcessor(line);
    }
}

let args = process.argv.slice(2);

if (args.length) {
    var reader = require('readline').createInterface({
        input: require('fs').createReadStream(`${__dirname}/${args[0]}`),
    });

    /**
     * @description If we found there is a file in args, 
     *              we will start processing that file, 
     *              without starting the command reader server
     */
    FileProcessor(reader).then(() => {
        console.log(`Processing is done for file: ${args[0]}`);
        process.exit(0);
    }).catch((error) => {
        console.log(`Got Error while processing file: ${error}`);
        process.exit(0);
    });

} else {

    /**
     * @description This function will trigger the command reader. 
     */
    start();
}