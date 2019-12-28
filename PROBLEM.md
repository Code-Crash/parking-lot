# Problem Statement

I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is
given a number starting at 1 increasing with increasing distance from the entry point
in steps of one. I want to create an automated ticketing system that allows my
customers to use my parking lot without human intervention.

When a car enters my parking lot, I want to have a ticket issued to the driver. The
ticket issuing process includes us documenting the registration number (number
plate) and the colour of the car and allocating an available parking slot to the car
before actually handing over a ticket to the driver (we assume that our customers are
nice enough to always park in the slots allocated to them). The customer should be
allocated a parking slot which is nearest to the entry. At the exit the customer returns
the ticket with the time the car was parked in the lot, which then marks the slot they
were using as being available. Total parking charge should be calculated as per the
parking time. Charge applicable is $10 for first 2 hours and $10 for every additional
hour.

We interact with the system via a simple set of commands which produce a specific
output. Please take a look at the example below, which includes all the commands
you need to support - they're self explanatory. The system should accept a filename
as a parameter at the command prompt and read the commands from that file.

## TLDR

* Parking Lot: with ```n``` size of lots
* Position of slot will be automatic from ```1``` to ```n``` with step of ```1```
* While Allocating, get the detail from driver:  
  * 1. Vehicle registration number, 
  * 2. Color of the vehicle (we can add as a cmd args)```
* Allocating the parking slot should be nearest slot available slot from entry
 
## Note

* Add: boundary conditions by using your creativity
* Add: validations 
* Add: Dynamic configuration support for price of vehicle parked for specific duration. (Extra)
* Add: Allowed vehicle support, write now, its only for cars (Extra)
* Add: Logger which will maintain the history of commands, error and activity logs (Extra)
* Add: Enabler, which will enable to print the logs on console while logging in file (error, command, activity) (Extra)

## Example: File

To install all dependencies, compile and run tests:

```sh
$ npm run setup
```

To run the code so it accepts input from a file:

```sh
$ npm run file sample.input.txt
```

## Commands

* Create parking lot of size n : create_parking_lot {capacity:number}
* Park a car : park {vehicle_number:string} {color:string} {type:string}
* Remove(Un-park) car from : leave {vehicle_number:string} {hours:number}
* Print status of parking slot : status

## Input (contents of file):

```sh
create_parking_lot 3
park KA-01-HH-1234 green car
park BA-02-HH-3141 red car
park CA-03-HH-9999 red car
leave BA-02-HH-3141 4
status
park KA-01-P-333 yellow car
leave KA-01-HH-1234 4
leave CA-03-HH-9999 6
park KA-09-HH-0987 black car
status
```

## Output (to STDOUT for Each Separate Command):

```
Created parking lot with 3 slots
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Registration number BA-02-HH-3141 with Slot Number 2 is free with Charge $30  for duration 4  hour.
┌─────────┬──────┬─────────────────┬─────────┬───────┬──────────────────────────┐
│ (index) │ slot │     number      │  color  │ type  │         parkedAt         │
├─────────┼──────┼─────────────────┼─────────┼───────┼──────────────────────────┤
│    0    │ '1'  │ 'KA-01-HH-1234' │ 'green' │ 'car' │ 2019-12-28T20:41:36.721Z │
│    1    │ '3'  │ 'CA-03-HH-9999' │  'red'  │ 'car' │ 2019-12-28T20:41:59.793Z │
└─────────┴──────┴─────────────────┴─────────┴───────┴──────────────────────────┘
Allocated slot number: 2
Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge $30  for duration 4  hour.
Registration number CA-03-HH-9999 with Slot Number 3 is free with Charge $50  for duration 6  hour.
Allocated slot number: 1
┌─────────┬──────┬─────────────────┬──────────┬───────┬──────────────────────────┐
│ (index) │ slot │     number      │  color   │ type  │         parkedAt         │
├─────────┼──────┼─────────────────┼──────────┼───────┼──────────────────────────┤
│    0    │ '1'  │ 'KA-09-HH-0987' │ 'black'  │ 'car' │ 2019-12-28T20:43:36.125Z │
│    1    │ '2'  │  'KA-01-P-333'  │ 'yellow' │ 'car' │ 2019-12-28T20:42:47.633Z │
└─────────┴──────┴─────────────────┴──────────┴───────┴──────────────────────────┘
```