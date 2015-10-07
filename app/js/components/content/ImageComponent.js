'use strict';

var React = require('react/addons');
var DropFileComponent = require('./DropFileComponent');
var PageComponentActions = require('./PageComponentActions');
var ReorderMixin = require('../../mixins/ReorderMixin');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');

var ImageComponent = React.createClass({

  handleContentChange: function(content) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: content});
  },

  render: function () {
    var component = this.props.component;

    return (
        <div className='template' data-order={component.order} data-droppable="component" draggable="true" onMouseDown={this.props.mouseDown} onDragEnd={this.props.dragEnd} onDragStart={this.props.dragStart}>
           <DropFileComponent type={'image'} addImage={this.props.addImage} addLink={this.props.addLink} isAdmin={this.props.isAdmin}></DropFileComponent>
           <PageComponentActions components={this.props.components} componentId={this.props.componentId} />
        </div>
      );
  }
});

module.exports = ImageComponent;
