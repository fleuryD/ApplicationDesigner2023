# ApplicationDesigner

<div id="top"></div>

<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" title="React" alt="react" width="50" height="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://nestjs.com/" target="_blank" rel="noreferrer"><img src="https://static.cdnlogo.com/logos/n/57/nestjs.svg" title="nestJs" alt="nestjs" width="50" height="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="typescript" width="50" height="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" title="bootstrap" alt="bootstrap" width="50" height="50"/></a>

## About the project

Application Designer is a powerful tool that allows you to quickly create, customize, and generate code templates for your software projects. Built with NestJS and React, this application simplifies the process of setting up a project, defining entities and properties for a database, and generating code templates in multiple programming languages.

![Screenshot](./assets/ad-screen.png)

## Features

- **Project Creation**: Easily create new software projects with the necessary folder structure and configurations.

- **Entity and Property Management**: Define your project's entities and their properties for your database schema.

- **Multi-Language Template Generation**: Generate code templates in various programming languages, saving you time and effort.

## Demo

Lien vers le site : [appDesigner](https://appdesigner.zedixi.com)

## Built With

<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" title="React" alt="react" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://nestjs.com/" target="_blank" rel="noreferrer"><img src="https://static.cdnlogo.com/logos/n/57/nestjs.svg" title="nestJs" alt="nestjs" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="typescript" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" title="bootstrap" alt="bootstrap" width="40" height="40"/></a>

## Running it locally

- create a `.env` file in `./back` folder (see `./back/.env.example` file)

#### With docker

- Run `docker-compose up` in the root folder to start the application.

#### Without docker

- Run `npm install` in `./back` and `./front` folders to install dependencies.
- Configure the DB server
- Run `npm run start:dev` in ./back folder.
- Run `npm start` in ./front folder.
