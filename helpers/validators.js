'use strict';


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

module.exports = {
    slotNumber: slotNumber
}