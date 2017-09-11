# rock-paper-scissors-lizard-spock

A simple application for playing rock-paper-scissors-lizard-spock

# Pre requisites

You should have node.js currently installed on your machine. If not, please download and install it from the official website:

[node.js official website](https://nodejs.org/en/)

I developed all the application using the current versions on my system:

- node.js: **6.11.0**
- npm: **4.5.0**

If you may have installed a prior version of node.js, and you need to install also the new version, you can use **Node Version Manager** in order to manage multiple versions of node.js and simply switch among them through **nvm**

`node_modules/protractor/bin/webdriver-manager update`

# Installation

In order to install the project, simply clone this github repository into your system through the command:

`git clone https://github.com/quirimmo/rock-paper-scissors-lizard-spock`

Once cloned on your system, go through command line in the root of the project and simply install all the dependencies through:

`npm install`

# Run the application

In order to run the application, from the root of your project, simply execute the following command:

`gulp`

This will serve the project on the address [http://localhost:3000/](http://localhost:3000/)

So open your browser and point to the above link and you should see the application running correctly.

This will also watching to all the changes inside HTML, LESS and JS files of the project, automatically reloading the project when you change them, without to refresh the page manually or to run again the serve command.

If you want to run your application without watching for changes, you can use the following command:

`gulp serve-no-watch`

# Run the unit tests

All the js files are followed with unit tests. You can find the unit tests inside the root folder `test/unit`.

In order to run the unit tests, you can use the following gulp task:

`gulp unit-test`

Again, if you want to run them but not closing the process after the first execution, you can use the following task:

`gulp unit-test-watch`

In this way the process will be running and watching changes on the spec files or js files, re running the tests every time you change something, to ensure that every change doesn't introduce breaks in the tests.

# Run the E2E Tests

In order to execute the tests, you need a pre step which will install locally **selenium** needed for the execution. Simply go to the root folder of your project, and run the following command:

`node_modules/protractor/bin/webdriver-manager update`

Then, always from the root of your project, run the following gulp task:

`gulp protractor-test`

Obviously, this task will take care also of starting your app through the `gulp serve-no-watch` task, needed in order to execute e2e tests (the app must be running for them).