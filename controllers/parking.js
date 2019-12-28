'use strict';

const util = require('../helpers');


class ParkingManager {

    constructor() {
        util.logger.info(`Parking Manager Initialized as singleton!`);
    }

    /**
     * @description This function will allocate the parking lots for the new parking
     * @param {*} slots 
     * 
     * @returns {SuccessMessage || Error}
     */
    allocate(slots) {
        slots = util.validator.slotNumber(slots);
        this.total = slots;
        this.available = util.convertor.filler(slots, {});
        util.logger.info(`Created a parking lot with ${util.convertor.sizeOf(this.available)} slots`);
        util.logger.info(`Available Slots are ${JSON.stringify(util.convertor.available(this.available))}`);
        return `Created parking lot with ${util.convertor.sizeOf(this.available)} slots`;
    }

}

const pm = new ParkingManager(); // singleton class
module.exports = pm;