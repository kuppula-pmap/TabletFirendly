# cosmos

Client side code for the cosmos application as well as a NodeJS server for local development.

## Setup

### Local Prerequisites to install on your system:

- [Git](http://git-scm.com)
- [Node](http://nodejs.org) & [npm](https://npmjs.org/) (npm is install with node, use installer from [http://nodejs.org/](http://nodejs.org/))
- If using a Mac, `Homebrew` is a great way to install and update programs like `Git` and `Node` on your system. [http://brew.sh](http://brew.sh)


### Installation (after you have installed prerequisites)

```
# clone the source code
$ git clone https://github.com/ProcessMAP/cosmos.git

# cd path to cloned source
$ cd cosmos

# install npm dependencies
$ npm install

# run the start script (build and start the sever)
$ npm start

```
- application runs at [http://localhost:2015/](http://localhost:2015/)
- go to the components API at [http://localhost:8080/doc/components.html](http://localhost:8080/doc/components.html)

## Git Workflow
This is the workflow all team members should be following in order to reduce file and merge conflicts during collaboration.

### Steps
```
  $ git checkout master
  $ git pull
  $ git checkout -b branch_name

  # Open Atom editor (or any other editor) and do your work
  $ atom .

  # Once completed, add files to git
  $ git add .
  $ git commit -m "#12: Commit message goes here..."
  $ git checkout master
  $ git pull
  $ git merge branch_name

  # Push changes back to master
  $ git push
```

## Back-end API

- TBD

## Technology Overview

* Local Development & Front-end Technology Stack
  * [JavaScript - ES6](http://www.ecma-international.org/ecma-262/6.0/index.html)
  * [Node](http://nodejs.org/)

* Local Server
  * [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)

* Package Manager
  * [Npm](https://npmjs.org/)

* Task Runner / Build Tool
  * [Webpack](https://webpack.github.io)
  * [Git hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) `> runs-on precommit` RUNS ON COMMIT!

* Module Dependency Manager & Optimizer
  * [Webpack](https://webpack.github.io)

* Application Structure
  * [React](https://facebook.github.io/react/)
  * Architecture (TBD - Flux / Reflux /etc)

* External library of reuseable front-end components
  * [React-Bootstrap](http://react-bootstrap.github.io)

* Quality Control
  * [Eslint](http://eslint.org)
  * [.editorConfig](http://editorconfig.org/)

* Local Unit Testing
  * [Jasmine](http://jasmine.github.io)
  * [Karma](http://karma-runner.github.io/0.13/index.html)

* Code Complexity Analysis
  * TBD

* Code Coverage
  * ??? [Istambul](http://gotwarlost.github.io/istanbul/)
  * ??? [Coveralls](https://coveralls.io/)

* Cloud/Hosted Continuous Integration
  * [Codeship](https://www.codeship.io/) or [CircleCI](https://circleci.com/about)

* Functional/Integration Testing
  * ?? [Browserstack](https://www.browserstack.com/automate/node) & [Bightwatchjs.org](http://nightwatchjs.org/)


## Development Notes

### Writing Code

* Any chance to remove complexity do it. Resist adding any abstracted code until its absolutely necessary and you completely understand what its doing.
* Comment code. Do it. Comment all methods/function. Comment patterns. Comment!

### Application Startup

* TBD

### Application Structure

* TBD

Folder structure example:
```
.
├── doc
│   ├── assets
│   ├── components.html
│   └── custom-components.html
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Login.js
│   ├── layouts
│   │   ├── main.js
│   │   ├── three-columns.js
│   │   └── two-columns.js
│   ├── modules
│   │   ├── bbs
│   │   │   └── pages
│   │   │       └── dashboard.js
│   │   └── global
│   │       └── pages
│   │           ├── 404.js
│   │           └── login.js
│   ├── styles
│   │   ├── css
│   │   └── sass
│   ├── themes
│   ├── utils
│   ├── app.js
│   └── index.html
├── test
│   └── components
│       └── LoginSpec.js
├── README.md
├── karma.conf.js
├── package.json
├── webpack.config.js
└── webpack.test.js

```

### Application Architecture

* TBD

### CSS

* Global styles are currently derived from bootstrap 3 (managed by npm).
* Follow the BEM/SMACSS naming convention for css classes.

e.g.

```
pm-block-name
pm-block-name__element-name
pm-block-name__element-name--modifier-name
pm-block-name--modifier-name
is-state
```

### Iconography

* You can refer to the directions and usage of SVG icons as Webfonts  [here](https://github.com/ProcessMAP/cosmos/blob/master/src/styles/css/README.md).

### NPM:

We use npm to manage all packages added to the application.

####NPM dependency packages

Here is a list of some dependency packages we are using in the app:

* [babel](https://babeljs.io)
* [bootstrap](http://getbootstrap.com)
* [eslint](http://eslint.org)
* [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin)
* [fs-extra](https://www.npmjs.com/package/fs-extra)
* [glob](https://www.npmjs.com/package/glob)
* [jasmine](http://jasmine.github.io)
* [karma](http://karma-runner.github.io/0.13/index.html)
* [lodash](https://lodash.com)
* [marked](https://www.npmjs.com/package/marked)
* [React](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [React-Bootstrap](http://react-bootstrap.github.io)
* [webpack](https://webpack.github.io)
* [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)


### Building the app

* Description TBD


### Browser & OS Support Matrix

- IE8+ (windows 7+)
- Chrome Latest (windows 7+, OSX ?)
- Safari Latest (windows 7+, OSX ?)
- Firefox Latest (windows 7+, OSX ?)
- Opera Latest (windows 7+, OSX ?)

### Bugs

- Bugs & Features: [https://github.com/ProcessMAP/mars-Issues/issues](https://github.com/ProcessMAP/mars-Issues/issues?state=open)
