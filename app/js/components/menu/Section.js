'use strict';

var React = require('react/addons');
var SectionActionCreators = require('../../actions/SectionActionCreators');
var ModalMixin = require('../../mixins/ModalMixin');

require('../../../styles/section.sass');

var Section = React.createClass({
  mixins: [ModalMixin],

  getInitialState: function() {
    return {
      isEditing: false,
      sectionName: this.props.section.title
    };
  },

  delete() {
    var sectionId = this.props.section.id;
    var categoryId = this.props.categoryId;
    SectionActionCreators.deleteSection(categoryId, sectionId);
  },

  deleteSection() {
    var props = {
      actions: this.delete,
      text: 'You are about to delete "' + this.state.sectionName + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  handleClick: function() {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true
      });
    } else {
      this.setState({
        isVisible: false
      });
    }
  },

  handleEditSectionName() {
    this.setState({
      isEditing: true
    }, function() {
      React.findDOMNode(this.refs.sectionInput).focus();
    });
  },

  update(event) {
    if (event.keyCode === 13) {
      var sectionId = this.props.section.id;
      var categoryId = this.props.categoryId;
      SectionActionCreators.updateSection(categoryId, sectionId, { title: this.state.sectionName });
      this.setState({
        isEditing: false
      });
    }
  },

  handleInputChange(event) {
    this.setState({
      sectionName: event.target.value
    });
  },

  render: function () {
    var section = this.props.section;
    var userIsAdmin = this.props.userIsAdmin;
    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !(this.state.isEditing && userIsAdmin) ? 'block' : 'none' };
    var deleteAction;
    var actions;

    var sectionName = <div>
      <span style={titleStyle}>{section.title}</span>
    </div>;

    if (userIsAdmin) {
      deleteAction = <div className="actions left">
        <i className="fa fa-remove" onClick={this.deleteSection}></i>
      </div>;
      actions = <div className="actions right" draggable="true" data-parent="true" onMouseDown={this.props.mouseDown} onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd}>
        <i className="fa fa-reorder ui-sortable-handle drag-controller"></i>
      </div>;
      sectionName = <div>
        <input style={titleInputStyle} type="text" maxLength="20" ref="sectionInput" name="title" value={this.state.sectionName} onChange={this.handleInputChange} onKeyDown={this.update} />
        <span style={titleStyle}>{section.title}<i className="fa fa-pencil" onClick={this.handleEditSectionName}></i></span>
      </div>;
    }

    return (
        <div className="full-section" data-droppable="section" data-order={section.order}>
          {deleteAction}
          {actions}
          {sectionName}
        </div>
      );
  }
});

module.exports = Section;
