'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    async getClient(clientId, clientSecret) {
      try {
        console.log('getClient invoked---------')
        const client = await this.ctx.model.Client.getClient(clientId, clientSecret);
        if (!client) return false;
        const res = {
          id: client.id,
          redirectUris: client.redirectUris ? client.redirectUris.split(',') : '',
          grants: client.grants ? client.grants.split(',') : '',
        };
        return res
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
     * 获取accessToken
     *
     * @param {*} bearerToken
     * @returns
     * @memberof Model
     */
    async getAccessToken(bearerToken) {
      console.log('getAccessToken invoked---------')
      try {
        const token = this.ctx.model.AccessToken.getAccessToken(bearerToken);
        if (!token) return;
        console.log(token)
        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          scoped: token.scoped,
          client: {
            id: token.clientId,
          },
          user: {
            id: token.userId,
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
     * @returns
     * @memberof Model
     */
    async saveToken(token, client, user) {
      try {
        console.log('saveAccessToken invoked---------')
        await this.ctx.model.AccessToken.saveAccessToken(token, client, user);
        await this.ctx.model.RefreshToken.saveRefreshToken(token, client, user);
        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          client: { id: client.id },
          user: { id: user.id },
        };
      } catch (err) {
        this.ctx.logger.debug(err);
        return false;
      }
    }

    /**
     * 获取refreshToken
     *
     * @param {*} refreshToken
     * @returns
     * @memberof Model
     */
    async getRefreshToken(refreshToken) {
      try {
        console.log('getRefreshToken invoked---------')
        const refToken = await this.ctx.model.RefreshToken.getRefreshToken(refreshToken)
        if (!refToken) return
        const user = await this.ctx.model.User.getByUserId({ id: refToken.userId })
        if (!user) return
        return {
          refreshToken: refToken.refreshToken,
          refreshTokenExpiresAt: refToken.refreshTokenExpiresAt,
          scope: refToken.scope,
          client: { id: refToken.clientId }, // with 'id' property
          user: user,
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 删除refreshToken
     *
     * @param {*} token
     * @returns
     * @memberof Model
     */
    async revokeToken(token) {
      try {
        console.log('revokeToken invoked---------')
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
     * @returns
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
        const user = await this.ctx.model.UserModel.getByUserId({ id: authCode.userId });
        if (!user) return
        return {
          code: authCode.code,
          expiresAt: authCode.expiresAt,
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user: user,
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
     * @returns
     * @memberof Model
     */
    async saveAuthorizationCode(code, client, user) {
      try {
        console.log('saveAuthorizationCode invoked---------')
        await this.ctx.model.AuthorizationCode.saveAuthorizationCode(code, client, user)
        return {
          authorization_code: code.authorization_code,
          expiresAt: code.expiresAt,
          redirectUri: code.redirectUri,
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
     * @returns
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