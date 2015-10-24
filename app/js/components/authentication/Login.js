'use strict';

var React = require('react/addons');

require('../../../styles/Login.sass');

var Login = React.createClass({

  render: function() {
    return (
      <div id="auth">
        <div className="container container-narrow">
          <div className="text-center">
            <h2>Sign in to React With TAB</h2>
            <a href="auth/google">test</a>
          </div>

          <script src="https://apis.google.com/js/platform.js" async defer></script>
          <meta name="google-signin-client_id" content="328354766394-2v20l3ggtoo2q69qttv07btohmhv2c6j.apps.googleusercontent.com"></meta>

          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
