'use strict';

import React from 'react';
import Accordion from './Accordion';
import classNames from 'classnames';

require('../../../styles/Menu.sass');

let scrollStyles;

const Menu = React.createClass({

  getInitialState() {
    return {
      dropDownMenuVisible: false
    };
  },

  setStylesOnScrollSection() {
    let logo = this.refs.logo;
    scrollStyles = { height: window.innerHeight - logo.offsetHeight };
  },

  handleResize() {
    this.setStylesOnScrollSection();
  },

  componentDidMount() {
    this.setStylesOnScrollSection();
    window.addEventListener('resize', this.handleResize);
  },

  handleOnClick() {
    this.setState({
      dropDownMenuVisible: this.state.dropDownMenuVisible  ? false : true
    });
  },

  handleAdminModeClick() {
    this.props.toggleAdminMode();
  },

  render() {
    let categories = this.props.categories;
    let user = this.props.user;
    let dropDownMenuVisible = this.state.dropDownMenuVisible;
    let classes = classNames(
      {open: dropDownMenuVisible}
    );

    return (
        <div id='menu'>
          <div id='menu-inner'>
            <div id='menu-left'>
              <img alt='Logo' src='../images/logo.gif'/>
            </div>
            <div id='menu-right'>
              <div id='logo' ref='logo' onClick={this.handleOnClick} className={classes}>
                <h3>
                  The App Business <i className='fa fa-chevron-down'></i>
                </h3>
                <p>{user.displayName}</p>
                <ul className='dropdown-menu'>
                  <li><a href='/logout'>Sign out</a></li>
                  <li onClick={this.handleAdminModeClick}><a>Toggle Admin mode</a></li>
                </ul>
              </div>
              <div className='scroll' style={scrollStyles}>
                <Accordion userIsAdmin={this.props.userIsAdmin} categories={categories} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = Menu;
