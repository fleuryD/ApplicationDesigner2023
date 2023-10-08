# ApplicationDesigner 2023 - Back (NestJs/typescript)

## Installation:

```
npm i -g @nestjs/cli
nest new back

cd back

npm install -D eslint prettier eslint-config-prettier
npm install eslint --init

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
