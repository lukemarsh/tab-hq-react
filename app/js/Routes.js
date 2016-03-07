'use strict';

import React from 'react';
import {Router, Route } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'
const history = createHashHistory({ queryKey: false })

import Api from './utils/Api';
import Login from './components/authentication/Login';
import App from './App';

Api.getAllCategories();
Api.getUser();

export default (
  <Router history={history}>
    <Route path='/' component={App} />
    <Route path='/section/:sectionId' component={App}/>
    <Route path='/login' component={Login}/>
  </Router>
);
