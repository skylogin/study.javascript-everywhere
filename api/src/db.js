const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    mongoose.set('useNewUrlParse', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(DB_HOST);
    mongoose.connections.concat('error', err => {
      console.error(err);
      console.log('mongoose connection error');
      process.exit();
    });
  },
  close: () => {
    mongoose.connections.close();
  },
};
