jest.autoMockOff();

import React from 'react';
import { render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import classNames from 'classnames';

const Menu = require('../components/menu/Menu');

describe('Menu', function() {
  const user = {}
  const MenuElement = TestUtils.renderIntoDocument(<Menu user={user} />);

  describe('getInitialState()', function() {

    it('dropDownMenuVisible should be false', function() {
      expect(MenuElement.state.dropDownMenuVisible).toBe(false);
    });

  });

  describe('handleOnClick()', function() {

    it('dropDownMenuVisible should be true', function() {
      MenuElement.handleOnClick();
      expect(MenuElement.state.dropDownMenuVisible).toBe(true);
    });

    it('dropDownMenuVisible should be false', function() {
      MenuElement.handleOnClick();
      expect(MenuElement.state.dropDownMenuVisible).toBe(false);
    });

  });

});
