CREATE DATABASE db_code_blog;

USE db_code_blog;

drop table if exists user;

CREATE TABLE user
(
  id                      bigint not null auto_increment comment '用户id',
  username                varchar(32) comment '账号',
  password                varchar(32) comment '密码',
  nickname                varchar(32) comment '昵称',
  position                varchar(32) comment '职称',
  description             varchar(128) comment '简介',
  created_time             Date comment '创建时间',
  primary key(id)
)
auto_increment = 100000
DEFAULT CHARACTER SET = utf8;

ALTER table t_user comment '用户表';