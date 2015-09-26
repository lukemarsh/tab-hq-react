'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CategoryConstants = require('../constants/CategoryConstants');
var SectionConstants = require('../constants/SectionConstants');

var ActionTypes = CategoryConstants.ActionTypes;
var SectionActionTypes = SectionConstants.ActionTypes;

module.exports = {
  receiveAll: function(rawCategories) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_CATEGORIES,
      rawCategories: rawCategories
    });
  },

  receiveCreatedCategory: function(createdCategory) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_CATEGORY,
      rawCategory: createdCategory
    });
  },

  receiveUpdatedCategory: function(updatedCategory) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_CATEGORY,
      rawCategory: updatedCategory
    });
  },

  receiveUpdatedCategories: function(updatedCategories) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_UPDATED_CATEGORIES,
      rawCategories: updatedCategories
    });
  },

  receiveDeletedCategory: function(categoryId) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_DELETED_CATEGORY,
      category_id: categoryId
    });
  },

  receiveCreatedSection: function(categoryId, sections) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_CREATED_SECTION,
      category_id: categoryId,
      sections: sections
    });
  },

  receiveDeletedSection: function(categoryId, sectionId) {
    AppDispatcher.dispatch({
      type: SectionActionTypes.RECEIVE_DELETED_SECTION,
      category_id: categoryId,
      section_id: sectionId
    });
  }
};
