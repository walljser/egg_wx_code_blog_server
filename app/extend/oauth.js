'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    async getClient(client_id, client_secret) {
      try {
        console.log('getClient invoked---------')
        const client = await this.ctx.model.Client.getClient(client_id, client_secret);
        if (!client) return false;
        const res = {
          id: client.id,
          redirect_uris: client.redirect_uris ? client.redirect_uris.split(',') : '',
          grants: client.grants ? client.grants.split(',') : '',
        };
        return res;
      } catch (err) {
        this.ctx.logger.debug(err);
        return false;
      }
    }

    async getUser(username, password) {
      try {
        console.log('getUser invoked---------')
        const user = await this.ctx.model.User.getUser(username, password);
        return user;
      } catch (err) {
        return false;
      }
    }

    /**
     * 获取access_token
     *
     * @param {*} bearerToken breaer
     * @return
     * @memberof Model
     */
    async getAccessToken(bearerToken) {
      console.log('getAccessToken invoked---------');
      try {
        const token = await this.ctx.model.AccessToken.getAccessToken(bearerToken);
        if (!token) return;
        return {
          accessAoken: token.access_token,
          accessTokenExpiresAt: token.access_token_expires_at,
          scoped: token.scoped,
          client: {
            id: token.client_id,
          },
          user: {
            id: token.user_id,
          },
        };
      } catch (err) {
        this.ctx.logger.debug(err);
        return false;
      }
    }

    /**
     * 保存token
     *
     * @param {*} token
     * @param {*} client
     * @param {*} user
     * @return
     * @memberof Model
     */
    async saveToken(token, client, user) {
      try {
        console.log('saveToken invoked---------')
        await this.ctx.model.AccessToken.saveAccessToken(token, client, user);
        await this.ctx.model.RefreshToken.saveRefreshToken(token, client, user);
        const res = {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          client: { id: client.id },
          user: { id: user.id },
        };
        console.log(res);
        return res;
      } catch (err) {
        this.ctx.logger.debug(err);
        return false;
      }
    }

    /**
     * 获取refresh_token
     *
     * @param {*} refresh_token
     * @return
     * @memberof Model
     */
    async getRefreshToken(refresh_token) {
      try {
        console.log('getRefreshToken invoked---------');
        const refToken = await this.ctx.model.RefreshToken.getRefreshToken(refresh_token)
        if (!refToken) return;
        const user = await this.ctx.model.User.getByUserId({ id: refToken.user_id })
        if (!user) return;
        return {
          refresh_token: refToken.refresh_token,
          refresh_token_expires_at: refToken.refresh_token_expires_at,
          scope: refToken.scope,
          client: { id: refToken.client_id }, // with 'id' property
          user,
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 删除refresh_token
     *
     * @param {*} token
     * @return
     * @memberof Model
     */
    async revokeToken(token) {
      try {
        console.log('revokeToken invoked---------');
        await this.ctx.model.RefreshToken.delRefreshToken(token);
      } catch (error) {
        this.ctx.logger.debug(error);
        return false;
      }
    }

    /**
     * 获取授权码 authorizationCode
     *
     * @param {*} authorizationCode
     * @return
     * @memberof Model
     */
    async getAuthorizationCode(authorizationCode) {
      try {
        console.log('getAuthorizationCode invoked---------')
        console.log('authorizationCode : ', authorizationCode);
        const authCode = await this.ctx.model.AuthorizationCode.queryAuthorizationCode({
          code: authorizationCode,
        });
        if (!authCode) return;
        const user = await this.ctx.model.UserModel.getByUserId({ id: authCode.user_id });
        if (!user) return;
        return {
          code: authCode.code,
          expires_at: authCode.expires_at,
          redirect_uri: authCode.redirect_uri,
          scope: authCode.scope,
          client: { id: authCode.client_id },
          user,
        };
      } catch (error) {
        this.ctx.logger.debug(error);
        return false;
      }
    }

    /**
     * 保存授权码
     *
     * @param {*} code
     * @param {*} client
     * @param {*} user
     * @return
     * @memberof Model
     */
    async saveAuthorizationCode(code, client, user) {
      try {
        console.log('saveAuthorizationCode invoked---------')
        await this.ctx.model.AuthorizationCode.saveAuthorizationCode(code, client, user);
        return {
          authorization_code: code.authorization_code,
          expires_at: code.expires_at,
          redirect_uri: code.redirect_uri,
          scope: code.scope,
          client: { id: client.id },
          user: { id: user.id },
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 删除授权码
     *
     * @param {*} code
     * @return
     * @memberof Model
     */
    async revokeAuthorizationCode(code) {
      try {
        console.log('revokeAuthorizationCode invoked---------')
        return await this.ctx.model.AuthorizationCode.delAuthorizationCode(code);
      } catch (err) {
        return false;
      }
    }
  }

  return Model;
};