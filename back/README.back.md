# ApplicationDesigner 2023 - Back (NestJs/typescript)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation:

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

`nest new` demande de choisir le package manager --> npm

## xxxxxxxxxxxxxxxxxxxxxxxxx Creer: `/front/.prettierrc.json`

```
{
	"semi": false,
	"singleQuote": false,
	"tabWidth": 4,
	"trailingComma": "es5",
	"endOfLine": "lf",
	"printWidth": 80,
	"jsxBracketSameLine": false,
	"useTabs": true
}

```

##xxxxxxxxxxxxxxxxxxxxxxxxx Editer: `/front/tsconfig.json`

Permet de faire des import en chemin absolu depuis /src/

```
{
	"compilerOptions": {
			...,
			"baseUrl": "src",
			"rootDir": "src",
			"outDir": "build"
		},
	........
}

```

## Run (sans docker)

```
npm run start:dev
```
