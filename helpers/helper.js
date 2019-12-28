'use strict';

const config = require('../config');
const charge = config.charge;
const enabler = config.enabler;

/**
 * @description The job of this function is to fill the object with sequence key initial available slots
 * @param {*} size 
 * @param {*} object 
 */
const filler = (size, object) => {
    for (let i = 1; i <= size; i++) {
        object[i] = null;
    }
    return object;
};

/**
 * @description This function will help you to get the size of your slots
 * @param {*} slots 
 * 
 * @returns {number}
 */
const sizeOf = (slots) => {
    return Object.keys(slots || {}).length;
};


/**
 * @description This function will help you to get the size of your available slots along with position
 * @param {*} slots 
 * 
 * @returns {object} - with available total and positions in array
 */
const available = (slots) => {
    let _count = 0;
    let _available = [];

    Object.keys(slots || {}).forEach((key) => {
        if (!slots[key]) {
            _count += 1;
            _available.push(key);
        }
    });

    return { total: _count, available: _available };
};


/**
 * @description This function will help you to get the key of your first available slot.
 * @param {*} slots 
 * 
 * @returns {StringKey}
 */
const first = (slots) => {
    return Object.keys(slots || {}).find((key) => {
        return !slots[key]
    });
};

/**
 * @description This function will return the number of booked slit with there position
 * @param {*} slots 
 * 
 * @returns {ArrayOfStringKey}
 */
const filled = (slots) => {
    return Object.keys(slots || {}).filter((key) => {
        return slots[key];
    });
}

/**
 * @description This function will inform that the vehicle is in the parking lot or not
 * @param {*} number 
 * @param {*} slots 
 * 
 * @returns {VehicleSlotObject || null}
 */
const findVehicle = (number, slots) => {
    let slot = Object.keys(slots || {}).find((key) => {
        return slots[key] && slots[key]['number'] === number.toLowerCase().trim();
    });
    if (slot) {
        return { lot: slot, vehicle: slots[slot] };
    } else {
        return null;
    }
}

/**
 * @description This function is responsible for calculating the price of a parked vehicle
 * @param {*} hours 
 * 
 * @returns {NumberPriceObject || Error}
 */
const getPrice = (hours) => {
    // Charge applicable is $10 for first 2 hours and $10 for every additional hour.
    hours = hoursNumber(hours);
    if (hours <= charge.default.duration.value) { // Hours less then default unit
        return {
            price: charge.currency.symbol + '' + charge.default.fee,
            duration: 'for duration ' + charge.default.duration.value + ' ' + charge.default.duration.unit + ' or less.',
        };
    } else {
        hours = hours - charge.default.duration.value; // Remove Default Hours
        let price = (charge.default.fee + (hours * charge.extra.fee));
        return {
            price: charge.currency.symbol + '' + price,
            duration: ` for duration ${hours + charge.default.duration.value}  ${charge.default.duration.unit}.`,
        }
    }
}


/**
 * @description This function will help you to validate the slot with negative and zero value
 * @param {*} slot 
 * 
 * @returns (PositiveNumber > 0 || error)
 */
const slotNumber = (slot) => {
    if (!slot) { throw 'Enter Total Slots You Want!'; }
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
const park = (size, slots, vehicle) => {
    if (size === 0) {
        throw `Before parking the vehicle, please allocate the slots to your parking lot.`;
    }

    if (!vehicle.number || !vehicle.color || !vehicle.type) {
        throw `While parking the vehicle, we required vehicle details like number, color, and type.`
    }

    if (findVehicle(vehicle.number, slots)) {
        throw `Oops, it's look like there is already vehicle is parked with number ${vehicle.number}.`;
    }

    if (!first(slots)) {
        throw `No slot available to park the vehicle.`;
    }

    if (enabler.VEHICLES.indexOf(vehicle.type) < 0) {
        throw `Apologies, but our parking lot does not support your vehicle type.`
    }

    return first(slots);
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

    if (filled(slots).length === 0) {
        throw `Oops, no booked vehicle lot found!`;
    }

    return filled(slots);
}

/**
 * @description This function will return the vehicle detail with slot or error
 * @param {*} size 
 * @param {*} slots 
 * @param {*} number 
 * 
 * @returns {VehicleSlotObject || Error}
 */
const leave = (size, slots, number) => {
    if (size === 0) {
        throw `No Slots, Please allocate the slots to your parking lot.`;
    }

    if (filled(slots).length === 0) {
        throw `Oops, no booked vehicle lot found!`;
    }

    if (!findVehicle(number, slots)) {
        throw `Oops, it's look like no vehicle is parked with number ${number}.`;
    }

    return findVehicle(number, slots);
}

/**
 * @description This function job is similar to slotNumber function, by some config we can combine both
 * @param {*} hours 
 * 
 * @returns {NumberHours || Error}
 */
const hoursNumber = (hours) => {
    if (!hours) { throw 'Enter Total Duration of Parking'; }
    if (hours.constructor === String) {
        if (hours === '0') {
            throw 'You can\'t allocate 0 size hours.'
        } else if (hours.indexOf('-') > -1) {
            throw 'You can\'t allocate negative size hours.'
        } else {
            return parseInt(hours);
        }
    } else if (hours.constructor === Number) {
        if (hours == 0) {
            throw 'You can\'t allocate 0 size hours.'
        } else if (Math.sign(hours) === -1) {
            throw 'You can\'t allocate negative size hours.'
        } else {
            return hours;
        }
    }
}

module.exports = {
    filler: filler,
    sizeOf: sizeOf,
    available: available,
    first: first,
    filled: filled,
    findVehicle: findVehicle,
    getPrice: getPrice,
    slotNumber: slotNumber,
    park: park,
    status: status,
    leave: leave,
    hoursNumber: hoursNumber,
};