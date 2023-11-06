# ApplicationDesigner

<div id="top"></div>

## About the project

Application Designer is a powerful tool that allows you to quickly create, customize, and generate code templates for your software projects. Built with NestJS and React, this application simplifies the process of setting up a project, defining entities and properties for a database, and generating code templates in multiple programming languages.

## Features

-   **Project Creation**: Easily create new software projects with the necessary folder structure and configurations.

-   **Entity and Property Management**: Define your project's entities and their properties for your database schema.

-   **Multi-Language Template Generation**: Generate code templates in various programming languages, saving you time and effort.

## Demo

Lien vers le site : [appDesigner](https://appdesigner.zedixi.com)

## Project status

| Status |           | Features                                                                   |
| :----- | :-------- | :------------------------------------------------------------------------- |
| ✅     | Auth      | Registration + eMail validation + Login + AccessToken + Password forgotten |
| ❌     | Auth      | Login with google...                                                       |
| ❌     | Auth      | Refresh_access_token                                                       |
| ❌     | Auth      | A user can edit his profil                                                 |
| ✅     | UML       | A user can create, update and delete projects, entities and properties     |
| ✅     | Generator | A user can generate files from entities                                    |
| ❌     | Generator | Create template engine (twig-style) instead of hard-coded template         |

## Built With

<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" title="React" alt="react" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://nestjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" title="nestJs" alt="nestjs" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="typescript" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" title="bootstrap" alt="bootstrap" width="40" height="40"/></a>

## Running it locally

-   create a `.env` file in `./back` folder (see `./back/.env.example` file)

#### With docker

-   Run `docker-compose up` in the root folder to start the application.

#### Without docker

-   Run `npm install` in `./back` and `./front` folders to install dependencies.
-   Configure the DB server
-   Run `npm run start:dev` in ./back folder.
-   Run `npm start` in ./front folder.

## What I've done

### Front-end <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" title="React" alt="react" width="40" height="40"/>

```

npx create-react-app front --template typescript

cd front

npm install @types/node @types/react @types/react-dom @types/jest
npm install react-router-dom  @types/react-router-dom
npm install bootstrap react-bootstrap react-router-bootstrap @types/react-bootstrap @types/react-router-bootstrap
npm install sass
npm install react-icons
npm install react-redux @reduxjs/toolkit react-redux
npm install date-fns
npm install styled-system styled-components @types/styled-components
npm install -D eslint prettier eslint-config-prettier
npm install eslint --init
npm install react-xarrows
npm install react-dotenv
npm install react-draggable

### npm install --save-dev dotenv


mkdir src/api
mkdir src/features
mkdir src/pages
mkdir src/store
mkdir src/styles
mkdir src/types
mkdir src/ui
mkdir src/utils


```

### Back-end <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" title="nestJs" alt="nestjs" width="40" height="40"/>

```

npm i -g @nestjs/cli
nest new back

cd back

npm install -D eslint prettier eslint-config-prettier
npm install eslint --init
npm install @nestjs/typeorm typeorm
npm install pg
npm install mysql2
npm install @nestjs/jwt
npm install @types/bcryptjs bcryptjs
npm install @nestjs/config
npm install --save @nestjs/passport @nestjs/jwt passport passport-local passport-jwt
npm install --save-dev @types/passport-local @types/passport-jwt
npm install --save @nestjs-modules/mailer nodemailer
npm install --save-dev @types/nodemailer
npm install --save handlebars
npm install date-fns


```
