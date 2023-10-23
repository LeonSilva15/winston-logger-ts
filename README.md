# Winston Logger

This project is meant to be a guideline for the Winston usage following the proposed best practices.

## Setup
This project uses `Node.js` and `Express` so make sure, we have `node` and `npm` it installed.
> https://nodejs.org/en/download
```
node --version
npm --version
```

Using deven is an option too. [Nodeenv installation](https://ekalinin.github.io/nodeenv/), or:
```
brew install nodeenv
```

### Install dependencies and setup using npm in the project root directory
```
npm install
```

### Run the Express server
```
npm run dev
```
Your server will run on `http://localhost:8000/` by defualt.

## Here are some useful resources:

* Easy tutorial to setup `Express` with `Typescript` in case you're interested: [dev.to tutorial](https://dev.to/cristain/how-to-set-up-typescript-with-nodejs-and-express-2023-gf)
* Create a Node.js virtual environment: [Nodeenv tutorial](https://ekalinin.github.io/nodeenv/)
* Winston official readme: [Winston github](https://github.com/winstonjs/winston/tree/master)
* Winston official examples: [Winston examples](https://github.com/winstonjs/winston/tree/master/examples)
* Winston Loggin in Node.js: [Winston on Node.js guide](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/)
* Winston with typescript blog post: [Winston with Typescript](https://kimsereylam.com/typescript/2021/12/03/winston-logger-with-typescript.html)
* Winston tutorial with a sample Nodejs application: [Winston Node.js tutorial](https://signoz.io/blog/winston-logger/)
* Winston Stack Overflow good questions:
    * [Winston Logger Names](https://stackoverflow.com/questions/12238199/winston-logger-names)
    * [Winston 3.0 colorize whole output on console](https://stackoverflow.com/questions/51012150/winston-3-0-colorize-whole-output-on-console)
    * [can I change the color of log data in winston?](https://stackoverflow.com/questions/47133451/can-i-change-the-color-of-log-data-in-winston)
    * [How to colorize parts of log message in winstonJs](https://stackoverflow.com/questions/70466761/how-to-colorize-parts-of-log-message-in-winstonjs)
    * [how to use winston to setup log in a sub directory instead of root directory?](https://stackoverflow.com/questions/24220081/how-to-use-winston-to-setup-log-in-a-sub-directory-instead-of-root-directory)
    * [Winston doesn't pretty-print to console](https://stackoverflow.com/questions/17963406/winston-doesnt-pretty-print-to-console)
    * [Remove all loggers from winston container](https://stackoverflow.com/questions/55589792/remove-all-loggers-from-winston-container)
