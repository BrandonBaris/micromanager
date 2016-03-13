'use strict';

import React, { PropTypes } from 'react';

require('styles//Task.sass');

class TaskComponent extends React.Component {
  render() {
    let randomAssign = ['Brad','Brandon','Jon','Kelli'][Math.floor(Math.random()*4)];
    return (
      <li className="subtaskListItem">
        <div className="subtaskName">
          <h4>{randomAssign}</h4>
          <h3>{this.props.name}</h3>
        </div>
      </li>
    );
  }
}

TaskComponent.displayName = 'TaskComponent';

// Uncomment properties you need
TaskComponent.propTypes = {
  name : PropTypes.string.isRequired
};
// TaskComponent.defaultProps = {};

export default TaskComponent;
