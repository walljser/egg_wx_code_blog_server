'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const clientSchema = require('../schema/client.js')(app);
  const Client = db.defineModel(app, 'client', clientSchema);

  Client.getClient = async (client_id, client_secret) => {
    const params = {
      id: client_id,
    };
    if (client_secret) {
      params.client_secret = client_secret;
    }
    return await Client.findOne({
      where: params,
    });
  };

  Client.find = async params => {
    return await Client.findOne({
      where: params,
      attributes: {
        exclude: [ 'client_secret' ],
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
};
