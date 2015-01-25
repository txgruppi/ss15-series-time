var React = require('react');

require('../../css/FriendWatcher');

var FriendWatcher = React.createClass({
  render: function () {
    return (
      <div className="friend-watcher">
        <img src="http://graph.facebook.com/tadeuzagallo/picture" className="friend-watcher__picture" />
        <div className="friend-watcher__name">
          Tadeu Zagallo
        </div>
      </div>
    );
  }
});

module.exports = FriendWatcher;