# react-redux-boilerplate-uncle
## "We all cried 'Uncle', but yet another boilerplate project appeared...",

#### Q: Alex, is what the world needs now another React boilerplate?
#### A: No. Just, no...
#### Q: Then why did you publish this repository?
#### A: Efficiency, expediency. The end result is to lower the barrier to starting a new react-redux project by reusing the set up and tooling that I've grown familiar with.

__There used to be 1,000 ways to set up a React project...__
__*Now there are 1,001*__

#### I understand that I may be the only person that ever uses this, but my goal was to add comments and notation that can help people that are in the process of getting acquainted with the React ecosystem. And if somebody else finds this boilerplate a useful starting point, bonus!

### local development server
`npm start`
Local development server available at: `http://localhost:8080/`

### build
`npm run build`
Create minified client bundle incorporating production version of React.js.
Outputs [index.html, bundle.js, supporting assets] to `/dist`

### test once
`npm run test`

### test and watch
`npm run test_watch`

### run e2e test

`npm run nightwatch`
Make sure you are currently running an instance of the webpack-dev-server with `npm run start` so that the tests will have access to the site via localhost:8080

This option takes advantage of the selenium-server-standalone package located in node_modules and installed during the `npm install` operation.

## some notes on tech and configuration:

* tests are included next to the modules they reference, with the naming scheme xxx.spec.js
* routing via react-router
* responsive layout via bootstrap-react
* ajax calls via axios

### folder organization:
* app
  * actions: redux actions
  * assets: lib css / fonts / images / lib js files
  * components: in process, should eventually be stateless functional components, but still contains some container logic
  * config: routing
  * containers: and process, should eventually be container logic, but probably also currently contains some stateless functional components
  * reducers: redux reducers
  * styles: app supports modular scss, but put global definitions here
  * utils: ajax route definitions, methods and configuration, variables for color codes
* dist
  * index.html / bundle.js / assets prepared by webpack
* test
  * css-modules-compiler: required for mocha testing to be able to make sense of scss
  * nightwatchTest: definition of e2e tests
