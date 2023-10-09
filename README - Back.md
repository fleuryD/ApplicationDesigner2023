# ApplicationDesigner 2023 - Back (NestJs/typescript)

## Installation:

```
npm i -g @nestjs/cli
nest new back

cd back

npm install -D eslint prettier eslint-config-prettier
npm install eslint --init
npm install @nestjs/typeorm typeorm
npm install pg
npm install @nestjs/jwt
npm install -D @types/bcrypt
npm install bcrypt


		"@nestjs/mapped-types": "*",
		"@nestjs/passport": "^10.0.1",
		"cookie-parser": "^1.4.6",
		"esm": "^3.2.25",
		"multer": "^1.4.5-lts.1",
		"node-fetch": "^2.7.0",
		"otplib": "^12.0.1",
		"passport": "^0.6.0",
		"passport-jwt": "^4.0.1",
		"passport-local": "^1.0.0",



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
