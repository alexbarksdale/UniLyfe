# UniLyfe
***Documentation is still in early development***

## Table of Contents

* [About](#about)
  * [Technologies - Web App](#tech-frontend)
  * [Technologies - API](#tech-frontend)
* [Getting Started](#getting-started)
  * [Installation - Web App](#installation-frontend)
  * [Installation - API](#installation-backend)

## About
UniLyfe is a platform for verified university students to network, chat, and share their ideas while remaining anonymous. With peace of mind knowing only verified students can register. The goal was to create an environment where students could openly discuss their opinions or ideas.

<a name="tech-frontend"></a>
## Technologies - Web App
* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [GraphQL Codegen](https://graphql-code-generator.com/)

<a name="tech-backend"></a>
## Technologies - API
* [Typescript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Apollo GraphQL](https://www.apollographql.com/) 
* [PostgreSQL](https://www.postgresql.org/)
* [TypeORM](https://typeorm.io/#/)
* [JWT](https://jwt.io/)

<a name="getting-started"></a>
## Getting Started
You must install both the **web app** and **UniLyfe API** to run this project properly.

#### Docker documentation coming soon!

<a name="installation-frontend"></a>
## Installation - Web App
**IMPORTANT!** The web app depends on the [UniLyfe API](#installation-backend) to run!

This project will be installed with [yarn](https://yarnpkg.com/). Please feel free to use any other package manager you prefer.

<a name="prereq-frontend"></a>
### Prerequisites
1. If you haven't already, install [Node.js](https://nodejs.org/en/download/). You should be able to run the following commands if you installed it properly.

```
$ node --version
$ npm --version
```
2. Clone the repository:
`$ git clone https://github.com/alexbarksdale/UniLyfe.git`

2. Register for a [Filestack API key](https://www.filestack.com/).  This project utilizes their file handling service to upload images for posts.
3. Navigate to `$ cd packages/frontend` and rename `.env_example` to `.env` and place your key next to `REACT_APP_FILESTACK_API_KEY=`.

### Install
1. Navigate to the web app directory: `$ cd packages/frontend`

2. Install the necessary packages: `$ yarn`

3. Start the project: `$ yarn start`

<a name="installation-backend"></a>
## Installation - API

This project will be installed with [yarn](https://yarnpkg.com/). Please feel free to use any other package manager you prefer.

<a name="prereq-backend"></a>
### Prerequisites
1. If you haven't already, install [Node.js](https://nodejs.org/en/download/). You should be able to run the following commands if you installed it properly.

```
$ node --version
$ npm --version
```
2. Install [PostgreSQL](https://www.postgresql.org/).
3. Navigate to the API directory `$ cd packages/backend`
4. Open `ormconfig.json` and configure the necessary settings for your database.
5. Rename `.env_example` to `.env` and fill out the necessary environment variables.

### Install
1. Navigate to the API directory: `$ cd packages/backend`

2. Install the necessary packages: `$ yarn`

3. Start the project: `$ yarn start`

### API Documentation coming soon...
