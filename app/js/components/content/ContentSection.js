  'use strict';

var React = require('react/addons');
var PageComponent = require('./PageComponent');
var Editor = require('react-medium-editor');
var SectionActionCreators = require('../../actions/SectionActionCreators');

require('../../../styles/ContentSection.sass');

var ContentSection = React.createClass({

  getInitialState: function() {
    return {
      isEditing: false,
      sectionName: this.props.section.title
    };
  },

  propTypes: {
    section: React.PropTypes.object.isRequired
  },

  getOffsetTop: function() {
    var domNode = this.refs['section_' + this.props.section.id].getDOMNode();
    return domNode.getBoundingClientRect().top;
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

  deleteSection() {
    var sectionId = this.props.section.id;
    var categoryId = this.props.categoryId;
    SectionActionCreators.deleteSection(categoryId, sectionId);
  },

  render: function () {
    var section = this.props.section;
    var sectionId = section.id;
    var userIsAdmin = this.props.userIsAdmin;

    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !(this.state.isEditing && userIsAdmin) ? 'block' : 'none' };
    var sectionActions;

    var sectionHeading = <div>
      <span style={titleStyle}>{section.title}</span>
    </div>;

    if (userIsAdmin) {
      sectionHeading = <div>
        <input style={titleInputStyle} type="text" maxLength="20" ref="sectionInput"
        name="title" value={this.state.sectionName} onChange={this.handleInputChange}
        onKeyDown={this.update} />
        <span style={titleStyle}>{section.title}</span>
      </div>
      sectionActions = <div className="actions">
        <i className="fa fa-pencil fa-2x" onClick={this.handleEditSectionName}></i>
        <i className="fa fa-trash-o fa-2x" onClick={this.deleteSection}></i>
      </div>;
    }

    return (
        <section ref={'section_' + sectionId}>
          <div className='content-inner'>
            <header>
              <h1>{sectionHeading}</h1>
              {sectionActions}
            </header>
            <PageComponent template={this.props.template} userIsAdmin={this.props.userIsAdmin} sectionId={sectionId} />
          </div>
        </section>
      );
  }
});

module.exports = ContentSection;
