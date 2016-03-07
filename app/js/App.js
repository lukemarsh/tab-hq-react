'use strict';

import React  from 'react';
import {History} from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';
import Api from './utils/Api';
import CategoryStore from './stores/CategoryStore';
import UserStore from './stores/UserStore';
import AppStore from './stores/AppStore';
import SearchView from './components/search/SearchView';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';
import Header from './components/Header';
import ExecutionEnvironment from 'exenv';
import classNames from 'classnames';

require('../styles/main.sass');

function getStateFromStores() {
  return {
    allCategories: CategoryStore.getCategories(),
    isSearchInProgress: AppStore.isSearchInProgress(),
    user: UserStore.getUser()
  };
}

const App = React.createClass({
  mixins: [
    History,
    Reflux.listenTo(AppStore, '_onChange'),
    Reflux.listenTo(CategoryStore, '_onChange'),
    Reflux.listenTo(UserStore, '_onChange')
  ],

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  handleScroll() {
    this.refs.content.onScroll();
  },

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  },

  getInitialState() {
    let initialState = getStateFromStores();
    initialState.userIsAdmin = false;
    return initialState;
  },

  toggleAdminMode() {
    this.setState({
      userIsAdmin: this.state.userIsAdmin ? false : true
    });
  },

  redirectUnauthorizedUsers() {
    if (AppStore.userIsUnauthorized()) {
      this.history.pushState(null, '/login');
    }
  },

  _onChange() {
    this.setState(getStateFromStores());
    this.redirectUnauthorizedUsers();
  },

  toggleMobilePanel() {
    this.setState({
      mobilePanelVisible: this.state.mobilePanelVisible ? false : true
    });
  },

  getPageWrapperClasses() {
    let sectionsLength = 0;
    if (this.state.allCategories.length) {
      sectionsLength = this.state.allCategories[0].sections.length;
    }
    return classNames(
      {'page-wrapper': true},
      {'height-fix': sectionsLength === 0}
    );
  },

  render() {
    let MobilePanelVisible = this.state.mobilePanelVisible;
    let isSearchInProgress = this.state.isSearchInProgress;
    let classes = 'off-canvas-wrap';
    let userIsAdmin = this.state.userIsAdmin;
    let searchViewPlaceholder;
    let params = this.props.params;
    let user = this.state.user;
    let categories = this.state.allCategories;
    let pageWrapperClasses = this.getPageWrapperClasses();

    if (MobilePanelVisible) {
      classes += ' move-right';
    }

    if (isSearchInProgress) {
      classes += ' search-in-progress';
      searchViewPlaceholder = <SearchView />;
    }

    return (
      <div className={pageWrapperClasses}>
        {searchViewPlaceholder}
        <div className={classes}>
          <div className='inner-wrap'>
            <Header toggleMobilePanel={this.toggleMobilePanel} />
            <Menu user={user} userIsAdmin={userIsAdmin} categories={categories} toggleAdminMode={this.toggleAdminMode} />
            <Content userIsAdmin={userIsAdmin} params={params} categories={categories} ref='content' />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
