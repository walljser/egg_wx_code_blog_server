'use strict';

const _ = require('lodash');
// const fecha = require('fecha');

module.exports = {
  // formatToDayTime(date) {
  //   return fecha.format(date, 'YYYY-MM-DD HH:mm')
  // }
  getSortInfo(sort) {
    return _.isEmpty(sort) ? [[ 'created_time', 'DESC' ]] : sort;
  },
  getPaginationData({ rows, count }) {
    return {
      count,
      items: rows,
    };
  },
};
