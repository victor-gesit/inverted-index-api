[![Build Status](https://travis-ci.org/victor4l/inverted-index-api.svg?branch=master)](https://travis-ci.org/victor4l/inverted-index-api)
[![Coverage Status](https://coveralls.io/repos/victor4l/inverted-index-api/badge.svg?branch=master)](https://coveralls.io/r/victor4l/inverted-index-api?branch=master)
# inVidex

## Introduction
* **`inVidex`** is a NodeJS Powered implementation of the inverted index data structure for finding what word is in what 'book'. A 'book' is an entry in a document structured as a JSON array. Here is a sample document:

```
[
  {
      “title”: “An inquiry into the wealth of nations”,
      “text”: “This string seeks to help you understand the problem set”
  },
  {
      “title”: “From third world to first world”,
      “text”: “This string is also to help you understand the problem set”
  }
]

```
or

```
  {
      "title": "From third world to first world",
      "text": "This string is also to help you understand the problem set"
  }

```

## Dependencies

### Backend Dependencies
 This app's functionality depends on multiple NodeJS packages
* [NodeJS](https://nodejs.org/) This is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for installing and managing the dependencies.
* [Express](https://expressjs.com/) This is used to create the web routes/endpoints.
* [Body-Parser](https://www.npmjs.com/package/body-parser) This is used for parsing the content of forms sent to the web app.
* [dotenv](https://www.npmjs.com/package/dotenv) This handles the management and dynamic assignment of environmental variables
