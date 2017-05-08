[![Build Status](https://travis-ci.org/victor4l/inverted-index-api.svg?branch=sever-side)](https://travis-ci.org/victor4l/inverted-index-api)
[![Coverage Status](https://coveralls.io/repos/github/victor4l/inverted-index-api/badge.svg?branch=server-side)](https://coveralls.io/github/victor4l/inverted-index-api?branch=server-side)
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
* [body-parser](https://www.npmjs.com/package/body-parser) This parses the request into a body that can be accessed.
* [multer](https://github.com/expressjs/multer) This handles file uploads to the app

## Installation guide
To run the app,
* Clone this repository
* Run `npm install` at the root of the project folder to install dependencies
* Run `npm start` or `gulp serve` to run the app
* Connect to port `8001` on your local host

## Usage

### With [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
#### Creating Index
* Set the address to `localhost:8001/api/create and Method to POST
* Choose `form-data` in the `Body` category of the type of data to send
* Set a key called `files` and set it's type to file
* Ensure there are no headers set, delete any that exists
* Click on `Choose Files` to select files from your local storage (Files must meet the specs stated earlier)
* Click on send to get and index object for the content of the files uploaded.

#### Searching Index
* Copy the index created by the api/create route
* Create a new tab on `Postman`
* Set the address to `localhost:8001/api/search and method to POST
* Choose `x-www-form-urlencoded` in the body category of the type of data to send
* Set a key of `index`, and for the value, put in the copied index
* Set a key of `terms`, and set it to the terms to search for (space separated or comma separated, either way)
* Set an optional key of fileName, and set it to the name of the file whose indexed content you want to search
* Click send to get a response of each term you searched, and an array of numbers indicating what book they appear in

## Running on Heroku
* Connect to `not yet ready` and follow the steps stated above. Change the url path accordingly, to switch from create to search index

## Sample Outputs

* If a file containing
```
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "Eze goes to School",
    "text": "Eze was such a funny kid at school while alice is in wonderland"
  }
]
```
has its index created, the result would be
```
{
  "book1.json": {
    "index": {
      "a": [0, 1],
      "alice": [0, 1],
      "and": [0],
      "at": [1],
      "enters": [0],
      "eze": [1],
      "falls": [0],
      "full": [0],
      "funny": [1],
      "goes": [1],
      "hole": [0],
      "imagination": [0],
      "in": [0, 1],
      "into": [0],
      "is": [1],
      "kid": [1],
      "of": [0],
      "rabbit": [0],
      "school": [1],
      "such": [1],
      "to": [1],
      "was": [1],
      "while": [1],
      "wonderland": [0, 1],
      "world": [0]
    },
    "titles": {
      "0": "Alice in Wonderland",
      "1": "Eze goes to School"
    }
  }
}
```
* If the above generated index is queried queried, for `eze`, `wonderland` and `world`, the result would be

```
{
  "book1.json": {
    "eze": [
      1
    ],
    "wonderland": [
      0,
      1
    ],
    "world": [
      0
    ]
  }
}

```