'use strict';

module.exports = {
  queryUserResponse: {
    count: { type: 'integer' },
    items: { type: 'array', itemType: 'user' },
  },
};
