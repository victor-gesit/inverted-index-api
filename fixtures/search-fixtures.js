// Test parameters for api/create route
export default {

  singleBookResult: {
    'single-book.json': {
      index: {
        eze: [0],
        goes: [0],
        was: [0],
        such: [0]
      },
      titles: {
        0: 'Eze goes'
      }
    }
  },

  // expected result for correct input from valid-file.json
  expectedResult: {
    index: {
      an: [0],
      into: [0, 1],
      inquiry: [0],
      is: [0, 1],
      string: [0],
      the: [1],
      this: [0],
      used: [1]
    },
    titles: {
      0: 'An inquiry into',
      1: 'Into the'
    }
  },
  badJSON: 'abc',

  /** Test parameters for api/search route */
  // A sample valid index submitted by the search query
  sampleValidIndex: {
    'book1.json': { index: {
      an: [0],
      into: [0, 1],
      inquiry: [0],
      is: [0, 1],
      string: [0],
      the: [1],
      this: [0],
      used: [1]
    }
    }
  },

  // Sample invalid indices
  invalidIndex: { index: {
    'bookX.json': { a: 'ABRACA DABRA' },
    'bookXX.json': { aboby: 'WASSUP YOU' }
  },
    terms: ['ABRACA', 'YOU']
  },

  invalidIndex2: { index: {
    'bookX.json': {
      index: { a: 'ABRACA DABRA' }
    }
  },
    terms: ['ABRACA']
  },

  invalidIndex3: { index: {
    'bookX.json': {
      index: { a: ['obi', 'nna'] }
    }
  },
    terms: ['obi']
  },
  /** Searching for a single term */
  searchTerm: 'into',  // A sample search term
  singleTermResult: {
    'book1.json': {
      into: [0, 1]
    }
  },  // The expected result from the search

  /** Searching for an array of terms */
  searchTermArray: ['an', 'into'], // A sample array of search terms

  // Expected result from the search
  arrayOfTermsResult: {
    'book1.json': {
      an: [0],
      into: [0, 1]
    }
  },

  /** Searching multiple indices ('All' option) */
  multipleIndices: {
    'book1.json': { index: {
      an: [0],
      into: [0, 1],
      inquiry: [0],
      is: [0, 1],
      string: [0],
      the: [1],
      this: [0],
      used: [1]
    }
    },
    'book2.json': { index: {
      an: [0, 1],
      boy: [0, 1],
      into: [0],
      lost: [0, 1],
      mango: [0],
      table: [1],
      train: [0],
      user: [1]
    }
    }
  },

  // Expected result
  multipleIndicesResult: {
    'book1.json': { into: [0, 1] },
    'book2.json': { into: [0] }
  },

  // Expected result
  multipleIndicesMultipleTermsResult: {
    'book1.json': { an: [0], into: [0, 1] },
    'book2.json': { an: [0, 1], into: [0] }
  },

  /** Handling a varied number of search terms */
  variedTermsResult: {
    'book1.json': {
      an: [0],
      inquiry: [0],
      into: [0, 1]
    }
  },

  fileNamedResult: {
    'book1.json': {
      an: [0],
      into: [0, 1]
    }
  },

  /** Test parameters for search route, using supertest */

  // Searching with a file name
  searchWithFileName: {
    index: {
      'book1.json': { index: {
        an: [0],
        into: [0, 1],
        inquiry: [0],
        is: [0, 1],
        string: [0],
        the: [1],
        this: [0],
        used: [1]
      }
      },
      'book2.json': { index: {
        an: [0, 1],
        boy: [0, 1],
        into: [0],
        lost: [0, 1],
        mango: [0],
        table: [1],
        train: [0],
        user: [1]
      }
      }
    },
    fileName: 'book1.json',
    terms: ['an', 'is']
  },

  searchWithFileNameResult: {
    'book1.json': {
      an: [0],
      is: [0, 1]
    }
  },

  // Searching without a file name
  searchWithoutFileName: {
    index: {
      'book1.json': { index: {
        an: [0],
        into: [0, 1],
        inquiry: [0],
        is: [0, 1],
        string: [0],
        the: [1],
        this: [0],
        used: [1]
      }
      },
      'book2.json': { index: {
        an: [0, 1],
        boy: [0, 1],
        into: [0],
        lost: [0, 1],
        mango: [0],
        table: [1],
        train: [0],
        user: [1]
      }
      }
    },
    terms: ['an', 'into']
  },

  searchWithoutFileNameResult: {
    'book1.json': {
      an: [0],
      into: [0, 1]
    },
    'book2.json': {
      an: [0, 1],
      into: [0]
    }
  },

  searchWithoutTerms: { index: {
    'book1.json': { index: {
      an: [0],
      into: [0, 1],
      inquiry: [0],
      is: [0, 1],
      string: [0],
      the: [1],
      this: [0],
      used: [1]
    }
    }
  }
  }

};
