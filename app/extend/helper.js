'use strict';

const uuidv1 = require('uuid/v1');

module.exports = {
  uuidv1,

  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
