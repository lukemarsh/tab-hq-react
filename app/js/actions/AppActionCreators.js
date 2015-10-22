'use strict';

import Api from '../utils/Api';
import Reflux from 'reflux';

var AppActions = Reflux.createActions([
  'search',
  'closeSearchView',
  'receiveSearchResults'
]);

AppActions.search.listen(function(query) {
  Api.search(query);
});

export default AppActions;