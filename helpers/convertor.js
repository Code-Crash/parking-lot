'use strict';


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

module.exports = {
    filler: filler,
    sizeOf: sizeOf,
    available: available,
    first: first,
    filled: filled
}