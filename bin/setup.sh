#!/usr/bin/env bash

# The job of this setup wizard is to install test dependencies, run the test cases and also process the sample input file

# Install Node Test Dependency
npm i
# Run Test Cases
npm run test
# Test Input File
npm run file sample.input.txt
