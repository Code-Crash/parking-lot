'use strict';

/**
 * @author code-crash
 * @description This file will hold the configuration of our small application.
 */

/**
 * @description Duration unit will help you to calculate the parking duration in particular unit of time
 */
const DURATION_UNIT = {
    h: 'hour',
    m: 'minute',
    s: 'second',
    default: 'hour'
}

/**
 * @description Charge constant will be responsible for handling the charges/vehicle for a specific duration
 */
const charge = {
    currency: [{ default: true, name: 'us-dollar', symbol: '$' }],
    default: {
        fee: 10,
        duration: {
            value: 2,
            unit: DURATION_UNIT.default
        }
    },
    extra: {
        fee: 10,
        duration: {
            value: 1,
            unit: DURATION_UNIT.default
        }
    }
};


/**
 * @description The job of enable to hold the boolean value to do or not do the operation
 */
const enabler = {
    CONSOLE: false,
    VEHICLES: ['car'], // It will hold the type of vehicle to park, if vehicle type is not defined here, it will not park the vehicle
}

module.exports = {
    charge: charge,
    enabler: enabler
}