# rock-paper-scissors-lizard-spock

A simple application for playing rock-paper-scissors-lizard-spock

## Pre requisites

You should have node.js currently installed on your machine. If not, please download and install it from the official website:

[node.js official website](https://nodejs.org/en/)

I developed all the application using the current versions on my system:

- node.js: **6.11.0**
- npm: **4.5.0**

If you may have installed a prior version of node.js, and you need to install also the new version, you can use **Node Version Manager** in order to manage multiple versions of node.js and simply switch among them through **nvm**.

## Installation

In order to install the project, simply clone this github repository into your system through the command:

`git clone https://github.com/quirimmo/rock-paper-scissors-lizard-spock`

Once cloned on your system, go through command line in the root of the project and simply install all the dependencies through:

`npm install`

## Run the application

In order to run the application, from the root of your project, simply execute the following command:

`gulp`

This will serve the project on the address [http://localhost:3000/](http://localhost:3000/)

So open your browser and point to the above link and you should see the application running correctly. This will also watching to all the changes inside HTML, LESS and JS files of the project, automatically reloading the project when you change them, without to refresh the page manually or to run again the serve command.

If you want to run your application without watching for changes, you can use the following command:

`gulp serve-no-watch`

## Run the tests

Below an explanation on how how to run all the implemented tests of the project

### Run the unit tests

There are 193 unit tests in the project. You can find the unit tests inside the root folder `test/unit`.

In order to run the unit tests, you can use the following gulp task:

`gulp unit-test`

Again, if you want to run them but not closing the process after the first execution, you can use the following task:

`gulp unit-test-watch`

In this way the process will be running and watching changes on the spec files or js files, re running the tests every time you change something, to ensure that every change doesn't introduce breaks in the tests.

### Run the E2E Tests

There are 103 e2e tests in the project. You can find all the e2e tests inside the folder `test/e2e` folder.

In order to execute the tests, you need a pre step which will install locally **selenium** needed for the execution. Simply go to the root folder of your project, and run the following command:

`node_modules/protractor/bin/webdriver-manager update`

Then, always from the root of your project, run the following gulp task:

`gulp protractor-test`

Obviously, this task will take care also of starting your app through the `gulp serve-no-watch` task, needed in order to execute e2e tests (the app must be running for them).

## Implemented Features

- **Rock Paper Scissors**: Standard Game
- **Rock Paper Scissors Lizard Spock**: Extended version of the game
- **Rock Paper Scissors Lizard Spock Chuck Norris**: A stupid extension of the Rock Paper Scissors Lizard Spock, invented by me in order to test the extensibility of the created structure. Actually Chuck Norris wins against everything and just draws against himself
- **Personal Profile Scores**: History of the personal scores, tracking number of total matches, victories, loses, draws, consecutive victories, consecutive loses and consecutive draws
- **Restart Game**: Restart the game emptying all the personal scores saved so far
- **Player vs Computer**: Normal match where you play against the computer
- **Computer vs Computer**: Simulated match between two computer players. This statistics are not tracked inside the personal scores
- **Fully Responsive**: The application is fully responsive and it adapts the layout depending on the devices sizes. You can easily test that opening your dev tools (on chrome for example) and switching to the mobile view

## What if I want to change the rules of one of the games

You open the file `src/constants/game.constants.js` and there you can change the `label` if you want to display a new name, and you can change the `winsAgainst` and `losesAgainst` arrays if you want to change the rules, or simply change the `term` used for an action in case of victory or of lose.

## What if I want to add a new game

For example let's suppose that you want to add a `foo`, `bar`, `zed` game with the following rules:

Winning forms:

- `foo` destroys `bar`
- `bar` kills `zed`
- `zed` annihilates `foo`

So looking to the passive forms for losing:

- `bar` has been destroyed by `foo`
- `zed` has been killed by `bar`
- `foo` has been annihilated by `zed`

You open the file `src/constants/game.constants.js` and you define your new actions following the structure of the action objects (there are comments at the beginning of that file explaining all the structure of the action objects).

You add three png images in the `assets/images` folder with the three id names, which represent the icons to be used.

Then you simply instantiate the `rockPaperScissorsGenerator` component in a page in the following way:

```HTML
<rock-paper-scissors-generator 
    page-title="name of the game" 
    available-choices="array containing the three objects you defined"
>
</rock-paper-scissors-generator>
```

The new game is ready! With the human vs computer functionality, the computer vs computer simulation and with all the scores tracked correctly in the personal profile.

## Application Structure

Just as a brief preface about the project structure. 

Usually for small apps I prefer to use this kind of structure as I create separate folders for components, directives, controllers, services, etc...

But for bigger applications, this structure becomes pretty unmanageable, so I prefer to adopt another kind of structure when you create a first layer of folders related to the logic, and then inside that folders put your controllers, services, etc... (including also the unit tests to all the files using the same name of the file followed by `.spec`). In this way it is easier to understand all the logic and where are these items used inside the application.

## Development Process

I've been using **TDD** since a lot now. But since I discovered **BDD**, I fell in love with it, which is the approach I usually use at work and that I used in order to develop this simple application. BDD is a superset of TDD, the flow is still the same (designing tests, getting your tests failing, implementing the code, getting your tests passing) but you start the development from the e2e tests design/implementation, then you switch to the unit tests design/implementation, and at the end you switch to the real code design/implementation.

**Why I do prefer now BDD over TDD?** The answer is in the difference between unit tests and e2e tests.

**Unit tests** are really cool but they should be a black-box where you test the related file and all the expected logic in that file. You should mock/stub everything that comes from outside and, as I said, testing all the functionalities within the related file.

With the **E2E tests**, you can do something more, which is not (and should be not) covered by default from unit tests (except of using some tricks or bad practices).

For example you can write a test for testing globally all the application, navigate to one page, interact wit the UI doing some action, going back to another page and see if the expected changes happened in the other page.

And then you can focus on the behavior as BDD states (**Behavior Driven Development**). So you can design what should happen in a page and design a proper e2e tests for that, which is completely different from testing logic and functionalities.

Therefore, you are sure that you will cover all the Business requirements of the user stories designing e2e tests from the user stories description, being also sure that you "limit" your code to the business requirements only, covering all of them, and avoiding an over-engineering of the code.

Using **cucumber** (**gherkin engine**) you are also able to write your feature files through plain English, so that the business can double check them and understand them, and can ensure that you are correctly covering all the required functionalities. The feature files could be also written by QA department in assistance with the business, and keep the developers focusing on the implementation of them. In addition, these tests will avoid a lot of manual testing.

Coming back to the development process, this is the flow I followed:

- Create a new branch for the feature I am going to develop
- Design the e2e tests describing all the functionalities and UI aspects I would expect from this feature
- Design the unit tests covering all the logic I am going to implement for the new feature
- Implement the real code and check that it passes all the previous defined tests
- Manually check that everything is working as expected
- If everything is OK, create a pull request for this branch and merge it to the master branch

Of course this process is **iterative and incremental**. This means that maybe during the unit tests, you can understand that you missed one aspect in the e2e tests, so you switch back to the e2e tests and you add the new case. Or for example during the code implementation you understand that you need another method, so you switch back to the unit tests and you design the tests before to really implement the code of the new method (or for example you need a new external file, so same approach: before to create the code, you create the unit tests for the new file, and then you switch back to the code implementation).

## Gulp tasks

In the `gulpfile.js` there is the list of all the available tasks. You can see to that file in order to see all the defined tasks, but all the important ones are mentioned in this document. All the other tasks are simply inner tasks executed during the execution of the main ones described in this documentation.

## Distribution of the app

I use a lot of tasks for development distribution and production distribution of the app. Even for serving the app locally for development through `gulp serve`, I do use few utilities, like `gulp-inject` for automatically inject all the files in the `index.html` without adding manually the files. So if in the source project you want to add a new file, you don't have to manually add the inclusion of that file in the index, because it will be automatically added.

In order to build the production distribution version of the app, you can generate the distribution version of it through the following command:

`gulp publish`

This task will create a directory inside the root folder called `dist` and inside there will be all the concatenated and minified files needed by the app.

## CI/CD

The project has all the **CI/CD** management set up. I am using **TravisCI** in this case, even if I am also really proficient with **Jenkins** and usually I use it in my job. But for these kind of simple/open source/personal projects related to GitHub repositories specially, I usually use TravisCI.

The main configuration is in the `.travis.yml` file in the root folder, and the used shell scripts `.sh` are inside the `travis` sub-folder.

The process is actually the following:

- When you open a pull request, or you push over an opened pull request, a job on Travis will run
- This job will install the app, and run the unit tests and the e2e tests. If the tests fail, the job will fail
- If the tests pass, then the `gulp publish` task will be triggered, producing the production distribution version of the app
- Then an ftp script will start moving all the files inside a web server folder (below for more details)
- In the web server, for every pull requests, a folder with the name of the pull request number will be created, so you can access all the history of the builds, in order to track changes and to keep the code for any kind of bug, for being, tested etc...

The address of the server hosting the distribution of the app is the following:

[Server address hosting the builds](http://bitweed.com/rock-paper-scissors/)

Clicking on the corresponding build number, you will open the corresponding version of the app, and you can see in the source files from the dev tools, all the files of the build.

## What you were going to do if you had few more time available

This is a list of things I would have liked to do if I had few more time for the task. Unfortunately working during the days the time I had was very limited. The list is casual and not ordered by importance:

- Introduction of different achievements like after x num of matches, after y num of victories, after z consecutive victories, etc...
- ESLINT task for check during the serve/publish and before to push
- Babel for transpiling all the code
- Deployment tasks for production/distribution, creating the files ready for production (concatenation, minify, uglify, etc...)
- Adding CI/CD with TravisCI which executes all the unit tests, all the e2e tests, and if everything is OK, upload the production version to a server, where the app will run
- Refactor better all the e2e tests code, grouping few code in the page objects so that it can be reusable across the e2e files, etc...
- Global e2e tests for testing for a while all the app, playing all the games, checking always the scores if are OK, etc...
- Use cucumber in order to have feature files for the e2e tests
- Adding a section where you explain the rules of each game
- Husky support
- Generate source maps of all the min files

## Possible issues

Here a list of possible issues you may encounter during the execution/exploration of the project

### Any kind of node dependency or issues with npm in general

Using a lot of technologies through **npm**, if you encounter any issue installing node dependencies, please let me know and I will check it out and provide you the solution for eventually fix them.

### E2E tests failures

When running the e2e tests, please be sure to keep close any other `gulp serve` process. The `gulp protractor-test` will start automatically it and it could fail if an instance is already up and running.

Sometimes it may happen when using e2e tests through selenium that the browser will not open or sync in time. In these cases simply stop the process and run again `gulp protractor-test`.