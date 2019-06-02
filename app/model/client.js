'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const clientSchema = require('../schema/client.js')(app);
  const Client = db.defineModel(app, 'client', clientSchema);

  Client.getClient = async (clientId, clientSecret) => {
    const params = {
      id: clientId,
    };
    if (clientSecret) {
      params.clientSecret = clientSecret;
    }
    return await Client.findOne({
      where: params,
    });
  };

  Client.find = async (params) => {
    return await Client.findOne({
      where: params,
      attributes: {
        exclude: ['clientSecret']
      },
    });
  };

  Client.query = async ({ attributes, offset, limit, filter = {}, sort = [] }) => {
    const order = app.getSortInfo(sort);
    const condition = {
      limit,
      offset,
      order,
      attributes,
    };

    return app.getPaginationData(await Client.findAndCountAll(condition));
  };

  return Client;
}