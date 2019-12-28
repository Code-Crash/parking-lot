'use strict';

const util = require('../helpers');


class ParkingManager {

    constructor() {
        this.total = 0; // Init parking lot with zero 
        util.logger.info(`Parking Manager Initialized as singleton!`);
    }

    /**
     * @description This function will allocate the parking lots for the new parking
     * @param {*} slots 
     * 
     * @returns {SuccessMessageString || Error}
     */
    allocate(slots) {
        slots = util.validator.slotNumber(slots);
        this.total = slots;
        this.available = util.convertor.filler(slots, {});
        util.logger.info(`Created a parking lot with ${util.convertor.sizeOf(this.available)} slots`);
        util.logger.info(`Available Slots are ${JSON.stringify(util.convertor.available(this.available))}`);
        return `Created parking lot with ${util.convertor.sizeOf(this.available)} slots`;
    }

    /**
     * @description This function will help us to park the vehicle
     * @param {*} number 
     * @param {*} color 
     * @param {*} type 
     * 
     * @returns {SuccessMessageString || Error}
     */
    park(number, color, type) {
        try {
            let slot = util.validator.park(this.total, this.available, type);
            this.available[slot] = {
                number: number,
                color: color,
                type: type,
                parkAt: new Date().getTime(),
            }
            util.logger.info(`Parked vehicle: ${JSON.stringify(this.available[slot])}`);
            return `Allocated slot number: ${slot}`;
        } catch (error) {
            util.logger.error(JSON.stringify(error));
            return error;
        }
    }

    /**
     * @description This function will return the detail of parking lot with parked vehicle information
     * 
     * @returns {Condole.table(ArrayOfAllocatedVehicles)}
     */
    status() {
        try {
            let slots = util.validator.status(this.total, this.available);
            let log = [];
            slots.forEach((slot) => {
                let lot = this.available[slot];
                log.push({ slot: slot, number: lot.number, color: lot.color, type: lot.type });
            });
            util.logger.info(`Access Status: ${JSON.stringify(log)}`);
            return console.table(log);
        } catch (error) {
            util.logger.error(JSON.stringify(error));
            return error;
        }
    }

}

const pm = new ParkingManager(); // singleton class
module.exports = pm;

console.log(pm.allocate(5));
console.log(pm.park('MH-20', 'red', 'car'));
console.log(util.convertor.available(pm.available));
console.log(util.convertor.first(pm.available));
console.log(pm.status());
