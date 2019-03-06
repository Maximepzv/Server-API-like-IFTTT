const action1 = require('./actions/action1');
const action2 = require('./actions/action2');
const clock = require('./actions/clock');

const reaction1 = require('./reactions/reaction1');
const reaction2 = require('./reactions/reaction2');

module.exports = {
  actions: {
      'action1': action1.start,
      'action2': action2.start,
      'clock': clock.start
  },
  reactions: {
      'reaction1': reaction1.start,
      'reaction2': reaction2.start
  }
};
