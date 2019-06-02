'use strict';

module.exports = {
  user: {
    id: { type: 'integer', descrpition: '用户id' },
    username: { type: 'string', descrpition: '用户名 (64)' },
    password: { type: 'string', descrpition: '密码 (32)' },
    email: { type: 'string', descrpition: '邮箱 (32)' },
    nickname: { type: 'string', descrpition: '昵称 (32)' },
    position: { type: 'string', descrpition: '职位 (32)' },
    descrpition: { type: 'string', descrpition: '个人简介 (128)' },
    createdTime: { type: 'string', descrpition: '创建时间' },
    lastModifiedTime: { type: 'string', descrpition: '最后修改时间' },
  },
  client: {
    id: { type: 'string', description: '客户端id' },
    clientName: { type: 'string', description: '客户端名称' },
    clientSecret: { type: 'string', description: '客户端密钥' },
  },
};
