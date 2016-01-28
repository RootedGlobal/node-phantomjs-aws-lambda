# PhantomJS Lambda Template

A [PhantomJS](http://phantomjs.org/) node.js app for [Amazon Lambda](http://aws.amazon.com/lambda/). Based on [node-lambda-template](https://github.com/rebelmail/node-lambda-template) using [node-lambda](https://github.com/rebelmail/node-lambda). The app includes a PhantomJS binary (`phantomjs`) compiled for AWS Linux (https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2).

## Setup

Install dependencies using npm. It'll install the AWS SDK as well as PhantomJS on the development machine.

```shell
npm install
```

## Usage

After installing use the following `npm` commands as described below. They're only wrapping the `node-lambda` functionality to allow `node-lambda` to be installed only locally. Additional params can be provided using `-- args`. For a list of available options see the `node-lambda` [documentation](https://github.com/RebelMail/node-lambda).

Run the setup command to generate the environment file with the configuration used for the Amazon Lambda function. Edit the resulting `.env.` file with your custom settings.

For this you need to have aws account and fill out confuguration in `.env` file:

AWS_ACCESS_KEY_ID=your_aws_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_ROLE_ARN=your_amazon_role
AWS_REGION=us-east-1
....
```shell
npm run setup
```

To run the function locally execute the following command.
```shell
npm run start
```

Run the following command to deploy the app to Amazon Lambda. 
```shell
npm run deploy
```

> **Note:** npm version 2.x or newer required to pass arguments to the scripts using `-- args`

## Building phantomjs

If you want to use a different version of phantomjs or have trouble with the included version, follow the instructions in [build-phantomjs.sh](build-phantomjs.sh).
