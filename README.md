# ApplicationDesigner

<div id="top"></div>

## About the project

Application Designer is a powerful tool that allows you to quickly create, customize, and generate code templates for your software projects. Built with NestJS and React, this application simplifies the process of setting up a project, defining entities and properties for a database, and generating code templates in multiple programming languages.

## Features

-   **Project Creation**: Easily create new software projects with the necessary folder structure and configurations.

-   **Entity and Property Management**: Define your project's entities and their properties for your database schema.

-   **Multi-Language Template Generation**: Generate code templates in various programming languages, saving you time and effort.

## Project status

| Status |           | Features                                                            | Notes |
| :----- | :-------- | :------------------------------------------------------------------ | ----- |
| ✅     | Auth      | Registration + email validation                                     |       |
| ✅     |           | Login + access_token                                                |       |
| ❌     |           | Login with google...                                                |       |
| ❌     |           | Refresh_access_token                                                |       |
| ❌     |           | Password forgotten                                                  |       |
| ❌     |           | A user can edit his profil                                          |       |
| ✅     | UML       | A user can create, update and delete projects, entities and attrtes |       |
| ✅     | Generator | A user can generate files from entities                             |       |
| ❌     |           | Use template (twig-style) instead of hard-coded template            |       |

## Built With

-   [React](https://reactjs.org)
-   [nestJs](https://nestjs.com/)
-   [TypeScript](http://typescriptlang.org)

## Getting started

### Running it locally

-   create a `.env` file in `./back` folder (see `.env.example` file)

-   Run `yarn` to install dependencies.
-   Run `yarn build:watch` to start webpack in watch mode.
-   Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

## Demo
