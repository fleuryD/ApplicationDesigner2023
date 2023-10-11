# ApplicationDesigner 2023 - Front (react/typescript)

## Installation:

Si necessaire : &nbsp;&nbsp;&nbsp; `npm set registry=https://registry.npmjs.org/`

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

#	npm install react-hook-form
#	npm install socket.io-client
#	npm install socket.io @nestjs/websockets @nestjs/platform-socket.io
#	npm install react-game-engine
#	yarn add react-color
#	yarn add react-ga4
#	yarn add react-charts@beta  // not used yet
#	yarn add react-to-print
#	yarn add axios
#	yarn add eslint-config-react-app -D    // pour corriger : "Failed to load config "react-app" to extend from."

```

## Creer: `/front/.prettierrc.json`

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

## Editer: `/front/tsconfig.json`

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

## Editer: `/front/package.json`

Permet de faire des import en chemin absolu depuis /src/

```
{
	"scripts": {
		"start": "set PORT=3001 && PORT=3001 react-scripts start --max-http-header-size=64555",
		"startback": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject"
	},
	"proxy": "http://localhost:3001",
}

```

## Structure

```
mkdir src/features
mkdir src/pages
mkdir src/styles
mkdir src/types
mkdir src/ui
mkdir src/utils
```

#########################################################

## Pas fait

-   DELETE : package-lock.json

*   COPIER : .eslintrc.json
*   AJOUTER à : .gitignore
    /- - - BONUS - - - IGNORED
*   EDITER : .htaccess

F1 > Peacock: Enter a color

#########################################################
