jest.autoMockOff();

import React from 'react';
import { render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import classNames from 'classnames';

const App = require('../App');

describe('App', function() {

  const AppElement = TestUtils.renderIntoDocument(<App />);

  describe('getInitialState()', function() {

    it('allCategories should be an empty array', function() {
      expect(AppElement.getInitialState().allCategories.length).toEqual(0);
    });

    it('userIsAdmin should be false', function() {
      expect(AppElement.state.userIsAdmin).toBe(false);
    });

    it('isSearchInProgress should be false', function() {
      expect(AppElement.state.isSearchInProgress).toBe(false);
    });

  });

  describe('toggleAdminMode()', function() {

    it('userIsAdmin should be true', function() {
      AppElement.toggleAdminMode();
      expect(AppElement.state.userIsAdmin).toBe(true);
    });

    it('userIsAdmin should be false', function() {
      AppElement.toggleAdminMode();
      expect(AppElement.state.userIsAdmin).toBe(false);
    });

  });

  describe('toggleMobilePanel()', function() {

    const mobilePanelButton = TestUtils.scryRenderedDOMComponentsWithClass(AppElement, 'navbar-toggle')[0];
    const pageContainer = TestUtils.scryRenderedDOMComponentsWithClass(AppElement, 'off-canvas-wrap')[0];

    it('Closed mobile panel', function() {
      expect(pageContainer.classList.toString()).not.toContain('move-right');
    });

    it('Open mobile panel', function() {
      TestUtils.Simulate.click(mobilePanelButton);
      expect(pageContainer.classList.toString()).toContain('move-right');
    });

  });

  describe('getPageWrapperClasses()', function() {
    it ('height-fix class should be applied if there are no categories', function() {
      expect(AppElement.getPageWrapperClasses()).toContain('height-fix');
    });

    afterEach(function() {
      AppElement.state.allCategories = [{
        id: 1,
        sections: [{}]
      }];
    });

    it ('height-fix class should not be applied if there are sections', function() {
      expect(AppElement.getPageWrapperClasses()).not.toContain('height-fix');
    });

  });

});
