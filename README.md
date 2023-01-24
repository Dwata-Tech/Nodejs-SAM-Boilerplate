# Serveless SAM Boilerplate

SAM based serverless boilerplate using Nodejs as its runtime.

## Technologies

- Yarn

## Installation

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

## Pre-requisite

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- [Node.js](https://nodejs.org/) v16+ to run.

# How to run ?

### Step 1 :

- Install the dependencies and devDependencies and start the server.

**Install Node Modules**

```sh
yarn intsall
```

### Step 2 :

- Start the SAM application offline.

**Start Server**

```sh
yarn start
```

| Command            | Usage                                             |
| ------------------ | ------------------------------------------------- |
| yarn start         | Start the SAM app localy                          |
| yarn deploy        | Deploy SAM app (Can have all the SAM options)     |
| yarn deploy:guided | Deploy SAM app with cli guiding                   |
| yarn delete        | Delete the deployed stack. (parameter: stackname) |
