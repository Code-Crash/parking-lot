
# Parking Lot Management [command line application]


To understand the detailed requirement, please read ```PROBLEM.md``` file.

## Prerequisites

* As this application don't have any lib dependency except for test cases, but you should already have Node version > 10.x installed on the system.


## How to setup?

1. ```npm run setup``` // This will installed the test dependencies, run the test cases, and process the sample.input.txt file

2. Note: If you face any error to run the ```./bin/setup.sh``` file, please change the file permission as executable using command ```chmod +x ./bin/setup.sh```, to check if it's executable or not run ```ls -l ./bin/setup.sh```

## How it works:

* To run the command reader, run follows command

  ```npm start``` 
* After the command reader started, enter ```help``` command to get the basic information of different commands or read ```PROBLEM.md```. Use a full screen terminal to see the proper output of ```help``` command as it will print the list of commands in the table format. 

* You can also pass the list of command with the help of input file, to test it use exiting file and command.

    ```npm run file sample.input.txt```


## Features:

* Command Reader to read the command one by one or process the list of command through the input text file.
* Basic commands from ```PROBLEM.md```.
* Logger (hold the history/error/activity of user inputs and commands)
* Charges/Prices are configurable in single file, path: ```./config/index.js```
* Logger configurable to log on console through logger or not, path: ```./config/index.js```
* Allowed a specific type of vehicles based on your parking lot capacity. ```./config/index.js```
* Duplicate vehicles and bunch of other validations.
* Basic Test Suite is ready to cover tests of the basic functionalities of the parking lot.

## Note: 

1. This application was build on MAC OS (Mojave), but it should run on any (linux/unix) system as long as ```Node>10.x``` is installed.


## TODO

* We can add server support
* More Test Cases for command line reader or file handler.
* More Functionality
* Add Database Support with Promises if anyone required.
* Make it online application to host on server with user management functionalities like login/sign-up/ticket receipt/etc. 
* Add support to send logs to safe place like cloud or any db.