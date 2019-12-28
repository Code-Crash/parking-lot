'use strict';

const convertor = require('./convertor'); // Import Helpers
const enabler = require('../config').enabler;

/**
 * @description This function will help you to validate the slot with negative and zero value
 * @param {*} slot 
 * 
 * @returns (PositiveNumber > 0 || error)
 */
const slotNumber = (slot) => {
    if (slot.constructor === String) {
        if (slot === '0') {
            throw 'You can\'t allocate 0 size slots.'
        } else if (slot.indexOf('-') > -1) {
            throw 'You can\'t allocate negative size slots.'
        } else {
            return parseInt(slot);
        }
    } else if (slot.constructor === Number) {
        if (slot === 0) {
            throw 'You can\'t allocate 0 size slots.'
        } else if (Math.sign(slot) === -1) {
            throw 'You can\'t allocate negative size slots.'
        } else {
            return slot;
        }
    }
}

/**
 * @description This function will do the basic validation before parking the vehicle
 * @param {*} size 
 * @param {*} slots 
 * @param {*} type 
 * 
 * @returns {FirstAvailableSlotString || Error}
 */
const park = (size, slots, type) => {
    if (size === 0) {
        throw `Before parking the vehicle, please allocate the slots to your parking lot.`;
    }

    if (!convertor.first(slots)) {
        throw `No slot available to park the vehicle.`;
    }

    if (enabler.VEHICLES.indexOf(type) < 0) {
        throw `Apologies, but our parking lot does not support your vehicle type.`
    }

    return convertor.first(slots);

}

/**
 * @description This function will return the filled slots with there position in array
 * @param {*} size 
 * @param {*} slots 
 * 
 * @returns {FilledSlotsKey || Error}
 */
const status = (size, slots) => {
    if (size === 0) {
        throw `No Slots, Please allocate the slots to your parking lot.`;
    }

    if (convertor.filled(slots).length === 0) {
        throw `Oops, no booked parking lot found!`;
    }

    return convertor.filled(slots);
}

module.exports = {
    slotNumber: slotNumber,
    park: park,
    status: status,
}