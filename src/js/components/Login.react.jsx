var React = require('react');
var Firebase = require('firebase');
var LoginButton = require('./LoginButton.react');
var UsersStore = require('../stores/UsersStore');
var Auth = require('../lib/Auth');

var ref = new Firebase('https://ss15-series-time.firebaseio.com/');

var Login = React.createClass({
  getInitialState: function Login__getInitialState() {
    return {
      loading: false,
      user: UsersStore.getCurrentUser(),
    };
  },

  componentDidMount: function Login__componentDidMount() {
    this.usersStoreListener = UsersStore.addChangeListener(this.onUsersChange);
  },

  componentWillUnmount: function Login__componentWillUnmount() {
    this.usersStoreListener.dispose();
  },

  onUsersChange: function Login__onUsersChange() {
    console.log('change');
    this.setState({
      user: UsersStore.getCurrentUser(),
    });
  },

  render: function Login__render() {
    var user;
    console.log('render', this.state.user.result, this.state.user);
    if (user = this.state.user.result) {
      var name = user[user.provider].displayName;
      return <button type="button" onClick={this._unauth}>Logout ({name})</button>;
    }

    var loginButtons = Object.keys(Auth.providers).map(function (key) {
        return (
          <LoginButton
            key={ key }
            provider={ key }
            name={ Auth.providers[key] }
            onClick={ this._auth }/>
        );
    }, this);

    return (
      <div>
        { loginButtons }
      </div>
    );
  },
  _auth: function Login___auth(provider) {
    if (this.state.loading) {
      return;
    }

    var component = this;

    Auth.login(provider).finally(function(){
      component.setState({ loading: false });
    }).catch(function(err){
      console.error(err);
    });
  },
  _unauth: function Login___unauth(e) {
    e.preventDefault();
    Auth.logout();
  }
});

module.exports = Login;