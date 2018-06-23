'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    post: DataTypes.TEXT
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};