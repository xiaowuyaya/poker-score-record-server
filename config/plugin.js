'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  io: {
    enable: true,
    package: 'egg-socket.io'
  }
}
