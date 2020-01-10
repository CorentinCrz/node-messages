'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  return Message;
};