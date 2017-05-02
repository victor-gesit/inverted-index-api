[![Build Status](https://travis-ci.org/victor4l/inverted-index-api.svg?branch=master)](https://travis-ci.org/victor4l/inverted-index-api)
[![Coverage Status](https://coveralls.io/repos/github/victor4l/inverted-index-api/badge.svg?branch=phase1)](https://coveralls.io/github/victor4l/inverted-index-api?branch=phase1)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ce450d93fff943a09bc429b694b3dfbf)](https://www.codacy.com/app/victor4l/inverted-index-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=victor4l/inverted-index-api&amp;utm_campaign=Badge_Grade)
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
