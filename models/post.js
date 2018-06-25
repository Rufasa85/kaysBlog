'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    post: DataTypes.TEXT,
    picone: DataTypes.STRING,
    pictwo: DataTypes.STRING
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};