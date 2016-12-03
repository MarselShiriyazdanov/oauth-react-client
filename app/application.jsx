import 'stylesheets/application';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import appHistory from 'services/history';
import { requireAuth, checkPassword } from 'helpers/routes';
import Application from 'components/application';
import Main from 'components/main';
import About from 'components/about';
import Article from 'components/article';
import Profile from 'components/profile';
import Password from 'components/password';
import EmailConfirmation from 'components/email_confirmation';

render((
  <Router history={ appHistory }>
    <Route component={ Application } onEnter={ checkPassword }>
      <Route path="/" component={ Main }/>
      <Route
        path="about"
        component={ About }
        onEnter={ requireAuth }
      >
        <Route path="extended/:id" component={ Article }/>
      </Route>
      <Route path="profile" component={ Profile } onEnter={ requireAuth }/>
      <Route path="password" component={ Password } onEnter={ requireAuth }/>
      <Route path="users/confirmation" component={ EmailConfirmation }/>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
), document.getElementById('app'));
