'use strict';

module.exports = {
  queryClientResponse: {
    count: { type: 'integer' },
    items: { type: 'array', itemType: 'client' },
  },
};
