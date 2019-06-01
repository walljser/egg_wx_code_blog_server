'use strict';

module.exports = {
  user: {
    id: { type: 'string', descrpition: '用户id' },
    username: { type: 'string', descrpition: '用户名 (64)' },
    password: { type: 'string', descrpition: '密码 (32)' },
    email: { type: 'string', descrpition: '邮箱 (32)' },
    nickname: { type: 'string', descrpition: '昵称 (32)' },
    position: { type: 'string', descrpition: '职位 (32)' },
    descrpition: { type: 'string', descrpition: '个人简介 (128)' },
    created_time: { type: 'string', descrpition: '创建时间' },
    last_modified_time: { type: 'string', descrpition: '最后修改时间' },
  },
};
