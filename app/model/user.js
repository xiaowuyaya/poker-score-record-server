module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    user_id: { type: INTEGER, primaryKey: true },
    nick_name: { type: STRING },
    avatar_url: { type: STRING },
    province: { type: STRING },
    city: { type: STRING },
    gender: { type: INTEGER },
    openid: { type: STRING },
    create_time: { type: DATE },
    last_login: { type: DATE },
  }, {
    tableName: 't_user',
    timestamps: false,
  });

  return User;
};
