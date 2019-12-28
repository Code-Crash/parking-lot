'use strict';

/**
 * @author code-crash
 * @description This Parking Manager is contains the command APIs which will manage the Parking 
 */

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
        slots = util.helper.slotNumber(slots);
        this.total = slots;
        this.available = util.helper.filler(slots, {});
        util.logger.info(`Created a parking lot with ${util.helper.sizeOf(this.available)} slots`);
        util.logger.info(`Available Slots are ${JSON.stringify(util.helper.available(this.available))}`);
        return `Created parking lot with ${util.helper.sizeOf(this.available)} slots`;
    }

    /**
     * @description This function will help us to park the vehicle
     * @param {Vehicle} vehicle - {number: <vehicle number>, color: <color>, type: <type>}
     * 
     * @returns {SuccessMessageString || Error}
     */
    park(vehicle) {
        try {
            let slot = util.helper.park(this.total, this.available, vehicle);
            this.available[slot] = {
                number: vehicle.number.toLowerCase().trim(),
                color: vehicle.color.toLowerCase().trim(),
                type: vehicle.type.toLowerCase().trim(),
                parkAt: new Date().getTime(),
            }
            util.logger.info(`Parked vehicle: ${JSON.stringify(this.available[slot])}`);
            util.logger.info(`Available Slots are ${JSON.stringify(util.helper.available(this.available))}`);
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
            let slots = util.helper.status(this.total, this.available);
            let log = [];
            slots.forEach((slot) => {
                let lot = this.available[slot];
                log.push({ slot: slot, number: lot.number.toUpperCase(), color: lot.color, type: lot.type, parkedAt: new Date(lot.parkAt) });
            });
            util.logger.info(`Access Status: ${JSON.stringify(log)}`);
            return log;
        } catch (error) {
            util.logger.error(JSON.stringify(error));
            return error;
        }
    }

    /**
     * @description This function will remove the vehicle from your parking lot.
     * @see Note - We are passing parking hours manually, but we can make it automated based on parkAt time 
     * 
     * @param {*} number - vehicle number 
     * @param {*} hours - hours of vehicle is parked
     */
    leave(number, hours) {
        try {
            let slot = util.helper.leave(this.total, this.available, number);
            let charge = util.helper.getPrice(hours);
            this.available[slot.lot] = null;
            util.logger.info(`Registration number ${slot.vehicle.number.toUpperCase()} with Slot Number ${slot.lot} is free with Charge ${charge.price} ${charge.duration}`);
            util.logger.info(`Available Slots are ${JSON.stringify(util.helper.available(this.available))}`);
            return `Registration number ${slot.vehicle.number.toUpperCase()} with Slot Number ${slot.lot} is free with Charge ${charge.price} ${charge.duration}`;
        } catch (error) {
            util.logger.error(JSON.stringify(error));
            return error;
        }
    }

}

const pm = new ParkingManager(); // singleton class
module.exports = pm;

// console.log(pm.allocate(5));
// console.log(pm.park({ number: 'MH-20', color: 'red', type: 'car' }));
// console.log(pm.park({ number: 'MH-30', color: 'red', type: 'car' }));
// console.log(pm.park({ number: 'MH-40', color: 'red', type: 'car' }));
// console.log(util.helper.available(pm.available));
// console.log(util.helper.first(pm.available));
// console.log(pm.status());
// console.log(pm.leave('MH-20', 2));
// console.log(pm.status());
// console.log(pm.leave('MH-30', 10));
// console.log(pm.leave('MH-40', 1));
// console.log(util.helper.available(pm.available));