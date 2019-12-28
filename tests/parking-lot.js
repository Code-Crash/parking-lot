'use strict';

let expect = require('chai').expect;
let manager = require('../controllers');

/**
 * @description This function is to check if handle is handle or not.
 */
describe('status', function () {
    it('should throw error while getting the status as parking lot is not allocated.', function () {
        expect(() => manager.status()).to.throw('No Slots, Please allocate the slots to your parking lot.');
    });
});

/**
 * @description This function is to check if handle is handle or not.
 */
describe('create_parking_lot', function () {
    it('should throw error while creating parking slots', function () {
        expect(() => manager.allocate()).to.throw('Enter Total Slots You Want!');
    });
});

/**
 * @description Check if parking lot is being created or not
 */
describe('create_parking_lot 6', function () {
    it('should create 10 parking slots', function () {
        var text = 'Created parking lot with 10 slots';
        var result = manager.allocate(10);
        expect(result).to.be.equal(text);
    });
});


/**
 * @description This function is to check if handle is handle or not.
 */
describe('status', function () {
    it('should throw error while getting the status as there is no vehicle in parking lot', function () {
        expect(() => manager.status()).to.throw('Oops, no booked vehicle lot found!');
    });
});

/**
 * @description Check for park command for wrong type or without any value
 */
describe('park ', function () {
    it('should throw error if vehicle is not passed or type is not valid.', function () {
        expect(() => manager.park()).to.throw('While parking the vehicle, vehicle details are required or format should be object.');
    });
});

/**
 * @description Check for park command
 */
describe('park ', function () {
    it('should throw error if vehicle object is passed but details are not.', function () {
        expect(() => manager.park({})).to.throw('While parking the vehicle, we required vehicle details like number, color, and type.');
    });
});


/**
 * @description Validate for vehicle type
 */
describe('park MH-20 red bus', function () {
    it('should throw error for not supporting the vehicle type.', function () {
        expect(() => manager.park({ number: 'MH-20', color: 'red', type: 'bus' })).to.throw('Apologies, but our parking lot does not support your vehicle type.');
    });
});


/**
 * @description Check for valid data to park a vehicle is working or not
 */
describe('park MH-20 red car', function () {
    it('should park the vehicle with message.', function () {
        var result = manager.park({ number: 'MH-20', color: 'red', type: 'car' });
        expect(result).to.be.equal('Allocated slot number: 1');
    });
});

/**
 * @description This will tell you the parked vehicle is being return with array format or not.
 */
describe('status', function () {
    it('should check is parked vehicles are being returns with all data or not.', function () {
        let result = manager.status();
        expect(result.constructor === Array).to.be.equal(true);
        expect(result[0].hasOwnProperty('number')).to.be.equal(true);
        expect(result[0].hasOwnProperty('slot')).to.be.equal(true);
        expect(result[0].hasOwnProperty('color')).to.be.equal(true);
        expect(result[0].hasOwnProperty('type')).to.be.equal(true);
        expect(result[0].hasOwnProperty('parkedAt')).to.be.equal(true);
        expect(result[0].hasOwnProperty('any-other-key')).to.be.equal(false); // Just to test
    });
});

/**
 * @description Check if duplicate vehicles are being allocated or not
 */
describe('park MH-20 red car', function () {
    it('should throw error while parking duplicate vehicle', function () {
        expect(() => manager.park({ number: 'MH-20', color: 'red', type: 'car' })).to.throw("Oops, it's look like there is already vehicle is parked with number MH-20.");
    });
});

/**
 * @description Should parked the different vehicle
 */
describe('park MH-30 green car', function () {
    it('should park the vehicle with message.', function () {
        var result = manager.park({ number: 'MH-30', color: 'green', type: 'car' });
        expect(result).to.be.equal('Allocated slot number: 2');
    });
});

/**
 * @description Should throw error while un-parking any un parked vehicle.
 */
describe('leave MH-40 4', function () {
    it('should throw error while removing un-parked vehicle', function () {
        expect(() => manager.leave('MH-40', 4)).to.throw("Oops, it's look like no vehicle is parked with number MH-40.");
    });
});

/**
 * @description Should throw error on wrong leave command
 */
describe('leave', function () {
    it('should throw error while removing vehicle without vehicle number', function () {
        expect(() => manager.leave()).to.throw("Leave command required two arguments, registration-number: string and hours: number.");
    });
});

/**
 * @description Should throw error on wrong leave command
 */
describe('leave MH-20', function () {
    it('should throw error while removing vehicle without hours', function () {
        expect(() => manager.leave('MH-20')).to.throw("Leave command required two arguments, registration-number: string and hours: number.");
    });
});

/**
 * @description Should parked the different vehicle
 */
describe('leave MH-20 4', function () {
    it('should remove the vehicle from parking with message and charged for parking duration', function () {
        var result = manager.leave('MH-20', 4);
        expect(result).to.be.equal('Registration number MH-20 with Slot Number 1 is free with Charge $30  for duration 4  hour.');
    });
});

/**
 * @description Should parked the different vehicle
 */
describe('park MH-40 green car', function () {
    it('should park the vehicle with message.', function () {
        var result = manager.park({ number: 'MH-40', color: 'green', type: 'car' });
        expect(result).to.be.equal('Allocated slot number: 1');
    });
});